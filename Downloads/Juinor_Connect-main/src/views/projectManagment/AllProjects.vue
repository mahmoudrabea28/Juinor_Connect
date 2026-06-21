<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
const route  = useRoute()
const router = useRouter()

// ─── Single source of truth (swap for API call later) ─────────────────────────
const allProjects = ref([
  {
    id: 1,
    priority: 'High',
    status: 'in-progress',
    title: 'E-Commerce Platform Redesign',
    description: 'Revamping the full UI/UX of the storefront to improve conversion rates and mobile experience across all device sizes.',
    progress: 72,
    dueDate: '2026-07-15',
    avatars: [
      { initials: 'AK', bg: 'bg-[#BFDBFE]', text: 'text-[#1D4ED8]' },
      { initials: 'MR', bg: 'bg-[#E9D5FF]', text: 'text-[#7C3AED]' },
      { initials: 'SL', bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]' },
    ],
  },
  {
    id: 2,
    priority: 'Medium',
    status: 'in-progress',
    title: 'Dashboard Analytics Module',
    description: 'Building interactive charts and KPI widgets for the internal operations team to monitor metrics in real time.',
    progress: 45,
    dueDate: '2026-08-01',
    avatars: [
      { initials: 'JD', bg: 'bg-[#D1FAE5]', text: 'text-[#059669]' },
      { initials: 'TW', bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]' },
    ],
  },
  {
    id: 3,
    priority: 'High',
    status: 'completed',
    title: 'Mobile App Onboarding Flow',
    description: 'Designed and implemented a multi-step onboarding experience for new mobile users with animated transitions.',
    progress: 100,
    dueDate: '2026-05-30',
    avatars: [
      { initials: 'PN', bg: 'bg-[#FCE7F3]', text: 'text-[#DB2777]' },
      { initials: 'RC', bg: 'bg-[#BFDBFE]', text: 'text-[#1D4ED8]' },
      { initials: 'YK', bg: 'bg-[#E9D5FF]', text: 'text-[#7C3AED]' },
    ],
  },
  {
    id: 4,
    priority: 'Medium',
    status: 'in-progress',
    title: 'API Integration & Testing',
    description: 'Connecting third-party payment gateways and writing comprehensive integration tests with full coverage reports.',
    progress: 31,
    dueDate: '2026-09-10',
    avatars: [
      { initials: 'LM', bg: 'bg-[#D1FAE5]', text: 'text-[#059669]' },
    ],
  },
  {
    id: 5,
    priority: 'High',
    status: 'completed',
    title: 'Design System Documentation',
    description: 'Created a comprehensive Storybook library with all reusable UI components, tokens, and usage guidelines.',
    progress: 100,
    dueDate: '2026-04-20',
    avatars: [
      { initials: 'AK', bg: 'bg-[#BFDBFE]', text: 'text-[#1D4ED8]' },
      { initials: 'SL', bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]' },
    ],
  },
  {
    id: 6,
    priority: 'Medium',
    status: 'completed',
    title: 'User Authentication Refactor',
    description: 'Migrated legacy session-based auth to JWT with refresh token rotation and OAuth2 social login support.',
    progress: 100,
    dueDate: '2026-05-05',
    avatars: [
      { initials: 'JD', bg: 'bg-[#D1FAE5]', text: 'text-[#059669]' },
      { initials: 'MR', bg: 'bg-[#E9D5FF]', text: 'text-[#7C3AED]' },
      { initials: 'TW', bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]' },
    ],
  },
  {
    id: 7,
    priority: 'High',
    status: 'in-progress',
    title: 'Notification & Alerts Engine',
    description: 'Building a real-time notification service using WebSockets to deliver in-app and email alerts at scale.',
    progress: 58,
    dueDate: '2026-08-25',
    avatars: [
      { initials: 'PN', bg: 'bg-[#FCE7F3]', text: 'text-[#DB2777]' },
      { initials: 'LM', bg: 'bg-[#D1FAE5]', text: 'text-[#059669]' },
    ],
  },
  {
    id: 8,
    priority: 'Medium',
    status: 'in-progress',
    title: 'Search & Filter Optimization',
    description: 'Implementing Elasticsearch-powered full-text search with faceted filters, synonyms, and typo tolerance.',
    progress: 19,
    dueDate: '2026-10-01',
    avatars: [
      { initials: 'YK', bg: 'bg-[#E9D5FF]', text: 'text-[#7C3AED]' },
      { initials: 'RC', bg: 'bg-[#BFDBFE]', text: 'text-[#1D4ED8]' },
    ],
  },
])

// ─── Filter tabs definition ────────────────────────────────────────────────────
const tabs = [
  { key: null,          label: 'All',         route: '/projects/allProjects'           },
  { key: 'in-progress', label: 'In Progress',  route: '/projects/in-progress' },
  { key: 'completed',   label: 'Completed',    route: '/projects/completed'   },
]

// Active status derived from route param
const activeStatus = computed(() => route.params.status ?? null)

// Filtered list
const filteredProjects = computed(() =>
  activeStatus.value
    ? allProjects.value.filter(p => p.status === activeStatus.value)
    : allProjects.value
)

// ─── Counts for tab badges ─────────────────────────────────────────────────────
const countFor = (key) =>
  key ? allProjects.value.filter(p => p.status === key).length : allProjects.value.length

// ─── Search ───────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const displayedProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return filteredProjects.value
  return filteredProjects.value.filter(
    p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  )
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
const priorityStyle = (p) =>
  p === 'High' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#FEF3C7] text-[#D97706]'

const progressBarColor = (p, status) =>
  status === 'completed' ? 'bg-[#16A34A]' : p >= 50 ? 'bg-main' : 'bg-[#DEE8FC]'

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const pageTitle = computed(() => {
  if (activeStatus.value === 'in-progress') return 'In Progress'
  if (activeStatus.value === 'completed')   return 'Completed'
  return 'All Projects'
})

const pageSubtitle = computed(() => {
  const n = displayedProjects.value.length
  return `${n} project${n !== 1 ? 's' : ''} found`
})
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] font-poppins text-text-black">

    <!-- ── NAVBAR ─────────────────────────────────────────────────────────── -->
    <Navbar />

    <!-- ── PAGE BODY ──────────────────────────────────────────────────────── -->
    <main class="px-main-margin-x py-main-margin-y space-y-gap-custom">

      <!-- ── PAGE HEADER ────────────────────────────────────────────────── -->
      <div class="flex items-end justify-between">
        <div>
          <!-- Breadcrumb -->
          <div class="flex items-center gap-1.5 font-inter text-xs text-text-gray mb-2">
            <RouterLink to="/projects" class="hover:text-main transition-colors">Projects</RouterLink>
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="text-text-black font-medium">{{ pageTitle }}</span>
          </div>
          <h1 class="font-montaga text-3xl text-text-black leading-tight">{{ pageTitle }}</h1>
          <p class="font-inter text-sm text-text-gray mt-1.5">{{ pageSubtitle }}</p>
        </div>

        <button class="flex items-center gap-2 bg-main hover:bg-main-hover active:bg-main-active text-white text-sm font-inter font-medium px-5 py-2.5 rounded-xl transition-colors shadow-shadow-1">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          New Project
        </button>
      </div>

      <!-- ── FILTER BAR ─────────────────────────────────────────────────── -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <!-- Tabs -->
        <div class="flex items-center gap-1 bg-white rounded-xl p-1 shadow-shadow-1 border border-gray-100">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.label"
            :to="tab.route"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all',
              activeStatus === tab.key
                ? 'bg-main text-white shadow-sm'
                : 'text-text-gray hover:text-text-black hover:bg-[#F8FAFC]'
            ]"
          >
            {{ tab.label }}
            <span
              :class="[
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none',
                activeStatus === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-[#EFF6FF] text-main'
              ]"
            >
              {{ countFor(tab.key) }}
            </span>
          </RouterLink>
        </div>

        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search projects…"
            class="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl font-inter text-sm text-text-black placeholder-gray-400 shadow-shadow-1 focus:outline-none focus:border-[#BBCFF9] focus:ring-2 focus:ring-[#BBCFF9]/30 transition-all w-56"
          />
        </div>

      </div>

      <!-- ── PROJECTS GRID ──────────────────────────────────────────────── -->
      <div v-if="displayedProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <article
          v-for="project in displayedProjects"
          :key="project.id"
          @click="router.push(`/projects/${project.id}`)"
          :class="[
            'bg-white rounded-2xl shadow-shadow-1 p-card-pad border transition-all group cursor-pointer hover:-translate-y-0.5 hover:shadow-shadow-2',
            project.status === 'completed' ? 'border-[#BBF7D0] hover:border-[#86EFAC]' : 'border-gray-100 hover:border-[#BBCFF9]'
          ]"
        >
          <!-- Card top row: priority + status badge -->
          <div class="flex items-center justify-between mb-4">
            <span :class="[priorityStyle(project.priority), 'text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider']">
              {{ project.priority }}
            </span>

            <!-- Completed badge -->
            <span
              v-if="project.status === 'completed'"
              class="flex items-center gap-1 text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] uppercase tracking-wider"
            >
              <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Completed
            </span>

            <!-- In-progress indicator -->
            <span
              v-else
              class="flex items-center gap-1.5 text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-main uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-main animate-pulse inline-block"></span>
              Active
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-inter font-semibold text-base text-text-black leading-snug mb-2">{{ project.title }}</h3>

          <!-- Description -->
          <p class="font-poppins text-xs text-text-gray leading-relaxed line-clamp-2 mb-5">{{ project.description }}</p>

          <!-- Progress -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-inter text-[10px] text-text-gray font-medium">Progress</span>
              <span
                :class="[
                  'font-inter text-[10px] font-bold',
                  project.status === 'completed' ? 'text-[#16A34A]' : 'text-text-black'
                ]"
              >{{ project.progress }}%</span>
            </div>
            <div class="w-full rounded-full h-2 overflow-hidden" :class="project.status === 'completed' ? 'bg-[#DCFCE7]' : 'bg-gray-100'">
              <div
                :class="[progressBarColor(project.progress, project.status), 'h-2 rounded-full transition-all duration-700']"
                :style="{ width: project.progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Divider -->
          <div :class="['h-px mb-4', project.status === 'completed' ? 'bg-[#DCFCE7]' : 'bg-gray-50']"></div>

          <!-- Footer: avatars + due date -->
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
            <div class="flex items-center gap-1 font-inter text-[10px] text-text-gray">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {{ formatDate(project.dueDate) }}
            </div>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-else class="bg-white rounded-2xl shadow-shadow-1 py-20 flex flex-col items-center justify-center text-center border border-gray-100">
        <div class="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
          </svg>
        </div>
        <h3 class="font-montaga text-xl text-text-black mb-2">No projects found</h3>
        <p class="font-poppins text-sm text-text-gray max-w-xs">
          {{ searchQuery ? 'Try a different search term.' : 'There are no projects in this category yet.' }}
        </p>
        <button
          v-if="searchQuery"
          class="mt-5 font-inter text-sm text-main hover:text-main-hover font-medium transition-colors"
          @click="searchQuery = ''"
        >
          Clear search
        </button>
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