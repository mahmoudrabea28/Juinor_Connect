<template>
  <aside class="w-full lg:w-[230px] shrink-0 self-start bg-white rounded-2xl shadow-sm border border-gray-100 py-3 px-3 lg:py-5">
    <nav class="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible">
      <template v-for="item in items" :key="item.label">
        <!-- Wired-up pages navigate via vue-router and pick up the
             active style automatically from the current route. -->
        <router-link
          v-if="item.path"
          :to="item.path"
          :class="linkClasses(isActive(item))"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="item.icon"
          />
          {{ item.label }}
        </router-link>

        <!-- Pages that don't exist yet stay as inert placeholders,
             same as before, so nothing here changes their behavior. -->
        <a v-else href="#" :class="linkClasses(false)">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="item.icon"
          />
          {{ item.label }}
        </a>
      </template>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const icons = {
  profile: '<circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>',
  info: '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  skills: '<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="4"></circle><circle cx="12" cy="12" r="0.5"></circle>',
  portfolio: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path>',
  achievements: '<circle cx="12" cy="8" r="5"></circle><path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5"></path>',
  privacy: '<path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z"></path>',
}

// Items keep a `path` once their page exists. Items without one
// (Skills, Portfolio, Achievements, Privacy & Security) render as
// the same inert "#" links they always were — only Profile and
// Personal Information are wired up for now.
const items = [
  { label: 'Profile', icon: icons.profile, path: '/profile' },
  { label: 'Personal Information', icon: icons.info, path: '/personal-information' },
  { label: 'Skills', icon: icons.skills, path: '/skills' },
  { label: 'Portfolio', icon: icons.portfolio, path: '/portfolio' },
  { label: 'Achievements', icon: icons.achievements, path: '/achievements' },
  { label: 'Privacy & Security', icon: icons.privacy, path: '/privacy-security' },
]

function isActive(item) {
  return route.path === item.path
}

function linkClasses(active) {
  return [
    'flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm lg:text-[15px] font-medium transition-colors whitespace-nowrap shrink-0',
    active ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50',
  ]
}
</script>