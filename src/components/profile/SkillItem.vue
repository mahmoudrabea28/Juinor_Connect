<template>
  <div class="grid grid-cols-[150px_minmax(0,1fr)_28px] items-center gap-x-6 py-3.5">
    <!-- Skill capsule -->
    <span class="inline-flex items-center justify-center bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-full w-fit whitespace-nowrap">
      {{ skill.name }}
    </span>

    <!-- Level selector -->
    <div class="flex items-center gap-2.5">
      <button
        v-for="level in levels"
        :key="level"
        type="button"
        :class="levelClasses(level === skill.level)"
        @click="$emit('change-level', level)"
      >
        {{ level }}
      </button>
    </div>

    <!-- Delete -->
    <button
      type="button"
      class="text-gray-700 hover:text-red-600 transition-colors justify-self-end"
      aria-label="Remove skill"
      @click="$emit('remove')"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  skill: { type: Object, required: true },
  levels: { type: Array, required: true },
})
defineEmits(['change-level', 'remove'])

function levelClasses(active) {
  return [
    'px-5 py-2 rounded-full text-sm font-medium border transition-colors duration-150 min-w-[112px] text-center',
    active
      ? 'bg-indigo-600 border-indigo-600 text-white'
      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
  ]
}
</script>
