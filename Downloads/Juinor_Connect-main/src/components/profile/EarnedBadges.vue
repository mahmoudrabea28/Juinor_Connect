<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
    <!-- Section title -->
    <div class="flex items-center gap-2 mb-6">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
      <h2 class="text-base font-semibold text-gray-800">Earned Badges</h2>
    </div>

    <!-- Badge grid -->
    <div class="flex flex-wrap gap-8 px-4">
      <BadgeCard
        v-for="badge in achievementsStore.earnedBadges"
        :key="badge.id"
        :badge="badge"
      />
      <p v-if="!achievementsStore.earnedBadges.length" class="text-sm text-gray-400">
        No badges earned yet. Keep going!
      </p>
    </div>
  </section>
</template>

<script setup>
import { achievementsStore } from '../../state/achievementsStore'
import BadgeCard from './BadgeCard.vue'
</script>
