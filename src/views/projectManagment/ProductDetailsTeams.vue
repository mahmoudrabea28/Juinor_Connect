<script setup>
defineProps({
  project: { type: Object, default: null },
  openAddMember: { type: Function, default: () => {} },
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <p class="font-inter text-sm text-text-gray">{{ project.teamMembers?.length || 0 }} members</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="member in (project.teamMembers || [])" :key="member.id"
        class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8 hover:shadow-shadow-2 transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="text-indigo-500">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
</div>
            <span :class="['absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white', member.online ? 'bg-green-400' : 'bg-red-400']"></span>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </button>
          </div>
        </div>
        <h3 class="font-inter font-bold text-text-black text-base">{{ member.name }}</h3>
        <p class="font-inter text-xs text-text-gray mb-3">{{ member.role }}</p>
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span v-for="skill in member.skills" :key="skill"
            class="border border-gray-200 text-text-gray font-inter text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider">{{ skill }}</span>
        </div>
        <div>
          <p class="font-inter text-[10px] text-text-gray uppercase tracking-widest mb-1.5">ACTIVE WORK</p>
          <div class="bg-[#F8FAFC] rounded-lg px-3 py-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-text-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            <span class="font-inter text-xs text-text-black font-medium">{{ member.task }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
