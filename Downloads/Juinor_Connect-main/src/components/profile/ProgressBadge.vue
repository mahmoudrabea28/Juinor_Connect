<template>
  <div class="flex flex-col gap-3">
    <!-- Top row: icon + title + requirement -->
    <div class="flex items-start gap-3">
      <!-- Icon circle -->
      <div class="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        <!-- Team Leader -->
        <svg v-if="badge.icon === 'team'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <!-- Community Pillar -->
        <svg v-else-if="badge.icon === 'community'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <!-- Continuous Learner -->
        <svg v-else-if="badge.icon === 'learner'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <!-- Super Contributor -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <line x1="6" y1="9" x2="6" y2="21" />
        </svg>
      </div>

      <div class="min-w-0">
        <p class="text-sm font-semibold text-gray-800">{{ badge.title }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ badge.requirement }}</p>
      </div>
    </div>

    <!-- Read-only progress bar — width driven by app state, no user controls -->
    <div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-indigo-600 rounded-full transition-all duration-300"
          :style="{ width: pct + '%' }"
        ></div>
      </div>
      <div class="flex justify-between mt-1">
        <span class="text-xs text-gray-400">{{ badge.current }}/{{ badge.goal }} {{ badge.progressLabel }}</span>
        <span class="text-xs text-gray-400">{{ pct }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { achievementsStore } from '../../state/achievementsStore'

const props = defineProps({
  badge: { type: Object, required: true },
})

const pct = computed(() =>
  achievementsStore.calculatePercentage(props.badge.current, props.badge.goal)
)
</script>
