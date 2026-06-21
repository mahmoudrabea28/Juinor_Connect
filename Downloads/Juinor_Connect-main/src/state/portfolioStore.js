import { reactive } from 'vue'

// Single source of truth for the Portfolio page.
// Seed data shows one example project matching the screenshot so the
// page never opens to a completely blank state.

let _nextId = 2

const PLACEHOLDER_IMAGE =
  'https://placehold.co/160x110/EEF0F9/6366F1?text=Preview'

export const portfolioStore = reactive({
  projects: [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      role: 'Frontend Developer',
      description:
        'A fully responsive, data-driven dashboard for e-commerce platforms. Features real-time inventory tracking, user behavioral analytics, and a dynamic order processing system.',
      tech: ['React', 'Tailwind', 'Firebase'],
      image: '',
      liveDemo: 'https://demo.example.com',
      github: 'https://github.com/example',
    },
  ],

  // Modal state ──────────────────────────────────────────────────────
  isModalOpen: false,
  editingId: null, // null = add mode, number = edit mode

  // Form draft (populated on open, discarded on close)
  form: {
    title: '',
    role: '',
    description: '',
    tech: [],
    image: '',       // object-url or empty
    liveDemo: '',
    github: '',
  },

  // The raw File the user picked — stored so callers can revoke the
  // object URL on discard without touching the committed project.
  _pendingFile: null,

  // Open / close ─────────────────────────────────────────────────────
  openAddModal() {
    this.editingId = null
    this.resetForm()
    this.isModalOpen = true
  },

  openEditModal(id) {
    const project = this.projects.find((p) => p.id === id)
    if (!project) return
    this.editingId = id
    Object.assign(this.form, {
      title: project.title,
      role: project.role,
      description: project.description,
      tech: [...project.tech],
      image: project.image,
      liveDemo: project.liveDemo,
      github: project.github,
    })
    this._pendingFile = null
    this.isModalOpen = true
  },

  closeModal() {
    if (this._pendingFile) {
      URL.revokeObjectURL(this.form.image)
      this._pendingFile = null
    }
    this.isModalOpen = false
    this.editingId = null
    this.resetForm()
  },

  resetForm() {
    Object.assign(this.form, {
      title: '',
      role: '',
      description: '',
      tech: [],
      image: '',
      liveDemo: '',
      github: '',
    })
    this._pendingFile = null
  },

  // Image preview ────────────────────────────────────────────────────
  uploadImage(file) {
    if (this._pendingFile) URL.revokeObjectURL(this.form.image)
    this._pendingFile = file
    this.form.image = URL.createObjectURL(file)
  },

  // Commit ───────────────────────────────────────────────────────────
  addProject() {
    if (!this.form.title.trim()) return
    this.projects.push({
      id: _nextId++,
      title: this.form.title.trim(),
      role: this.form.role.trim(),
      description: this.form.description.trim(),
      tech: [...this.form.tech],
      image: this.form.image,
      liveDemo: this.form.liveDemo.trim(),
      github: this.form.github.trim(),
    })
    // Ownership of the blob URL moves to the project — don't revoke it.
    this._pendingFile = null
    this.closeModal()
  },

  updateProject() {
    const project = this.projects.find((p) => p.id === this.editingId)
    if (!project) return
    Object.assign(project, {
      title: this.form.title.trim(),
      role: this.form.role.trim(),
      description: this.form.description.trim(),
      tech: [...this.form.tech],
      image: this.form.image,
      liveDemo: this.form.liveDemo.trim(),
      github: this.form.github.trim(),
    })
    this._pendingFile = null
    this.closeModal()
  },

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id)
  },

  // Tech tag helpers used by the form ────────────────────────────────
  addTag(tag) {
    const trimmed = tag.trim()
    if (trimmed && !this.form.tech.includes(trimmed)) {
      this.form.tech.push(trimmed)
    }
  },

  removeTag(tag) {
    this.form.tech = this.form.tech.filter((t) => t !== tag)
  },
})

export { PLACEHOLDER_IMAGE }
