<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-4">
    <!-- Section title -->
    <div class="flex items-center gap-2 mb-6">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <h2 class="text-base font-semibold text-gray-800">Locked Badges</h2>
    </div>

    <div v-if="achievementsStore.lockedBadges.length" class="grid grid-cols-2 gap-x-8 gap-y-6">
      <ProgressBadge
        v-for="badge in achievementsStore.lockedBadges"
        :key="badge.id"
        :badge="badge"
      />
    </div>
    <p v-else class="text-sm text-gray-400 text-center py-4">
      🎉 All badges unlocked — amazing work!
    </p>
  </section>
</template>

<script setup>
import { achievementsStore } from '../../state/achievementsStore'
import ProgressBadge from './ProgressBadge.vue'
</script>
