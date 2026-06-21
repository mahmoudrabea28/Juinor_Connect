<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="privacyStore.closeDeleteConfirm()"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden" @mousedown.stop>
      <!-- X button -->
      <div class="flex justify-end px-5 pt-5">
        <button type="button" class="text-gray-400 hover:text-gray-700" @click="privacyStore.closeDeleteConfirm()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="px-8 pb-7">
        <!-- Warning icon circle -->
        <div class="flex justify-center mb-4">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>

        <!-- Title + subtitle -->
        <h2 class="text-xl font-semibold text-gray-900 text-center">Delete Account</h2>
        <p class="text-sm text-gray-500 text-center mt-1.5 mb-5">
          Are you sure you want to permanently delete your account?
        </p>

        <!-- Warning box -->
        <div class="bg-red-50 border border-red-100 rounded-xl px-5 py-4 mb-6">
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <span class="text-red-500 mt-0.5 shrink-0">•</span>
              <span class="text-sm text-red-500">Your profile and account data will be permanently removed.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500 mt-0.5 shrink-0">•</span>
              <span class="text-sm text-red-500">All projects and team memberships will be lost.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500 mt-0.5 shrink-0">•</span>
              <span class="text-sm text-red-500">All earned achievements and your portfolio will be deleted.</span>
            </li>
          </ul>
        </div>

        <!-- Action buttons -->
        <div class="space-y-3">
          <button
            type="button"
            class="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
            @click="$emit('confirm-delete')"
          >
            Yes , Delete My Account
          </button>
          <button
            type="button"
            class="w-full bg-gray-100 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            @click="privacyStore.closeDeleteConfirm()"
          >
            Cancel, Keep My Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { privacyStore } from '../../state/privacyStore'
defineEmits(['confirm-delete'])
</script>
