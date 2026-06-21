<template>
  <div class="flex flex-col items-center gap-2 relative">
    <!-- Type badge chip -->
    <span
      v-if="badge.type"
      class="absolute -top-2 right-0 bg-white border border-gray-200 text-gray-500 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm"
    >
      {{ badge.type }}
    </span>

    <!-- Icon circle -->
    <div class="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
      <!-- Rocket (Pioneer) -->
      <svg v-if="badge.icon === 'rocket'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
      <!-- Star (Master) -->
      <svg v-else-if="badge.icon === 'star'" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <!-- Default shield -->
      <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    </div>

    <!-- Title -->
    <p class="text-sm font-semibold text-gray-800 text-center leading-tight">{{ badge.title }}</p>
    <p class="text-xs text-gray-400">{{ badge.earnedDate }}</p>
  </div>
</template>

<script setup>
defineProps({
  badge: { type: Object, required: true },
})
</script>
