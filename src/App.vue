<template>
  <router-view />
  <Toast />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from './state/authStore.js'
import Toast from './components/Toast.vue'

const router = useRouter()

// When any API call hits a 401 (the login session expired on the server),
// drop the cached "logged in" state so the navbar goes back to "Sign in",
// then send the user to Home if they're sitting on a page that needs auth.
function onSessionExpired() {
  authStore.handleSessionExpired()

  // Tell the navbar (and anything else listening) to refresh from the
  // now-cleared auth state.
  window.dispatchEvent(new Event('user-updated'))

  // If the current route requires auth, bounce to Home. (Public pages
  // like Home itself just stay where they are.)
  const current = router.currentRoute.value
  if (current.meta?.requiresAuth) {
    router.replace('/Home')
  }
}

onMounted(() => {
  window.addEventListener('session-expired', onSessionExpired)
})

onBeforeUnmount(() => {
  window.removeEventListener('session-expired', onSessionExpired)
})
</script>
