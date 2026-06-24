<script setup>
defineProps({
  project: { type: Object, default: null },
  openAddMilestone: { type: Function, default: () => {} },
  openEditMilestone: { type: Function, default: () => {} },
  deleteMilestone: { type: Function, default: () => {} },
});
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Header row -->
    <div class="flex items-center justify-between">
      <p class="font-inter text-sm text-text-gray">
        {{ project.milestones?.length || 0 }} milestone{{ project.milestones?.length !== 1 ? 's' : '' }}
      </p>
      <button @click="openAddMilestone"
        class="flex items-center gap-1.5 bg-main hover:bg-main-hover text-white text-sm font-inter font-medium px-4 py-2 rounded-xl transition-colors shadow-shadow-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
        </svg>
        Add Milestone
      </button>
    </div>

    <!-- ── MAIN TIMELINE CARD ── -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 overflow-hidden">
      <div v-if="project.milestones?.length">

        <div class="px-10 pt-10 pb-8">

          <!-- COLS WRAPPER: one flex row, equal columns -->
          <div class="flex items-start">

            <div v-for="(ms, idx) in project.milestones" :key="ms.id"
              class="flex-1 min-w-0 flex flex-col items-center">

              <!-- ① Status badge — fixed height so all titles start at same Y -->
              <span :class="[
                'inline-flex items-center font-inter text-[10px] font-bold px-3 py-1 rounded-full mb-3 h-6 tracking-wider whitespace-nowrap',
                ms.status === 'complete'    ? 'bg-[#DCFCE7] text-[#16A34A]' :
                ms.status === 'in-progress' ? 'bg-main text-white' :
                                              'bg-gray-100 text-text-gray'
              ]">
                {{ ms.status === 'complete' ? 'COMPLETE' : ms.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING' }}
              </span>

              <!-- ② Milestone name — 2-line fixed height so nodes stay on same row -->
              <p :class="[
                'font-inter font-bold text-sm text-center mb-4 px-3 leading-snug',
                'h-10 flex items-center justify-center line-clamp-2',
                ms.status === 'pending' ? 'text-text-gray' : 'text-text-black'
              ]">
                {{ ms.name }}
              </p>

              <!-- ③ Timeline node row — connector line lives here as a single absolute behind all nodes -->
              <div class="relative w-full flex justify-center mb-6">

                <!-- Left segment: from left edge to center (grey, except if previous was complete) -->
                <div v-if="idx > 0"
                  class="absolute top-1/2 -translate-y-1/2 right-1/2 left-0 h-0.5 z-0"
                  :class="project.milestones[idx - 1]?.status === 'complete' ? 'bg-main' : 'bg-gray-200'">
                </div>

                <!-- Right segment: from center to right edge (grey, unless this is complete) -->
                <div v-if="idx < project.milestones.length - 1"
                  class="absolute top-1/2 -translate-y-1/2 left-1/2 right-0 h-0.5 z-0"
                  :class="ms.status === 'complete' ? 'bg-main' : 'bg-gray-200'">
                </div>

                <!-- Node circle -->
                <div :class="[
                  'relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0',
                  ms.status === 'complete'    ? 'bg-main shadow-[0_0_0_5px_#DBEAFE]' :
                  ms.status === 'in-progress' ? 'bg-white border-2 border-main shadow-[0_0_0_5px_#DBEAFE]' :
                                                'bg-white border-2 border-gray-200 shadow-sm'
                ]">
                  <!-- Complete: solid checkmark -->
                  <svg v-if="ms.status === 'complete'"
                    class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                  <!-- In Progress: sparkle / magic icon matching reference -->
                  <svg v-else-if="ms.status === 'in-progress'"
                    class="w-5 h-5 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 3l14 9-14 9V3z"/>
                  </svg>
                  <!-- Pending: dashed circle with question mark -->
                  <svg v-else
                    class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="4 3"/>
                  </svg>
                </div>
              </div>

              <!-- ④ Detail card — same width as column, min height kept consistent -->
              <div :class="[
                'w-full mx-3 rounded-xl border p-5 flex flex-col gap-3 transition-shadow hover:shadow-md',
                ms.status === 'complete'    ? 'bg-white border-gray-100' :
                ms.status === 'in-progress' ? 'bg-[#EFF6FF] border-[#BBCFF9]' :
                                              'bg-[#F8FAFC] border-gray-100'
              ]" style="min-height: 180px;">

                <!-- Progress % + due date -->
                <div class="flex items-center justify-between">
                  <span :class="[
                    'font-inter text-xs font-semibold',
                    ms.status === 'complete'    ? 'text-[#16A34A]' :
                    ms.status === 'in-progress' ? 'text-main' :
                                                  'text-text-gray'
                  ]">
                    {{ ms.status === 'complete' ? '100% Completed' :
                       ms.status === 'in-progress' ? (ms.progress || 0) + '% In Progress' :
                       'Awaiting UI Specs' }}
                  </span>
                  <span class="font-inter text-[11px] text-text-gray">{{ ms.dueDate }}</span>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div class="h-1 rounded-full transition-all duration-500"
                    :class="ms.status === 'complete' ? 'bg-[#16A34A]' :
                            ms.status === 'in-progress' ? 'bg-main' : 'bg-gray-300'"
                    :style="'width:' + (ms.status === 'complete' ? 100 : ms.progress || 0) + '%'">
                  </div>
                </div>

                <!-- Description -->
                <p class="font-poppins text-xs text-text-gray leading-relaxed line-clamp-3 flex-1">
                  {{ ms.description || 'No description provided.' }}
                </p>

                <!-- Members + Sprint badge (if in-progress) -->
                <div class="flex items-center gap-2">
                  <template v-if="ms.members?.length">
                    <div class="flex -space-x-1.5">
                      <img v-for="(av, i) in ms.members.slice(0, 3)" :key="i"
                        :src="av" class="w-6 h-6 rounded-full border-2 border-white object-cover shadow-sm"/>
                      <span v-if="ms.members.length > 3"
                        class="w-6 h-6 rounded-full bg-[#EFF6FF] border-2 border-white flex items-center justify-center font-inter text-[9px] text-main font-bold">
                        +{{ ms.members.length - 3 }}
                      </span>
                    </div>
                  </template>
                  <span v-if="ms.status === 'in-progress'"
                    class="flex items-center gap-1 font-inter text-[11px] text-text-gray ml-auto">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke-width="2"/>
                      <path stroke-linecap="round" d="M12 6v6l4 2" stroke-width="2"/>
                    </svg>
                    SPRINT {{ ms.phase || 4 }} ACTIVE
                  </span>
                  <span v-if="ms.status === 'pending' && !ms.members?.length"
                    class="font-inter text-xs text-main hover:underline cursor-pointer ml-auto">
                    View Dependencies →
                  </span>
                </div>

                <!-- Edit / Delete actions -->
                <div class="flex items-center justify-between pt-2.5 border-t border-gray-100 mt-auto">
                  <button @click.stop="openEditMilestone(ms)"
                    class="flex items-center gap-1 font-inter text-xs text-text-gray hover:text-main transition-colors p-1 rounded hover:bg-white">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </button>
                  <button @click.stop="deleteMilestone(project.id, ms.id)"
                    class="flex items-center gap-1 font-inter text-xs text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-white">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <div class="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <p class="font-montaga text-lg text-text-black mb-1">No milestones yet</p>
        <p class="font-inter text-sm text-text-gray mb-5">Break your project into phases to track progress clearly.</p>
        <button @click="openAddMilestone"
          class="flex items-center gap-2 bg-main hover:bg-main-hover text-white font-inter text-sm font-medium px-5 py-2.5 rounded-xl shadow-shadow-1 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
          </svg>
          Add First Milestone
        </button>
      </div>
    </div>

    <!-- ── BOTTOM METRICS ROW ── -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <!-- Team Velocity -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-6">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-inter font-semibold text-text-black text-sm">Team Velocity</h4>
          <svg class="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
        <p class="font-montaga text-3xl text-main leading-tight">24.5</p>
        <p class="font-inter text-[10px] text-text-gray uppercase tracking-widest mb-5">Story Points / Sprint</p>
        <!-- Bar chart -->
        <div class="flex items-end gap-1.5 h-12">
          <div class="flex-1 bg-[#BFDBFE] rounded-t-sm" style="height:38%"></div>
          <div class="flex-1 bg-[#93B4F7] rounded-t-sm" style="height:54%"></div>
          <div class="flex-1 bg-[#5A8EF0] rounded-t-sm" style="height:72%"></div>
          <div class="flex-1 bg-main rounded-t-sm" style="height:100%"></div>
        </div>
      </div>

      <!-- Risk Assessment -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-inter font-semibold text-text-black text-sm">Risk Assessment</h4>
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <ul class="space-y-3">
          <li class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-main flex-shrink-0"></span>
            <span class="font-inter text-sm text-text-black flex-1">Resource Allocation</span>
            <span class="font-inter text-xs text-text-gray">(Low)</span>
          </li>
          <li class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
            <span class="font-inter text-sm text-text-black flex-1">Timeline Drift</span>
            <span class="font-inter text-xs text-text-gray">(Neutral)</span>
          </li>
          <li class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
            <span class="font-inter text-sm text-text-black flex-1">External API Docs</span>
            <span class="font-inter text-xs text-text-gray">(High)</span>
          </li>
        </ul>
      </div>

      <!-- Project Health -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-6">
        <h4 class="font-inter font-semibold text-text-black text-sm mb-3">Project Health</h4>
        <p class="font-montaga text-4xl text-main mb-1">Excellent</p>
        <p class="font-inter text-xs text-text-gray">All primary KPIs within 5% of target.</p>
      </div>

    </div>
  </div>
</template>
