<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="privacyStore.closeChangePassword()"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden" @mousedown.stop>
      <!-- Header -->
      <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
        <button type="button" class="text-gray-400 hover:text-gray-700" @click="privacyStore.closeChangePassword()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <div class="px-6 py-5 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
          <input v-model="form.current" type="password" placeholder="Enter current password" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
          <input v-model="form.newPass" type="password" placeholder="Enter new password (min 8 chars)" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
          <input v-model="form.confirm" type="password" placeholder="Confirm new password" class="input-field" />
        </div>

        <!-- Validation errors -->
        <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button type="button" class="text-gray-600 font-medium text-sm hover:text-gray-800" @click="privacyStore.closeChangePassword()">
          Cancel
        </button>
        <button type="button" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors" @click="handleSave">
          Save Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { privacyStore } from '../../state/privacyStore'

const form = reactive({ current: '', newPass: '', confirm: '' })
const error = ref('')

function handleSave() {
  error.value = ''
  if (!form.current) { error.value = 'Current password is required.'; return }
  if (form.newPass.length < 8) { error.value = 'New password must be at least 8 characters.'; return }
  if (form.newPass !== form.confirm) { error.value = 'Passwords do not match.'; return }
  privacyStore.changePassword(form.newPass)
}
</script>

<style scoped>
.input-field {
  @apply w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200;
}
</style>
