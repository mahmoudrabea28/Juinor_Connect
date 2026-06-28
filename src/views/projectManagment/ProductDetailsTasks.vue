<script setup>
defineProps({
  project: { type: Object, default: null },
  taskView: { type: String, default: "board" },
  phases: { type: Array, default: () => [] },
  draggedTaskId: { default: null },
  onDragStart: { type: Function, default: () => {} },
  onDragOver: { type: Function, default: () => {} },
  onDrop: { type: Function, default: () => {} },
  onDragEnd: { type: Function, default: () => {} },
  openAddTask: { type: Function, default: () => {} },
  deleteTask: { type: Function, default: () => {} },
  toggleSubtask: { type: Function, default: () => {} },
  moveTask: { type: Function, default: () => {} },
  
});

function toggleTaskComplete(taskId) {
  project.boardColumns.forEach(col => {
    const task = col.cards.find(t => t.id === taskId);

    if (task) {
      task.completed = !task.completed;

      // optional: update status for UI
      task.status = task.completed ? "done" : "inprogress";
    }
  });
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-2">
        <button @click="taskView = 'list'"
          :class="['p-2 rounded-lg border transition', taskView === 'list' ? 'bg-[#EFF6FF] border-main text-main' : 'border-gray-200 text-text-gray hover:text-text-black']">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
        </button>
        <button @click="taskView = 'board'"
          :class="['p-2 rounded-lg border transition', taskView === 'board' ? 'bg-[#EFF6FF] border-main text-main' : 'border-gray-200 text-text-gray hover:text-text-black']">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="5" height="18" rx="1" stroke-width="2"/><rect x="10" y="3" width="5" height="12" rx="1" stroke-width="2"/><rect x="17" y="3" width="5" height="15" rx="1" stroke-width="2"/></svg>
        </button>
      </div>
    </div>

    <div v-if="taskView === 'board'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="col in (project.boardColumns || [])" :key="col.id" class="w-full"
        @dragover="onDragOver" @drop="e => onDrop(e, col.id)">
        <div class="flex items-center gap-2 mb-3">
          <span :class="['font-inter text-xs font-bold uppercase tracking-widest', col.color]">{{ col.label }}</span>
          <span class="bg-[#F1F5F9] text-text-gray text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">{{ col.cards.length }}</span>
        </div>
        <div class="flex flex-col gap-3 min-h-[200px] w-full">
          <div v-for="card in col.cards" :key="card.id" draggable="true"
            @dragstart="e => onDragStart(e, card.id)" @dragend="onDragEnd"
            :class="['w-full bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-4 hover:shadow-shadow-2 transition-shadow group', draggedTaskId === card.id ? 'opacity-50' : '']">
            <template v-if="card.completedYesterday">
              <p class="text-text-gray/40 text-base font-semibold line-through font-inter">{{ card.title }}</p>
              <div class="flex items-center gap-1 mt-2 font-inter text-xs text-main">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Completed Yesterday
              </div>
            </template>
            <template v-else>
              <div class="flex items-center justify-between mb-2">
                <span :class="['font-inter text-xs font-semibold px-2 py-0.5 rounded-full',
                  card.priority === 'HIGH' ? 'bg-red-100 text-red-600' : card.priority === 'MED' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600']">{{ card.priority }}</span>
              </div>
              <div class="flex items-center gap-2 mb-1">
 <input
  type="checkbox"
  v-model="card.completed"
  @change="toggleTaskComplete(card.id)"
/>
  <h4
    :class="[
      'font-inter font-semibold text-sm',
      card.completed ? 'line-through text-gray-400' : 'text-text-black'
    ]"
  >
    {{ card.title }}
  </h4>
</div>
              <!-- <h4 class="font-inter font-semibold text-text-black text-sm mb-1">{{ card.title }}</h4> -->
              <p v-if="card.desc" class="font-poppins text-xs text-text-gray mb-3">{{ card.desc }}</p>
              <div v-if="card.assigneeId" class="flex items-center gap-1.5 mb-2">
                <img :src="project.teamMembers?.find(m => m.id === card.assigneeId)?.avatar" class="w-5 h-5 rounded-full object-cover" />
                <span class="font-inter text-[10px] text-text-gray">{{ project.teamMembers?.find(m => m.id === card.assigneeId)?.name }}</span>
              </div>
              <div v-if="card.subtasks.length > 0" class="space-y-1 mb-2">
                <div v-for="sub in card.subtasks" :key="sub.id" class="flex items-center gap-1.5">
                  <input type="checkbox" :checked="sub.done" @change="toggleSubtask(col.id, card.id, sub.id)"
                    class="w-3 h-3 rounded border-gray-300 text-main cursor-pointer" />
                  <span :class="['font-inter text-[11px]', sub.done ? 'line-through text-text-gray' : 'text-text-black']">{{ sub.name }}</span>
                </div>
              </div>
              <div v-if="card.progress" class="w-full bg-gray-100 rounded-full h-1 mb-2">
                <div class="bg-main h-1 rounded-full" :style="'width:' + card.progress + '%'"></div>
              </div>
              <div class="flex items-center justify-between mt-2 font-inter text-xs text-text-gray">
                <span v-if="card.timeLeft" class="flex items-center gap-1 text-orange-500">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/></svg>
                  {{ card.timeLeft }}
                </span>
                <span v-if="card.date">{{ card.date }}</span>
                <span v-if="card.reviewPending" class="flex items-center gap-1 text-orange-500">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01"/></svg>
                  Review Pending
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-6">
      <div v-for="phase in phases" :key="phase.id"
        class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 overflow-hidden">
        <div class="flex items-center justify-between px-section-pad-x py-8 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            <h3 class="font-montaga text-xl font-bold text-text-black">{{ phase.label }}</h3>
            <span class="bg-[#EFF6FF] text-main font-inter text-xs font-semibold px-2.5 py-0.5 rounded-full">{{ phase.count }} TASKS</span>
          </div>
          <button @click="openAddTask" class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>
        <div class="grid grid-cols-12 font-inter text-xs text-text-gray uppercase tracking-widest px-section-pad-x py-2 border-b border-gray-100">
          <span class="col-span-5">TASK NAME</span>
          <span class="col-span-3">ASSIGNEE</span>
          <span class="col-span-2">DUE DATE</span>
          <span class="col-span-2">STATUS</span>
        </div>
        <div v-for="(task, idx) in phase.tasks" :key="task.id"
          :class="['grid grid-cols-12 items-center px-section-pad-x py-3 hover:bg-[#F8FAFC] transition', idx < phase.tasks.length - 1 ? 'border-b border-gray-100' : '']">
          <div class="col-span-5 flex items-center gap-3">
            <input type="checkbox" :checked="task.completed" @change="task.completed = !task.completed"
              class="w-4 h-4 rounded border-gray-300 text-main cursor-pointer" />
            <span :class="['font-inter text-sm', task.completed ? 'line-through text-text-gray' : 'text-text-black']">{{ task.name }}</span>
          </div>
          <div class="col-span-3 flex items-center gap-2">
            <img v-if="task.avatar" :src="task.avatar" class="w-6 h-6 rounded-full object-cover" />
            <div v-else class="w-6 h-6 rounded-full bg-[#EFF6FF] text-main font-inter text-xs font-bold flex items-center justify-center">{{ task.initials }}</div>
            <span class="font-inter text-sm text-text-gray">{{ task.assignee }}</span>
          </div>
          <div class="col-span-2">
            <span :class="['font-inter text-sm', task.dueRed ? 'text-red-500 font-semibold' : 'text-text-gray']">{{ task.due }}</span>
          </div>
          <div class="col-span-2 flex items-center gap-2">
            <span :class="['font-inter text-xs font-semibold px-2.5 py-1 rounded-full', task.statusColor]">{{ task.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
