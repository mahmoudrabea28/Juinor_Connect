import { reactive } from 'vue'

// Centralized reactive store for the Skills page. Every component
// that imports `skillsStore` shares this same object, so a level
// change, deletion, or addition is reflected everywhere instantly.

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export const skillsStore = reactive({
  levels: LEVELS,

  selectedSkills: [
  ],

  availableSkills: [
  ],

  // Add Skill modal state.
  isModalOpen: false,
  searchQuery: '',
  pendingSkills: [],

  // Skills available to suggest/search, with anything already
  // selected removed — this is what enforces the "no duplicates"
  // rule: an already-selected skill simply can't appear here.
  get suggestedSkills() {
    const selectedNames = new Set(this.selectedSkills.map((s) => s.name.toLowerCase()))
    return this.availableSkills.filter((s) => !selectedNames.has(s.name.toLowerCase()))
  },

  // Suggested skills filtered live by the modal's search box.
  get searchResults() {
    const query = this.searchQuery.trim().toLowerCase()
    if (!query) return this.suggestedSkills
    return this.suggestedSkills.filter((s) => s.name.toLowerCase().includes(query))
  },

  // Open the Add Skill modal. If a suggested-skill chip was clicked,
  // pass it here to preload it as already picked, ready to add.
  openModal(prefillSkill = null) {
    this.resetSelection()
    if (prefillSkill) {
      this.searchQuery = prefillSkill.name
      this.pendingSkills.push({ ...prefillSkill, level: 'Intermediate' })
    }
    this.isModalOpen = true
  },

  closeModal() {
    this.isModalOpen = false
    this.resetSelection()
  },

  // Clears the in-progress modal selection (search text + picks).
  resetSelection() {
    this.searchQuery = ''
    this.pendingSkills = []
  },

  searchSkills(query) {
    this.searchQuery = query
  },

  // Toggle a skill in/out of the "ready to add" list.
  togglePendingSkill(skill) {
    const index = this.pendingSkills.findIndex((s) => s.id === skill.id)
    if (index === -1) {
      this.pendingSkills.push({ ...skill, level: 'Intermediate' })
    } else {
      this.pendingSkills.splice(index, 1)
    }
  },

  removePendingSkill(id) {
    this.pendingSkills = this.pendingSkills.filter((s) => s.id !== id)
  },

  setPendingSkillLevel(id, level) {
    const skill = this.pendingSkills.find((s) => s.id === id)
    if (skill) skill.level = level
  },

  // Commit every pending skill into the selected list, then close.
  addSkill() {
    this.pendingSkills.forEach((skill) => {
      const alreadyExists = this.selectedSkills.some(
        (s) => s.name.toLowerCase() === skill.name.toLowerCase()
      )
      if (!alreadyExists) {
        this.selectedSkills.push({ id: skill.id, name: skill.name, level: skill.level })
      }
    })
    this.closeModal()
  },

  removeSkill(id) {
    this.selectedSkills = this.selectedSkills.filter((s) => s.id !== id)
  },

  changeSkillLevel(id, level) {
    const skill = this.selectedSkills.find((s) => s.id === id)
    if (skill) skill.level = level
  },
})
