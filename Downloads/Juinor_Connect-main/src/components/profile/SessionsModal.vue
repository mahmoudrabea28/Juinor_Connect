<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="privacyStore.closeSessions()"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden" @mousedown.stop>
      <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Active Sessions</h2>
        <button type="button" class="text-gray-400 hover:text-gray-700" @click="privacyStore.closeSessions()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="px-6 py-5 space-y-3">
        <div
          v-for="session in privacyStore.sessions"
          :key="session.id"
          class="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-0"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ session.device }}</p>
              <p class="text-xs text-gray-400">{{ session.location }}
                <span v-if="session.current" class="ml-1 text-indigo-500 font-medium">(This device)</span>
              </p>
            </div>
          </div>
          <button
            v-if="!session.current"
            type="button"
            class="text-xs text-red-500 font-medium hover:text-red-700 shrink-0"
            @click="privacyStore.removeSession(session.id)"
          >
            Remove
          </button>
        </div>
        <p v-if="!privacyStore.sessions.length" class="text-sm text-gray-400 text-center py-4">No other active sessions.</p>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex justify-end">
        <button type="button" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700" @click="privacyStore.closeSessions()">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { privacyStore } from '../../state/privacyStore'
</script>
