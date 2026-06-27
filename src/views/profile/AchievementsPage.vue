<template>
  <div>
    <!-- Page subtitle -->
    <p class="text-gray-500 text-[15px] mb-5">Track your progress and celebrate your milestones.</p>

    <!-- Two-column layout: left badges | right milestones -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
      <!-- Left column: earned + locked badges -->
      <div class="order-2 lg:order-1">
        <EarnedBadges />
        <LockedBadges />
      </div>

      <!-- Right column: milestones timeline -->
      <div class="order-1 lg:order-2">
        <MilestonesTimeline />
      </div>
    </div>
  </div>
</template>

<script setup>
import EarnedBadges from '../../components/profile/EarnedBadges.vue'
import LockedBadges from '../../components/profile/LockedBadges.vue'
import MilestonesTimeline from '../../components/profile/MilestonesTimeline.vue'
</script>