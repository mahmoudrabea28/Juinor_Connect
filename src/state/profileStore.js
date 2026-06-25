import { reactive } from 'vue'

// Single source of truth for the user's profile.
// Any component that imports `profileStore` shares this same
// reactive object, so updates show up everywhere instantly.

// No real photo here — an empty string means "no avatar set", and the
// UI falls back to a neutral icon/initials. Using a shared stock photo
// (e.g. pravatar) made every user look like they had the same picture.
const DEFAULT_AVATAR = ''

export const profileStore = reactive({
  // Starts blank. It gets filled from /api/profile for the logged-in
  // user. We intentionally do NOT seed fake data ("Emily Davis", etc.)
  // because that placeholder would leak onto real accounts whose fields
  // come back empty.
  profile: {
    name: '',
    headline: '',
    bio: '',
    avatar: DEFAULT_AVATAR,
  },

  defaultAvatar: DEFAULT_AVATAR,

  // AI-generated strength badges (filled from /api/profile).
  highlights: [],

  // ── Loading state ─────────────────────────────────────────────────
  // `true` until loadProfile() finishes the first fetch from the DB.
  // `loaded` guards against re-fetching every time a page mounts.
  loading: true,
  loaded: false,

  // Fetch the profile from the backend (GET /api/profile) and fill the
  // store. Pages await this and show <LoadingScreen> while it runs.
  //
  // Multiple components (Navbar + ProfilePage) and events (profile-updated,
  // user-updated) can call this at almost the same moment. Without
  // de-duplication each call does its own fetch and writes its own result,
  // so the card visibly flips between values. We keep a single in-flight
  // promise and let every caller await the same one.
  _inflight: null,

  async loadProfile({ force = false } = {}) {
    if (this.loaded && !force) return
    if (this._inflight) return this._inflight

    this.loading = true
    this._inflight = (async () => {
      try {
        const { getProfile } = await import('../services/api.js')
        const data = await getProfile()
        const p = data.profile || {}

        // Profile card — the backend response is authoritative. We do NOT
        // fall back to the previous value in the store, otherwise one user's
        // name/bio could linger after switching accounts. Empty means empty.
        Object.assign(this.profile, {
          name: p.name || '',
          headline: p.headline || '',
          bio: p.bio || '',
          avatar: p.avatar || this.defaultAvatar,
        })

        // My Skills chips (backend returns an array of strings)
        if (Array.isArray(p.skills)) {
          this.skills = p.skills.map((label, i) => ({
            label,
            gradient: i === 0,
          }))
        }

        // AI-generated strength badges (from the profile-gen feature).
        this.highlights = Array.isArray(p.highlights) ? p.highlights : []

        // Personal Information form
        if (p.personalInfo) {
          Object.assign(this.personalInfo, {
            fullName: p.personalInfo.fullName || '',
            role: p.personalInfo.role || '',
            bio: p.personalInfo.bio || '',
            github: p.personalInfo.github || '',
            linkedin: p.personalInfo.linkedin || '',
            location: p.personalInfo.location || '',
          })
        }

        this.loaded = true
      } catch (err) {
        // A 401 just means the session isn't active — expected, not a bug.
        if (err?.status === 401) {
          console.info('Profile not loaded: session not active.')
        } else {
          console.error('Failed to load profile:', err)
        }
      } finally {
        this.loading = false
        this._inflight = null
      }
    })()

    return this._inflight
  },

  // Merge partial updates into the live profile.
  updateProfile(updates) {
    Object.assign(this.profile, updates)
  },

  // Restore the avatar to the neutral placeholder
  // (used by the "Remove" action in the Edit Profile modal).
  resetProfile() {
    this.profile.avatar = this.defaultAvatar
  },

  // Wipe the WHOLE store back to a blank, logged-out state. Call this on
  // logout (and before loading a different account) so one user's data
  // can never show up for another user.
  reset() {
    Object.assign(this.profile, {
      name: '',
      headline: '',
      bio: '',
      avatar: this.defaultAvatar,
    })
    this.skills = []
    this.highlights = []
    this.resetPersonalInfo()
    this.loaded = false
    this.loading = false
    this._inflight = null
  },

  // ── My Skills (Profile page) ──────────────────────────────────────
  // Starts empty; filled from /api/profile for the current user.
  skills: [],

  // Modal state
  skillModalOpen: false,
  skillSearch: '',
  pendingSkillLabel: '',

  // Full pool of selectable skills for the picker.
  allAvailableSkills: [
    'HTML', 'CSS', 'JavaScript', 'Vue.js', 'React',
    'Tailwind CSS', 'Figma', 'Node.js', 'TypeScript',
  ],

  // Skills that match the search and aren't already added.
  get filteredAvailableSkills() {
    const query = this.skillSearch.trim().toLowerCase()
    const existing = new Set(this.skills.map((s) => s.label.toLowerCase()))
    return this.allAvailableSkills.filter(
      (s) => !existing.has(s.toLowerCase()) && s.toLowerCase().includes(query)
    )
  },

  openSkillModal() {
    this.skillSearch = ''
    this.pendingSkillLabel = ''
    this.skillModalOpen = true
  },

  closeSkillModal() {
    this.skillSearch = ''
    this.pendingSkillLabel = ''
    this.skillModalOpen = false
  },

  searchSkills(query) {
    this.skillSearch = query
    // Deselect if the current pick is no longer in results.
    if (
      this.pendingSkillLabel &&
      !this.filteredAvailableSkills.includes(this.pendingSkillLabel)
    ) {
      this.pendingSkillLabel = ''
    }
  },

  selectSkill(label) {
    this.pendingSkillLabel = label
  },

  addSkill() {
    if (!this.pendingSkillLabel) return
    const already = this.skills.some(
      (s) => s.label.toLowerCase() === this.pendingSkillLabel.toLowerCase()
    )
    if (!already) {
      this.skills.push({ label: this.pendingSkillLabel, gradient: false })
    }
    this.closeSkillModal()
  },

  // Personal Information page data — starts blank so the form shows
  // the screenshot's placeholder text until the user fills it in.
  personalInfo: {
    fullName: '',
    role: '',
    bio: '',
    github: '',
    linkedin: '',
    location: '',
  },

  // Merge partial updates into the saved personal info.
  savePersonalInfo(updates) {
    Object.assign(this.personalInfo, updates)
  },

  // Wipe personal info back to blank defaults.
  resetPersonalInfo() {
    Object.assign(this.personalInfo, {
      fullName: '',
      role: '',
      bio: '',
      github: '',
      linkedin: '',
      location: '',
    })
  },
})