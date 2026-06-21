<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm">
    <h3 class="text-sm font-semibold text-gray-700 px-6 pt-5 pb-4">Account Security</h3>

    <!-- Password row -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7" cy="7" r="1.5" fill="#6b7280" /><circle cx="12" cy="7" r="1.5" fill="#6b7280" /><circle cx="17" cy="7" r="1.5" fill="#6b7280" />
          <rect x="3" y="3" width="18" height="8" rx="2" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800">Password</p>
          <p class="text-xs text-gray-400 mt-0.5">Last changed {{ privacyStore.password.lastChanged }}</p>
        </div>
      </div>
      <button
        type="button"
        class="border border-indigo-400 text-indigo-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
        @click="privacyStore.openChangePassword()"
      >
        change password
      </button>
    </div>

    <!-- 2FA row -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800">Two-Factor Authentication (2FA)</p>
          <p class="text-xs text-gray-400 mt-0.5">
            Add an extra layer of security
            <button type="button" class="text-indigo-500 font-medium hover:underline" @click="privacyStore.toggle2FA()">Set up</button>
          </p>
        </div>
      </div>
      <button
        type="button"
        :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none shrink-0',
          privacyStore.twoFactor ? 'bg-indigo-600' : 'bg-gray-200',
        ]"
        @click="privacyStore.toggle2FA()"
      >
        <span
          :class="[
            'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
            privacyStore.twoFactor ? 'translate-x-6' : 'translate-x-1',
          ]"
        />
      </button>
    </div>

    <!-- Active Sessions row -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-gray-800">Active Sessions</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ privacyStore.sessions.length }} devices currently logged in</p>
        </div>
      </div>
      <button
        type="button"
        class="text-indigo-600 text-sm font-medium hover:text-indigo-700"
        @click="privacyStore.openSessions()"
      >
        Manage Sessions
      </button>
    </div>
  </div>
</template>

<script setup>
import { privacyStore } from '../../state/privacyStore'
</script>
