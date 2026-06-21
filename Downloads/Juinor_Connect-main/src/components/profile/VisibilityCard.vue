<template>
  <!-- Outer container card -->
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Who can see your profile?</h3>

    <div class="grid grid-cols-3 gap-4">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="[
          'relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-colors',
          privacyStore.profileVisibility === option.value
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 bg-white hover:border-gray-300',
        ]"
        @click="privacyStore.changeVisibility(option.value)"
      >
        <!-- Radio indicator top-right -->
        <div
          :class="[
            'absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center',
            privacyStore.profileVisibility === option.value
              ? 'border-indigo-500'
              : 'border-gray-300',
          ]"
        >
          <div
            v-if="privacyStore.profileVisibility === option.value"
            class="w-2 h-2 rounded-full bg-indigo-500"
          ></div>
        </div>

        <!-- Icon -->
        <div class="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <!-- Globe (Public) -->
          <svg v-if="option.value === 'public'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <!-- People (Team) -->
          <svg v-else-if="option.value === 'team'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <!-- Lock (Private) -->
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <!-- Label -->
        <p
          :class="[
            'text-sm font-semibold',
            privacyStore.profileVisibility === option.value ? 'text-indigo-600' : 'text-gray-800',
          ]"
        >
          {{ option.label }}
        </p>
        <p class="text-xs text-gray-400 leading-relaxed">{{ option.description }}</p>
      </button>
    </div>

    <!-- Discovery toggle -->
    <div class="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
      <div>
        <p class="text-sm font-semibold text-gray-700">Show profile in team discovery</p>
        <p class="text-xs text-gray-400 mt-0.5">Recommended for networking with mentors and peers.</p>
      </div>
      <button
        type="button"
        :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none shrink-0',
          privacyStore.showInDiscovery ? 'bg-indigo-600' : 'bg-gray-200',
        ]"
        @click="privacyStore.toggleDiscovery()"
      >
        <span
          :class="[
            'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
            privacyStore.showInDiscovery ? 'translate-x-6' : 'translate-x-1',
          ]"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { privacyStore } from '../../state/privacyStore'

const options = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone on JuniorConnect can view your profile.',
  },
  {
    value: 'team',
    label: 'Team Only',
    description: 'Only your current team members can view.',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Hidden from search and discovery.',
  },
]
</script>
