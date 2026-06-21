<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
    <!-- Title -->
    <div class="flex items-center gap-2 mb-5">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
      <h2 class="text-base font-semibold text-gray-800">Milestones</h2>
    </div>

    <!-- Timeline -->
    <ol class="relative">
      <li
        v-for="(milestone, i) in achievementsStore.milestones"
        :key="milestone.id"
        class="relative pl-7 pb-6 last:pb-0"
      >
        <!-- Vertical line (not on last item) -->
        <div
          v-if="i < achievementsStore.milestones.length - 1"
          class="absolute left-[7px] top-5 bottom-0 w-px"
          :class="milestone.locked ? 'bg-gray-200' : 'bg-indigo-300'"
        ></div>

        <!-- Dot -->
        <div
          class="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center"
          :class="milestone.locked
            ? 'border-gray-200 bg-white'
            : 'border-indigo-500 bg-indigo-500'"
        >
          <div v-if="!milestone.locked" class="w-2 h-2 rounded-full bg-white"></div>
        </div>

        <!-- Content -->
        <div>
          <p
            class="text-sm font-semibold leading-tight"
            :class="milestone.locked ? 'text-gray-400' : 'text-gray-800'"
          >
            {{ milestone.title }}
          </p>

          <p
            v-if="milestone.date"
            class="text-xs text-gray-400 mt-0.5"
          >
            {{ milestone.date }}
          </p>
          <p
            v-else
            class="text-xs text-gray-400 mt-0.5"
          >
            Locked
          </p>

          <!-- Highlighted note for unlocked milestone -->
          <div
            v-if="milestone.note"
            class="mt-2 bg-indigo-50 rounded-lg px-3 py-2"
          >
            <p class="text-xs text-indigo-600 leading-relaxed">{{ milestone.note }}</p>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { achievementsStore } from '../../state/achievementsStore'
</script>
