<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue';
const router = useRouter()
import { getMyProjects } from '../../services/api' 
import { onMounted } from 'vue'
import LoadingScreen from '../../components/LoadingScreen.vue'
// ─── Mock Data (swap these refs for API calls later) ──────────────────────────

const stats = computed(() => [
  {
    id: 1,
    label: 'Total Projects',
    value: projects.value.length,
    icon: 'folder',
    color: 'bg-main',
    textColor: 'text-white',
    route: '/projects/allProjects',
  },
  {
    id: 2,
    label: 'In Progress',
    value: projects.value.filter(p => getProjectStatus(p) === 'in-progress').length,
    icon: 'clock',
    color: 'bg-[#EFF6FF]',
    textColor: 'text-main',
    route: '/projects/in-progress',
  },
  {
    id: 3,
    label: 'Completed',
    value: projects.value.filter(p => getProjectStatus(p) === 'completed').length,
    icon: 'check',
    color: 'bg-[#F0FDF4]',
    textColor: 'text-[#16A34A]',
    route: '/projects/completed',
  },
  {
    id: 4,
    label: 'Pending Review',
    value: projects.value.filter(p => getProjectStatus(p) === 'pending').length,
    icon: 'eye',
    color: 'bg-[#FFF7ED]',
    textColor: 'text-[#EA580C]',
    route: null,
  },
])
const projects = ref([])
const loadingProjects = ref(false)
const projectsError = ref(null)
const calculateProgress = (project) => {
  const tasks = project.tasks || []
  if (!tasks.length) return 0

  const done = tasks.filter(t => t.done).length
  return Math.round((done / tasks.length) * 100)
}
const fetchProjects = async () => {
  loadingProjects.value = true
  projectsError.value = null

  try {
    const res = await getMyProjects()
projects.value = res.projects.map(p => {
  const isFullTeam = (p.members?.length || 0) >= 4

  return {
     id: p._id,
  title: p.title,
  description: p.description,
  progress: calculateProgress(p),

    status: p.status,
    members: p.members || [],
    tasks: p.tasks || [],
    priority: p.difficulty === 'intermediate' ? 'Medium' : 'High',

    avatars: p.members?.map(m => ({
      initials: m.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      bg: 'bg-[#BFDBFE]',
      text: 'text-[#1D4ED8]'
    })) || []
  }
})
  } catch (err) {
    projectsError.value = err.message
  } finally {
    loadingProjects.value = false
  }
}
const user = ref(null)
onMounted(() => {
  const savedUser = localStorage.getItem('user')

  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }

  fetchProjects()
})

const tasks = ref([
  { id: 1, label: 'Review pull request #47 for auth module',  done: false },
  { id: 2, label: 'Update project documentation on Notion',   done: true  },
  { id: 3, label: 'Daily standup with the design team',       done: false },
  { id: 4, label: 'Fix responsive layout bug on mobile nav',  done: false },
  { id: 5, label: 'Send weekly progress report to mentor',    done: true  },
  { id: 6, label: 'Merge feature branch into main',           done: false },
])

const taskDistribution = computed(() => {
  const completed = projects.value.filter(
    p => getProjectStatus(p) === 'completed'
  ).length

  const inProgress = projects.value.filter(
    p => getProjectStatus(p) === 'in-progress'
  ).length

  const pending = projects.value.filter(
    p => getProjectStatus(p) === 'pending'
  ).length

  const total = completed + inProgress + pending || 1

  return [
    {
      label: 'Completed',
      count: completed,
      color: '#2563EB',
      pct: Math.round((completed / total) * 100)
    },
    {
      label: 'In Progress',
      count: inProgress,
      color: '#D668FC',
      pct: Math.round((inProgress / total) * 100)
    },
    {
      label: 'Pending',
      count: pending,
      color: '#BBCFF9',
      pct: Math.round((pending / total) * 100)
    }
  ]
})

const activityGrid = ref(
  Array.from({ length: 5 }, () =>
    Array.from({ length: 15 }, () => {
      const r = Math.random()
      return r > 0.65 ? (r > 0.85 ? 'high' : 'mid') : r > 0.35 ? 'low' : 'none'
    })
  )
)

const activityDays  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const activityWeeks = ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8','Wk 9','Wk 10','Wk 11','Wk 12','Wk 13','Wk 14','Wk 15']

const cellClass = (level) => {
  const map = { high: 'bg-main', mid: 'bg-[#BBCFF9]', low: 'bg-[#EFF6FF]', none: 'bg-gray-100' }
  return map[level] ?? 'bg-gray-100'
}

const completedTasks = computed(() => tasks.value.filter(t => t.done).length)
const totalTasks     = computed(() => tasks.value.length)

const priorityStyle = (p) =>
  p === 'High' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#FEF3C7] text-[#D97706]'

const progressBarColor = (p) =>
  p >= 100 ? 'bg-[#16A34A]' : p >= 75 ? 'bg-[#16A34A]' : p >= 50 ? 'bg-main' : 'bg-[#D8FC]'

// Donut chart
const DONUT_R  = 54
const DONUT_CX = 72
const DONUT_CY = 72
const CIRC     = 2 * Math.PI * DONUT_R

const donutSegments = computed(() => {
  let offset = 0
  return taskDistribution.value.map(seg => {
    const dash = (seg.pct / 100) * CIRC
    const gap  = CIRC - dash
    const s    = { ...seg, dash, gap, offset }
    offset    += dash
    return s
  })
})
const getProjectStatus = (project) => {
  const membersCount = project.members?.length || 0
  const tasks = project.tasks || []

  const allTasksDone = tasks.length > 0 && tasks.every(t => t.done)

  if (allTasksDone) return 'completed'

  if (membersCount < 4) return 'pending'

  return 'in-progress'
}
import { watch } from 'vue'

watch(
  projects,
  (newProjects) => {
    newProjects.forEach(project => {
      const allDone =
        project.tasks?.length > 0 &&
        project.tasks.every(t => t.done)

      if (allDone && project.status !== 'completed') {
        project.status = 'completed'
        saveProjectStatus(project.id, 'completed')
      }
    })
  },
  { deep: true }
)

</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] font-poppins text-text-black">

    <!-- ── NAVBAR ─────────────────────────────────────────────────────────── -->
    <Navbar />

    <!-- ── PAGE BODY ──────────────────────────────────────────────────────── -->
   <LoadingScreen :visible="loadingProjects" />

<div v-if="loadingProjects"></div>

<div
  v-else-if="projectsError"
  class="flex items-center justify-center min-h-[60vh] text-red-500"
>
  {{ projectsError }}
</div>

<main
  v-else
  class="page-shell py-main-margin-y space-y-gap-custom"
>

      <!-- ── HEADER GREETING ───────────────────────────────────────────── -->
      <div class="flex items-end justify-between">
        <div>
          <p class="font-inter text-sm text-text-gray mb-1 tracking-wide">
            {{ new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' }) }}
          </p>
          <h1 class="font-montaga text-3xl text-text-black leading-tight">
            Good morning, {{ user?.name || 'User' }} 👋
          </h1>
          <p class="font-inter text-sm text-text-gray mt-1.5">
            You have <span class="text-main font-semibold">{{ tasks.filter(t => !t.done).length }} tasks</span> pending today. Let's get to work!
          </p>
        </div>
        
      </div>

      <!-- ── STAT CARDS ─────────────────────────────────────────────────── -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <component
          v-for="stat in stats"
          :key="stat.id"
          :is="stat.route ? RouterLink : 'div'"
          :to="stat.route || undefined"
          :class="[
            stat.color,
            'rounded-2xl p-card-pad shadow-shadow-1 flex items-center gap-4 transition-all',
            stat.route ? 'hover:-translate-y-1 hover:shadow-shadow-2 cursor-pointer' : 'hover:-translate-y-0.5',
          ]"
        >
          <!-- Icon bubble -->
          <div :class="[stat.id === 1 ? 'bg-white/20' : 'bg-white', 'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm']">
            <svg v-if="stat.icon === 'folder'" :class="[stat.textColor, 'w-5 h-5']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
            </svg>
            <svg v-if="stat.icon === 'clock'" :class="[stat.textColor, 'w-5 h-5']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 3"/>
            </svg>
            <svg v-if="stat.icon === 'check'" :class="[stat.textColor, 'w-5 h-5']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-if="stat.icon === 'eye'" :class="[stat.textColor, 'w-5 h-5']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <!-- Text -->
          <div>
            <p :class="[stat.id === 1 ? 'text-white/80' : 'text-text-gray', 'font-inter text-xs font-medium mb-0.5']">{{ stat.label }}</p>
            <p :class="[stat.id === 1 ? 'text-white' : stat.textColor, 'font-montaga text-3xl leading-none font-bold']">{{ stat.value }}</p>
            <p v-if="stat.route" :class="[stat.id === 1 ? 'text-white/60' : 'text-text-gray', 'font-inter text-[10px] mt-1']">
              View all →
            </p>
          </div>
        </component>
      </div>

      <!-- ── MAIN GRID ──────────────────────────────────────────────────── -->
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-gap-custom">

        <!-- LEFT COLUMN -->
        <div class="space-y-gap-custom">

          <!-- RECENT PROJECTS -->
          <section class="bg-white rounded-2xl shadow-shadow-1 px-section-pad-x py-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="font-montaga text-xl text-text-black">Recent Projects</h2>
                <p class="font-inter text-xs text-text-gray mt-0.5">{{ projects.length }} active projects</p>
              </div>
              <RouterLink to="/projects/allProjects" class="font-inter text-xs font-semibold text-main hover:text-main-hover transition-colors flex items-center gap-1">
                View all
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <article
                v-for="project in projects"
                :key="project.id"
                @click="router.push(`/projects/${project.id}`)"
                class="border border-gray-100 rounded-xl p-5 hover:border-[#BBCFF9] hover:shadow-shadow-1 transition-all group cursor-pointer"
              >
                <div class="flex items-center justify-between mb-3">
                  <span :class="[priorityStyle(project.priority), 'text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider']">
                    {{ project.priority }}
                  </span>
                  <span
                   v-if="getProjectStatus(project) === 'completed'"
                    class="text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#F0FDF4] text-[#16A34A] flex items-center gap-1"
                  >
                    <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Done
                  </span>
                </div>

                <div class="flex items-center justify-between mb-1.5">
  <h3 class="font-inter font-semibold text-sm text-text-black leading-snug">
    {{ project.title }}
  </h3>

  <span
    v-if="getProjectStatus(project) === 'in-progress'"
    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-main"
  >
    In Progress
  </span>

  <span
    v-else-if="getProjectStatus(project) === 'completed'"
    class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A]"
  >
    Completed
  </span>
  <span
  v-else
  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#EA580C]"
>
  Pending
</span>
</div>
                <p class="font-poppins text-xs text-text-gray leading-relaxed line-clamp-2 mb-4">{{ project.description }}</p>

                <div class="mb-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-inter text-[10px] font-bold text-text-black">{{ project.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      :class="[progressBarColor(project.progress), 'h-1.5 rounded-full transition-all duration-700']"
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div
                      v-for="(av, i) in project.avatars"
                      :key="i"
                      :class="[av.bg, av.text, 'w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold font-inter ring-2 ring-white']"
                    >
                      {{ av.initials }}
                    </div>
                  </div>
                  <span class="font-inter text-[10px] text-text-gray">{{ project.avatars.length }} member{{ project.avatars.length !== 1 ? 's' : '' }}</span>
                </div>
              </article>
            </div>
          </section>

          <!-- ACTIVITY MAP -->
          <section class="bg-white rounded-2xl shadow-shadow-1 px-section-pad-x py-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="font-montaga text-xl text-text-black">Activity Map</h2>
                <p class="font-inter text-xs text-text-gray mt-0.5">Last 15 weeks of contributions</p>
              </div>
              <div class="flex items-center gap-3 text-[10px] font-inter text-text-gray">
                <span>Less</span>
                <div class="flex gap-1">
                  <div class="w-3 h-3 rounded-sm bg-gray-100"></div>
                  <div class="w-3 h-3 rounded-sm bg-[#EFF6FF]"></div>
                  <div class="w-3 h-3 rounded-sm bg-[#BBCFF9]"></div>
                  <div class="w-3 h-3 rounded-sm bg-main"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <div class="inline-block min-w-full">
                <div class="flex mb-1.5 pl-9">
                  <span
                    v-for="(wk, ci) in activityWeeks"
                    :key="ci"
                    class="font-inter text-[9px] text-gray-400 flex-1 text-center"
                  >{{ wk }}</span>
                </div>
                <div class="space-y-1">
                  <div v-for="(row, ri) in activityGrid" :key="ri" class="flex items-center gap-1">
                    <span class="font-inter text-[9px] text-gray-400 w-8 text-right flex-shrink-0">{{ activityDays[ri] }}</span>
                    <div
                      v-for="(cell, ci) in row"
                      :key="ci"
                      :class="[cellClass(cell), 'flex-1 h-4 rounded-sm hover:opacity-75 cursor-default transition-opacity']"
                      :title="`${activityDays[ri]} Wk${ci+1}: ${cell} activity`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="space-y-6">

          <!-- TASK DISTRIBUTION -->
          <section class="bg-white rounded-2xl shadow-shadow-1 px-section-pad-x py-8">
            <h2 class="font-montaga text-xl text-text-black mb-1">Task Distribution</h2>
            <p class="font-inter text-xs text-text-gray mb-6">Overall project overview</p>

            <div class="flex flex-col items-center">
              <div class="relative">
                <svg :width="DONUT_CX*2" :height="DONUT_CY*2" class="-rotate-90">
                  <circle :cx="DONUT_CX" :cy="DONUT_CY" :r="DONUT_R" fill="none" stroke="#F1F5F9" stroke-width="14"/>
                  <circle
                    v-for="seg in donutSegments"
                    :key="seg.label"
                    :cx="DONUT_CX" :cy="DONUT_CY" :r="DONUT_R"
                    fill="none"
                    :stroke="seg.color"
                    stroke-width="14"
                    :stroke-dasharray="`${seg.dash} ${seg.gap}`"
                    :stroke-dashoffset="-seg.offset"
                    stroke-linecap="round"
                    class="transition-all duration-700"
                  />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="font-montaga text-3xl text-text-black leading-none">{{ taskDistribution.reduce((a,s)=>a+s.count,0) }}</span>
                  <span class="font-inter text-[10px] text-text-gray mt-0.5">Total Tasks</span>
                </div>
              </div>

              <div class="w-full mt-6 space-y-3">
                <div v-for="seg in taskDistribution" :key="seg.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ background: seg.color }"></div>
                    <span class="font-inter text-xs text-text-gray">{{ seg.label }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-700" :style="{ width: seg.pct + '%', background: seg.color }"></div>
                    </div>
                    <span class="font-inter text-xs font-semibold text-text-black w-5 text-right">{{ seg.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- TODAY'S TASKS -->
          <section class="bg-white rounded-2xl shadow-shadow-1 px-section-pad-x py-8">
            <div class="flex items-center justify-between mb-1">
              <h2 class="font-montaga text-xl text-text-black">Today's Tasks</h2>
              <span class="font-inter text-[10px] font-semibold bg-[#EFF6FF] text-main px-2.5 py-1 rounded-full">
                {{ completedTasks }}/{{ totalTasks }}
              </span>
            </div>
            <p class="font-inter text-xs text-text-gray mb-5">
              {{ completedTasks === totalTasks ? 'All done! 🎉' : `${totalTasks - completedTasks} remaining` }}
            </p>

            <div class="w-full bg-gray-100 rounded-full h-1 mb-5 overflow-hidden">
              <div
                class="h-1 rounded-full bg-main transition-all duration-500"
                :style="{ width: (completedTasks / totalTasks * 100) + '%' }"
              ></div>
            </div>

            <ul class="space-y-3">
              <li v-for="task in tasks" :key="task.id">
                <label class="flex items-start gap-3 cursor-pointer w-full">
                  <div class="relative flex-shrink-0 mt-0.5">
                    <input v-model="task.done" type="checkbox" class="sr-only peer"/>
                    <div :class="['w-[18px] h-[18px] rounded border-2 transition-all flex items-center justify-center', task.done ? 'border-main bg-main' : 'border-gray-300 bg-white']">
                      <svg v-if="task.done" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                  <span :class="['font-poppins text-xs leading-relaxed transition-all duration-200', task.done ? 'line-through text-gray-400' : 'text-text-black']">
                    {{ task.label }}
                  </span>
                </label>
              </li>
            </ul>

            
          </section>

        </div>
      </div>
    </main>

    <!-- ── FOOTER ─────────────────────────────────────────────────────────── -->
    <footer class="px-main-margin-x py-6 border-t border-gray-100 flex items-center justify-between">
      <span class="font-inter text-xs text-text-gray">© 2026 JuniorConnect. All rights reserved.</span>
      <div class="flex items-center gap-4 font-inter text-xs text-text-gray">
        <a href="#" class="hover:text-text-black transition-colors">Privacy</a>
        <a href="#" class="hover:text-text-black transition-colors">Terms</a>
        <a href="#" class="hover:text-text-black transition-colors">Support</a>
      </div>
    </footer>

  </div>
</template>