import { reactive } from 'vue'

// Single source of truth for the user's profile.
// Any component that imports `profileStore` shares this same
// reactive object, so updates show up everywhere instantly.

const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=47'

export const profileStore = reactive({
  profile: {
    name: 'Emily Davis',
    headline: 'Frontend Developer · Student',
    bio: 'Passionate about building real products and learning through collaboration. Currently exploring React ecosystems and UX patterns.',
    avatar: DEFAULT_AVATAR,
  },

  defaultAvatar: DEFAULT_AVATAR,

  // ── Loading state ─────────────────────────────────────────────────
  // `true` until loadProfile() finishes the first fetch from the DB.
  // `loaded` guards against re-fetching every time a page mounts.
  loading: true,
  loaded: false,

  // Fetch the profile from the backend (GET /api/profile) and fill the
  // store. Pages await this and show <LoadingScreen> while it runs.
  async loadProfile({ force = false } = {}) {
    if (this.loaded && !force) return
    this.loading = true
    try {
      const { getProfile } = await import('../services/api.js')
      const data = await getProfile()
      const p = data.profile || {}

      // Profile card
      Object.assign(this.profile, {
        name: p.name ?? this.profile.name,
        headline: p.headline ?? this.profile.headline,
        bio: p.bio ?? this.profile.bio,
        avatar: p.avatar || this.defaultAvatar,
      })

      // My Skills chips (backend returns an array of strings)
      if (Array.isArray(p.skills)) {
        this.skills = p.skills.map((label, i) => ({
          label,
          gradient: i === 0,
        }))
      }

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
      console.error('Failed to load profile:', err)
    } finally {
      this.loading = false
    }
  },

  // Merge partial updates into the live profile.
  updateProfile(updates) {
    Object.assign(this.profile, updates)
  },

  // Restore the avatar to the default placeholder
  // (used by the "Remove" action in the Edit Profile modal).
  resetProfile() {
    this.profile.avatar = this.defaultAvatar
  },

  // ── My Skills (Profile page) ──────────────────────────────────────
  // Seed with the three chips shown in the original screenshot.
  skills: [
    { label: 'Figma', gradient: true },
    { label: 'HTML', gradient: false },
    { label: 'CSS', gradient: false },
  ],

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