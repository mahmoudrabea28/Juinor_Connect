<script setup>
defineProps({
  project: { type: Object, default: null },
  completionPct: { type: Number, default: 0 },
  donutOffset: { type: Number, default: 0 },
  DONUT_CIRC: { type: Number, default: 0 },
  totalTaskCount: { type: Number, default: 0 },
  openIssuesCount: { type: Number, default: 0 },
  criticalIssueCount: { type: Number, default: 0 },
  milestonesDone: { type: Number, default: 0 },
  milestonesTotal: { type: Number, default: 0 },
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div class="lg:col-span-2 flex flex-col gap-4">
      <div class="bg-[#EFF6FF] border border-[#BBCFF9] rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden">
        <div class="w-9 h-9 bg-main rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div>
          <p class="font-inter text-xs font-semibold text-main uppercase tracking-widest mb-1">AI Mentor Insight</p>
          <p class="text-text-black font-medium leading-snug text-sm">"Refactoring the Auth Middleware is currently a bottleneck. Consider reallocating resources from the UI Polish phase to resolve this blocker 12% faster."</p>
        </div>
        <svg class="absolute right-4 top-4 opacity-10 w-20 h-20 text-main" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.34.07-.68.07-1.08s-.03-.73-.07-1.08l2.33-1.81c.21-.16.27-.46.12-.7l-2.2-3.82c-.15-.23-.45-.31-.68-.23l-2.74 1.1c-.58-.44-1.2-.81-1.9-1.08L14.21 2.1c-.05-.26-.28-.1-.28-.1h-4c-.26 0-.47.19-.5.44l-.42 2.9c-.7.27-1.32.64-1.9 1.08l-2.74-1.1c-.24-.09-.53 0-.68.23l-2.2 3.82c-.14.24-.08.54.12.7l2.33 1.81C3.53 11.27 3.5 11.62 3.5 12s.03.73.07 1.08L1.24 14.9c-.21.16-.27.46-.12.7l2.2 3.82c.15.23.45.31.68.23l2.74-1.1c.58.44 1.2.81 1.9 1.08l.42 2.9c.05.26.27.44.5.44h4s.23.16.28-.1l.41-2.9c.7-.27 1.32-.64 1.9-1.08l2.74 1.1c.24.09.53 0 .68-.23l2.2-3.82c.15-.24.09-.54-.12-.7l-2.33-1.81z"/>
        </svg>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8 flex items-center gap-8">
        <div class="relative flex-shrink-0">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="44" fill="none" stroke="#E5E7EB" stroke-width="12"/>
            <circle cx="55" cy="55" r="44" fill="none" stroke="#2563EB" stroke-width="12"
              :stroke-dasharray="DONUT_CIRC" :stroke-dashoffset="donutOffset" stroke-linecap="round" transform="rotate(-90 55 55)"/>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="font-montaga text-2xl font-bold text-text-black">{{ completionPct }}%</span>
            <span class="font-inter text-[10px] text-text-gray uppercase tracking-widest">COMPLETE</span>
          </div>
        </div>
        <div>
          <h3 class="font-montaga text-xl font-bold text-text-black mb-1">Workspace Momentum</h3>
          <p class="font-inter text-sm text-text-gray mb-4 leading-relaxed max-w-xs">You're currently ahead of projected schedule. Maintaining this velocity will allow for a "Soft Launch" phase two weeks earlier than planned.</p>
          <div class="flex gap-2">
            <span class="border border-gray-200 text-text-black text-xs font-inter px-3 py-1 rounded-full font-medium">On Track</span>
            <span class="border border-gray-200 text-text-black text-xs font-inter px-3 py-1 rounded-full font-medium">High Velocity</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-gray-100 shadow-shadow-1 p-card-pad">
          <p class="font-inter text-xs text-text-gray uppercase tracking-widest mb-2">TOTAL TASKS</p>
          <p class="font-montaga text-3xl font-bold text-text-black">{{ totalTaskCount }} <span class="font-inter text-sm text-main font-medium">+{{ Math.max(0, totalTaskCount - 100) }} today</span></p>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 shadow-shadow-1 p-card-pad">
          <p class="font-inter text-xs text-text-gray uppercase tracking-widest mb-2">OPEN ISSUES</p>
          <p class="font-montaga text-3xl font-bold text-red-500">{{ openIssuesCount }} <span class="font-inter text-sm text-text-gray font-normal">{{ criticalIssueCount }} critical</span></p>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 shadow-shadow-1 p-card-pad">
          <p class="font-inter text-xs text-text-gray uppercase tracking-widest mb-2">MILESTONES</p>
          <p class="font-montaga text-3xl font-bold text-text-black">{{ String(milestonesDone).padStart(2, '0') }} <span class="font-inter text-sm text-text-gray font-normal">of {{ String(milestonesTotal).padStart(2, '0') }}</span></p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8">
        <h3 class="font-inter text-sm font-semibold text-text-black mb-4">Project Metadata</h3>
        <div class="space-y-3 font-inter text-sm">
          <div class="flex justify-between items-center">
            <span class="text-text-gray">Status</span>
            <span class="bg-main/10 text-main text-xs font-semibold px-3 py-1 rounded-full">{{ project.status.toUpperCase() }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-text-gray">Project Lead</span>
            <div class="flex items-center gap-1.5"><span class="font-medium text-text-black">{{ project.projectLead }}</span><img :src="project.leadAvatar" class="w-6 h-6 rounded-full object-cover"/></div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-text-gray">Team</span>
            <div class="flex items-center -space-x-1">
              <img v-for="(av, i) in project.teamAvatars.slice(0, 3)" :key="i" :src="av" class="w-6 h-6 rounded-full border border-white object-cover" />
              <span class="font-inter text-xs text-text-gray ml-1">+{{ project.extraTeamCount }}</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-3 flex justify-between font-inter text-xs text-text-gray">
            <div><p class="uppercase tracking-widest mb-1">START DATE</p><p class="text-text-black font-medium">{{ project.startDate }}</p></div>
            <div class="text-right"><p class="uppercase tracking-widest mb-1">DUE DATE</p><p class="text-text-black font-medium">{{ project.dueDate }}</p></div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8">
        <p class="font-inter text-xs text-text-gray uppercase tracking-widest mb-3">WORKSPACE TAGS</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in project.tags" :key="tag" class="border border-gray-200 text-text-gray font-inter text-xs px-3 py-1 rounded-full">{{ tag }}</span>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8">
        <p class="font-inter text-xs text-text-gray uppercase tracking-widest mb-3">NEXT MAJOR STEP</p>
        <div class="flex items-start gap-2">
          <div class="w-1 h-10 bg-main rounded-full flex-shrink-0 mt-0.5"></div>
          <div>
            <p class="font-inter font-semibold text-text-black text-sm">{{ project.nextMajorStep }}</p>
            <p class="font-inter text-xs text-text-gray">Scheduled for {{ project.nextMajorStepIn }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
