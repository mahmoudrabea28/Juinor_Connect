<template>
  <header class="navbar">
    <div class="navbar__inner">
      <router-link to="/" class="navbar__logo" aria-label="Junior Connect home" @click="activeLink = 'Home'">
        <span class="navbar__logo-crop">
          <img src="../assets/images/Logo.png" alt="Junior Connect" />
        </span>
      </router-link>

      <nav class="navbar__nav" aria-label="Main">
        <router-link
          v-for="link in links"
          :key="link.label"
          :to="link.path"
          class="navbar__link"
          :class="{
  'navbar__link--active':
    link.path === '/'
      ? route.path === '/'
      : route.path.startsWith(link.path)
}"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="navbar__actions">
         <template v-if="!isLoggedIn">
    <router-link to="/login" class="navbar__signin">Sign in</router-link>

    <button class="navbar__cta" type="button" @click="$router.push('/register')">
      <span>Join the crew</span>
          <svg
            class="navbar__cta-arrow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
         </template>
           <template v-else>
    <div class="navbar__user">
      <!-- Notification icon temporarily hidden. To restore it, uncomment the block below:
      <button class="text-indigo-400 hover:text-indigo-600" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>
      <div class="w-px h-8 bg-gray-200"></div>
      -->
     <router-link to="/profile" class="navbar__profile">
  <div class="w-9 h-9 rounded-full border border-indigo-300 overflow-hidden flex items-center justify-center text-indigo-500 bg-white">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      alt="Profile"
      class="w-full h-full object-cover"
      @error="onAvatarError"
    />
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  </div>

  <p class="text-sm font-semibold text-gray-900 m-0">
    {{ user?.name }}
  </p>
</router-link>
      
        <button class="navbar__logout" @click="handleLogout">
      Logout
    </button>
    </div>
  </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '../state/authStore.js'
import { profileStore } from '../state/profileStore.js'

const router = useRouter()
const route = useRoute()

// Read straight from the shared store — stays in sync everywhere,
// no per-navigation server requests.
const user = computed(() => authStore.user)
const isLoggedIn = computed(() => authStore.isLoggedIn)

// Prefer the profile store's avatar (updated instantly after upload),
// then the auth user's avatar from the server.
const rawAvatar = computed(
  () => profileStore.profile.avatar || authStore.user?.avatar || ''
)

// If the current avatar URL fails to load, fall back to the icon.
const avatarFailed = ref(false)
watch(rawAvatar, () => { avatarFailed.value = false })
const avatarUrl = computed(() => (avatarFailed.value ? '' : rawAvatar.value))

function onAvatarError() {
  avatarFailed.value = true
}

/* ---------------------------
   AUTH SYNC
----------------------------*/
const syncAuth = () => authStore.ensure({ force: true })
const syncProfile = () => profileStore.loadProfile({ force: true })

/* ---------------------------
   NAV LINKS
----------------------------*/
const links = [
  { label: 'Home', path: '/Home' },
  { label: 'Teams', path: '/browse-teams' },
  { label: 'Projects', path: '/projects' },
  { label: 'AI Mentor', path: '/AI_Mentor' },
  { label: 'Help center', path: '/help-center' },
]
/* ---------------------------
   LOGOUT
----------------------------*/
const handleLogout = async () => {
  await authStore.logout()
  window.dispatchEvent(new Event('user-updated'))
  router.push('/')
}

/* ---------------------------
   INIT + EVENTS
----------------------------*/
onMounted(() => {
  authStore.ensure()
  // Load the profile so the avatar is available in the nav.
  profileStore.loadProfile()
})

window.addEventListener('user-updated', syncAuth)
window.addEventListener('storage', syncAuth)
// When the avatar/profile changes anywhere, refresh it in the nav.
window.addEventListener('profile-updated', syncProfile)

onBeforeUnmount(() => {
  window.removeEventListener('profile-updated', syncProfile)
})
</script>
<style scoped>
.navbar__logout {
  border: none;
  background: #ef4444;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
}

.navbar__logout:hover {
  background: #dc2626;
   transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(255, 71, 43, 0.65)
}
.navbar__user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2B7FFF;
}

.navbar__user-icon {
  font-size: 16px;
  background: #eef4ff;
  padding: 8px;
  border-radius: 50%;
}
.navbar__profile {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 80px;
  background: #FAFAFA; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); 
  display: flex;
  align-items: center;
}

.navbar__inner {
  width: min(1280px, 100% - 48px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.navbar__logo-crop {
  display: flex;
  align-items: center;
  height: 100%;
}

.navbar__logo-crop img {
  height: 55px;
  width: auto;
  display: block;
  object-fit: contain;
  position: static;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.navbar__link {
  font-size: 16px;
  line-height: 24px;
  color: #666666; 
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  padding: 6px 0;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2.5px;
  background-color: #3562FF; 
  border-radius: 2px;
  transform: translateX(-50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar__link:hover {
  color: #111111;
}

.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%; 
}

.navbar__link--active {
  color: #3562FF !important; 
  font-weight: 600;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar__signin {
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 500;
  transition: color 0.2s ease;
}

.navbar__signin:hover {
  color: #111111;
}

.navbar__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 42px;
  padding: 12px 20px;
 background: linear-gradient(90deg, #4F39F6, #2B7FFF);
  background-size: 180% 100%;
  background-position: 0% 0; 
  color: #FFFFFF;     
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  border: none;
  border-radius: 8px; 
  white-space: nowrap;
  cursor: pointer;
   box-shadow: 0 10px 22px -10px rgba(79, 57, 246, 0.6);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s,
    background-position 0.5s;
}

.navbar__cta:hover {
 transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65)
}

.navbar__cta:active {
  transform: translateY(0);
}

.navbar__cta-arrow {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.navbar__cta:hover .navbar__cta-arrow {
  transform: translateX(3px); 
}

/* --- RESPONSIVE --- */
@media (max-width: 900px) {
  .navbar__nav {
    display: none;
  }
}

@media (max-width: 560px) {
  .navbar {
    height: 72px;
  }
  .navbar__signin {
    display: none;
  }
}
</style>