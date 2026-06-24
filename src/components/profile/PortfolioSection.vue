<template>
  <section class="mt-6">
    <h3 class="text-xl font-serif text-gray-900 mb-3">Portfolio</h3>

    <!-- Original empty-state design — visually UNCHANGED from the first build.
         Clicking the upload area or the link both open the native file picker. -->
    <div
      class="border-2 border-dashed border-indigo-200 rounded-xl bg-white py-16 flex flex-col items-center justify-center cursor-pointer"
      @click="profilePortfolioStore.openFilePicker()"
    >
      <div class="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 16V4" />
          <path d="M7 9l5-5 5 5" />
          <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
        </svg>
      </div>
      <p class="text-gray-700 text-[15px]">
        No projects yet —
        <span
          class="text-indigo-600 font-medium hover:underline cursor-pointer"
          @click.stop="profilePortfolioStore.openFilePicker()"
        >
          Start your first project →
        </span>
      </p>
      <p class="text-gray-400 text-sm mt-1">Showcase your skills to recruiters and peers.</p>
    </div>

    <!-- Hidden native file picker — accepts portfolio file types -->
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      accept="image/*,.pdf,.zip,.docx,.doc,.pptx,.ppt"
      multiple
      @change="onFilesSelected"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profilePortfolioStore } from '../../state/profilePortfolioStore'

const fileInputRef = ref(null)

// Register the native input element with the store so
// openFilePicker() can trigger it from anywhere.
onMounted(() => {
  profilePortfolioStore.registerInput(fileInputRef.value)
})

function onFilesSelected(event) {
  if (event.target.files?.length) {
    profilePortfolioStore.uploadPortfolio(event.target.files)
    // Reset so selecting the same file again still fires the change event.
    event.target.value = ''
  }
}
</script>
