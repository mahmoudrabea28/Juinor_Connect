import { reactive } from 'vue'

export const privacyStore = reactive({
  // ── Profile visibility ────────────────────────────────────────────
  // "team" matches the selected card in the screenshot.
  profileVisibility: 'team', // 'public' | 'team' | 'private'

  showInDiscovery: true,

  // ── Account Security ─────────────────────────────────────────────
  twoFactor: false,

  password: {
    lastChanged: '3 months ago',
    value: '', // not stored in plaintext for real apps; local demo only
  },

  sessions: [
    { id: 1, device: 'Chrome on macOS', location: 'Cairo, EG', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Cairo, EG', current: false },
  ],

  // ── Modal state ───────────────────────────────────────────────────
  showChangePassword: false,
  showSessions: false,
  showDeleteConfirm: false,

  // ── Visibility ────────────────────────────────────────────────────
  changeVisibility(value) {
    this.profileVisibility = value
  },

  toggleDiscovery() {
    this.showInDiscovery = !this.showInDiscovery
  },

  // ── Password ──────────────────────────────────────────────────────
  openChangePassword() {
    this.showChangePassword = true
  },
  closeChangePassword() {
    this.showChangePassword = false
  },
  changePassword(newPassword) {
    this.password.value = newPassword
    this.password.lastChanged = 'Just now'
    this.closeChangePassword()
  },

  // ── 2FA ───────────────────────────────────────────────────────────
  toggle2FA() {
    this.twoFactor = !this.twoFactor
  },

  // ── Sessions ──────────────────────────────────────────────────────
  openSessions() {
    this.showSessions = true
  },
  closeSessions() {
    this.showSessions = false
  },
  removeSession(id) {
    this.sessions = this.sessions.filter((s) => s.id !== id)
  },

  // ── Data export ───────────────────────────────────────────────────
  requestExport(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'junior-connect-export.json'
    a.click()
    URL.revokeObjectURL(url)
  },

  // ── Delete account ────────────────────────────────────────────────
  openDeleteConfirm() {
    this.showDeleteConfirm = true
  },
  closeDeleteConfirm() {
    this.showDeleteConfirm = false
  },

  // Reset only privacyStore itself back to defaults.
  // The page component calls resetAll() on all stores before redirecting.
  resetSelf() {
    this.profileVisibility = 'team'
    this.showInDiscovery = true
    this.twoFactor = false
    this.password = { lastChanged: '3 months ago', value: '' }
    this.sessions = [
      { id: 1, device: 'Chrome on macOS', location: 'Cairo, EG', current: true },
      { id: 2, device: 'Safari on iPhone', location: 'Cairo, EG', current: false },
    ]
    this.showChangePassword = false
    this.showSessions = false
    this.showDeleteConfirm = false
  },
})
