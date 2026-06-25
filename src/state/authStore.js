import { reactive } from 'vue'
import { getMe, logout as apiLogout } from '../services/auth.js'

// Single source of truth for authentication state.
// Asks the server ONCE (via getMe), caches the result in memory, and
// every component/router reads from here instead of hitting the server
// on every navigation. Works for both email/password and Google OAuth,
// since both rely on the same httpOnly session cookie.

export const authStore = reactive({
  user: null,
  isLoggedIn: false,

  // `false` until the first server check finishes.
  ready: false,

  // Holds the in-flight getMe() promise so concurrent callers
  // (router guard + Navbar mounting at the same time) share ONE request.
  _checking: null,

  // Resolve auth state. Returns a promise that settles once we know.
  // Pass { force: true } after login/logout to re-check the server.
  async ensure({ force = false } = {}) {
    if (this.ready && !force) return this

    // Reuse an in-flight check instead of firing a second request.
    if (this._checking) return this._checking

    this._checking = (async () => {
      try {
        const res = await getMe()
        if (res?.user) {
          this.user = res.user
          this.isLoggedIn = true
          localStorage.setItem('user', JSON.stringify(res.user))
        } else {
          this._clear()
        }
      } catch (err) {
        this._clear()
      } finally {
        this.ready = true
        this._checking = null
      }
      return this
    })()

    return this._checking
  },

  // Called after a successful login/signup. We already have the user
  // object from the response, so set it directly and mark ready —
  // no extra round-trip needed.
  setUser(user) {
    if (user) {
      this.user = user
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(user))
      // A (possibly different) user just logged in. Clear any cached
      // profile from a previous session and force a fresh fetch, so the
      // new account never shows the old account's name/bio/avatar/skills.
      import('./profileStore.js').then(({ profileStore }) => {
        profileStore.reset()
        profileStore.loadProfile({ force: true })
      })
    } else {
      this._clear()
    }
    this.ready = true
  },

  async logout() {
    try {
      await apiLogout()
    } catch (err) {
      console.error(err)
    }
    this._clear()
    // Clear the profile store too, so the next user who logs in starts
    // fresh and never sees the previous user's name/bio/avatar/skills.
    import('./profileStore.js').then(({ profileStore }) => profileStore.reset())
    this.ready = true
  },

  _clear() {
    this.user = null
    this.isLoggedIn = false
    localStorage.removeItem('user')
  },

  // Called when the server reports the session is no longer valid (401).
  // Drops all cached auth + profile state so the UI falls back to the
  // logged-out view (Sign in) instead of still showing the old user.
  handleSessionExpired() {
    this._clear()
    this.ready = true
    this._checking = null
    import('./profileStore.js').then(({ profileStore }) => profileStore.reset())
  },
})
