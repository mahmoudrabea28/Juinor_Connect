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
