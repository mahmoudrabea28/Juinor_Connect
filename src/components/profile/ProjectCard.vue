<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-5 items-start">

    <!-- Project image -->
    <div class="shrink-0 w-[160px] h-[110px] rounded-xl overflow-hidden bg-gray-100">
      <img
        :src="project.image || placeholder"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <!-- Title + Role badge -->
      <div class="flex items-center gap-3 flex-wrap">
        <h3 class="text-xl font-serif text-gray-900">{{ project.title }}</h3>
        <span
          v-if="project.role"
          class="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
        >
          {{ project.role }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Tech tags + Links row -->
      <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
        <!-- Tags -->
        <div class="flex items-center gap-2 flex-wrap">
          <span
            v-for="tag in project.tech"
            :key="tag"
            class="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-md"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-5 shrink-0">
          <a
            v-if="project.liveDemo"
            :href="project.liveDemo"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Live demo
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Three-dot menu -->
    <div class="relative shrink-0" ref="menuRef">
      <button
        type="button"
        class="text-gray-400 hover:text-gray-600 p-1 rounded"
        @click="menuOpen = !menuOpen"
        aria-label="More options"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      <div
        v-if="menuOpen"
        class="absolute right-0 top-8 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1"
      >
        <button
          type="button"
          class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          @click="handleEdit"
        >
          Edit Project
        </button>
        <button
          type="button"
          class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          @click="handleDelete"
        >
          Delete Project
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { portfolioStore, PLACEHOLDER_IMAGE } from '../../state/portfolioStore'

const props = defineProps({
  project: { type: Object, required: true },
})

const placeholder = PLACEHOLDER_IMAGE
const menuOpen = ref(false)
const menuRef = ref(null)

function handleEdit() {
  menuOpen.value = false
  portfolioStore.openEditModal(props.project.id)
}

function handleDelete() {
  menuOpen.value = false
  portfolioStore.deleteProject(props.project.id)
}

// Close the menu when clicking outside the card's three-dot area.
function onOutsideClick(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', onOutsideClick))
</script>
