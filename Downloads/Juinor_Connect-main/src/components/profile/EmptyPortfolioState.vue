<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 flex flex-col items-center justify-center">
    <!-- Folder icon -->
    <div class="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      </svg>
    </div>

    <p class="text-gray-500 text-sm text-center max-w-xs leading-relaxed">
      Add your first project to showcase your work to recruiters and&nbsp;collaborators.
    </p>

    <button
      type="button"
      class="mt-5 inline-flex items-center gap-1.5 text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors"
      @click="portfolioStore.openAddModal()"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Add Project
    </button>
  </div>
</template>

<script setup>
import { portfolioStore } from '../../state/portfolioStore'
</script>
