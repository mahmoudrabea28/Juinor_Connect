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
          :class="{ 'navbar__link--active': activeLink === link.label }"
          @click="activeLink = link.label"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="navbar__actions">
        <router-link to="/register" class="navbar__signin">Sign in</router-link>
        
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
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { label: 'Home', path: '/' },
  { label: 'Teams', path: '/teams' },
  { label: 'Projects', path: '/projects' },
  { label: 'Dashboard', path: '/Overview' },
  { label: 'Help center', path: '/help-center' },
]

const activeLink = ref('Home')
watch(() => route.path, (newPath) => {
  const currentLink = links.find(link => link.path === newPath)
  if (currentLink) {
    activeLink.value = currentLink.label
  }
}, { immediate: true }) 
</script>

<style scoped>
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
  background: #3562FF; 
  color: #FFFFFF;     
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  border: none;
  border-radius: 8px; 
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.navbar__cta:hover {
  background-color: #1A4BFF; 
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(53, 98, 255, 0.25);
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