<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="portfolioStore.closeModal()"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] flex flex-col overflow-hidden"
      @mousedown.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 class="text-xl font-serif text-gray-900">
          {{ isEditing ? 'Edit Project' : 'Add Project' }}
        </h2>
        <button type="button" class="text-gray-400 hover:text-gray-700" @click="portfolioStore.closeModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Scrollable form body -->
      <div class="overflow-y-auto flex-1 px-6 py-5 space-y-5">

        <!-- Project Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Project Title</label>
          <input
            v-model="portfolioStore.form.title"
            type="text"
            placeholder="e.g. E-commerce Dashboard"
            class="input-field"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
          <input
            v-model="portfolioStore.form.role"
            type="text"
            placeholder="e.g. Frontend Developer"
            class="input-field"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            v-model="portfolioStore.form.description"
            rows="3"
            placeholder="Describe the project..."
            class="input-field resize-none"
          ></textarea>
        </div>

        <!-- Tech Stack -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Tech Stack</label>
          <!-- Existing tags -->
          <div v-if="portfolioStore.form.tech.length" class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="tag in portfolioStore.form.tech"
              :key="tag"
              class="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium pl-3 pr-2 py-1 rounded-full"
            >
              {{ tag }}
              <button type="button" class="hover:opacity-70" @click="portfolioStore.removeTag(tag)">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          </div>
          <input
            v-model="tagInput"
            type="text"
            placeholder="Type a technology and press Enter"
            class="input-field"
            @keydown.enter.prevent="commitTag"
          />
        </div>

        <!-- Image upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Project Image</label>
          <div
            class="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors"
            @click="fileInput?.click()"
          >
            <img
              v-if="portfolioStore.form.image"
              :src="portfolioStore.form.image"
              alt="Preview"
              class="w-full h-40 object-cover"
            />
            <div v-else class="h-40 flex flex-col items-center justify-center gap-2 text-gray-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span class="text-sm">Click to upload image</span>
            </div>
          </div>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </div>

        <!-- Live Demo URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Live Demo URL</label>
          <input
            v-model="portfolioStore.form.liveDemo"
            type="url"
            placeholder="https://your-demo.com"
            class="input-field"
          />
        </div>

        <!-- GitHub URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">GitHub URL</label>
          <input
            v-model="portfolioStore.form.github"
            type="url"
            placeholder="https://github.com/you/repo"
            class="input-field"
          />
        </div>

      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button type="button" class="text-gray-600 font-medium text-sm hover:text-gray-800" @click="portfolioStore.closeModal()">
          Cancel
        </button>
        <button
          type="button"
          class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="!portfolioStore.form.title.trim()"
          @click="handleSubmit"
        >
          {{ isEditing ? 'Save changes' : 'Add Project' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolioStore } from '../../state/portfolioStore'

const tagInput = ref('')
const fileInput = ref(null)

const isEditing = computed(() => portfolioStore.editingId !== null)

function commitTag() {
  if (tagInput.value.trim()) {
    portfolioStore.addTag(tagInput.value)
    tagInput.value = ''
  }
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (file) portfolioStore.uploadImage(file)
  // Reset so picking the same file again still fires change event.
  event.target.value = ''
}

function handleSubmit() {
  if (isEditing.value) {
    portfolioStore.updateProject()
  } else {
    portfolioStore.addProject()
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200;
}
</style>
