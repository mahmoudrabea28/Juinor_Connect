import { reactive } from 'vue'

// Separate store for the Profile page portfolio upload area.
// This is NOT the same as the Portfolio page (portfolioStore).
// This section is for uploading portfolio files (images, PDFs, ZIPs, etc.)
// and keeps the original Profile page empty-state design intact.

export const profilePortfolioStore = reactive({
  uploadedFiles: [],

  // Hidden file input ref — set by the component on mount.
  _inputEl: null,

  // Register the hidden file input from the component.
  registerInput(el) {
    this._inputEl = el
  },

  // Trigger the native file picker.
  openFilePicker() {
    this._inputEl?.click()
  },

  // Called after the user selects file(s) from the native picker.
  uploadPortfolio(files) {
    Array.from(files).forEach((file) => {
      this.uploadedFiles.push({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        // Preview URL for images; null for other types.
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      })
    })
  },

  removePortfolio(id) {
    const index = this.uploadedFiles.findIndex((f) => f.id === id)
    if (index !== -1) {
      const file = this.uploadedFiles[index]
      if (file.previewUrl) URL.revokeObjectURL(file.previewUrl)
      this.uploadedFiles.splice(index, 1)
    }
  },
})
