<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm">
    <h3 class="text-sm font-semibold text-gray-700 px-6 pt-5 pb-4">Data & Account</h3>

    <!-- Download my data -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800">Download my data</p>
          <p class="text-xs text-gray-400 mt-0.5">Export a copy of your profile and project data</p>
        </div>
      </div>
      <button
        type="button"
        class="border border-indigo-400 text-indigo-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
        @click="$emit('request-export')"
      >
        Request Export
      </button>
    </div>

    <!-- Delete Account -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p class="text-sm font-semibold text-gray-800">Delete Account</p>
      </div>
      <button
        type="button"
        class="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        @click="privacyStore.openDeleteConfirm()"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>

<script setup>
import { privacyStore } from '../../state/privacyStore'
defineEmits(['request-export'])
</script>
