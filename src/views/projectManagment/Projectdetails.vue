<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjects } from "../../composables/useProjects";

const route = useRoute();
const router = useRouter();
const props = defineProps({ id: { type: String, default: null } });

const {
  getProject,
  addMilestone, editMilestone, deleteMilestone,
  createFolder, renameFolder, deleteFolder, folderHasChildren,
  uploadFile, deleteFile, renameFile, toggleLockFile, moveFile,
  usedStorage, remainingStorage, usedStoragePct,
  getVersionHistory, addVersionLog,
  moveTask, deleteTask: deleteTaskFn, addTask: addTaskFn,
} = useProjects();

const projectId = computed(() => route.params.id || props.id || "1");

const project = computed(() => getProject(projectId.value));

const activeTab = ref("Overview");
const taskView = ref("board");
const tabs = ["Overview", "Tasks", "Milestones", "Files", "Teams"];

const totalTaskCount = computed(() =>
  project.value?.boardColumns?.reduce((sum, col) => sum + col.cards.length, 0) || 0
);
const doneTaskCount = computed(() =>
  project.value?.boardColumns?.find(c => c.id === "done")?.cards.length || 0
);
const completionPct = computed(() =>
  totalTaskCount.value > 0 ? Math.round((doneTaskCount.value / totalTaskCount.value) * 100) : 0
);
const openIssuesCount = computed(() =>
  project.value?.boardColumns?.filter(c => c.id !== "done").reduce((sum, col) => sum + col.cards.length, 0) || 0
);
const criticalIssueCount = computed(() =>
  project.value?.boardColumns?.flatMap(c => c.cards).filter(c => c.priority === "HIGH").length || 0
);

const milestonesDone = computed(() => project.value?.milestonesCompleted || 0);
const milestonesTotal = computed(() => project.value?.milestonesTotal || 0);

const DONUT_R = 44;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;
const donutOffset = computed(() => DONUT_CIRC - (DONUT_CIRC * completionPct.value / 100));

const draggedTaskId = ref(null);

function onDragStart(e, taskId) {
  draggedTaskId.value = taskId;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", taskId);
}
function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
function onDrop(e, toColId) {
  e.preventDefault();
  if (draggedTaskId.value !== null) {
    moveTask(projectId.value, draggedTaskId.value, toColId);
    draggedTaskId.value = null;
  }
}
function onDragEnd() {
  draggedTaskId.value = null;
}

const showAddTask = ref(false);
const newTask = ref({ title: "", desc: "", priority: "MED", assigneeId: null });

function openAddTask() {
  newTask.value = { title: "", desc: "", priority: "MED", assigneeId: null };
  showAddTask.value = true;
}
function closeAddTask() { showAddTask.value = false; }
function submitTask() {
  if (!newTask.value.title.trim()) return;
  addTaskFn(projectId.value, {
    id: Date.now(),
    priority: newTask.value.priority,
    title: newTask.value.title,
    desc: newTask.value.desc || null,
    assigneeId: newTask.value.assigneeId,
    subtasks: [],
    timeLeft: null,
    date: null,
  });
  closeAddTask();
}

function deleteTask(colId, taskId) {
  deleteTaskFn(projectId.value, colId, taskId);
}

function toggleSubtask(colId, taskId, subId) {
  const col = project.value?.boardColumns?.find(c => c.id === colId);
  if (!col) return;
  const task = col.cards.find(t => t.id === taskId);
  if (!task) return;
  const sub = task.subtasks.find(s => s.id === subId);
  if (sub) sub.done = !sub.done;
}

const showAddMember = ref(false);
const newMember = ref({ name: "", role: "", skills: "" });

function openAddMember() {
  newMember.value = { name: "", role: "", skills: "" };
  showAddMember.value = true;
}
function closeAddMember() { showAddMember.value = false; }
function submitMember() {
  if (!newMember.value.name.trim()) return;
  project.value?.teamMembers?.push({
    id: Date.now(),
    name: newMember.value.name,
    role: newMember.value.role || "Team Member",
    skills: newMember.value.skills ? newMember.value.skills.split(",").map(s => s.trim().toUpperCase()) : [],
    task: "Unassigned",
    online: true,
    avatar: `https://i.pravatar.cc/80?img=${39 + (project.value?.teamMembers?.length || 0)}`,
  });
  closeAddMember();
}

const phases = computed(() => [
  {
    id: 1, label: "Active Tasks",
    count: project.value?.boardColumns?.filter(c => c.id !== "done").reduce((s, c) => s + c.cards.length, 0) || 0,
    tasks: (project.value?.boardColumns?.filter(c => c.id !== "done").flatMap(c => c.cards) || []).map(t => ({
      id: t.id, name: t.title,
      assignee: project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.name || "Unassigned",
      avatar: project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.avatar,
      initials: (project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.name || "UN").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      due: t.date || "TBD", status: t.progress ? "IN PROGRESS" : "PLANNED",
      statusColor: t.priority === "HIGH" ? "bg-red-100 text-red-600" : t.priority === "MED" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-600",
      dueRed: t.priority === "HIGH",
      completed: false,
    })),
  },
  {
    id: 2, label: "Completed Tasks",
    count: project.value?.boardColumns?.find(c => c.id === "done")?.cards.length || 0,
    tasks: (project.value?.boardColumns?.find(c => c.id === "done")?.cards || []).map(t => ({
      id: t.id, name: t.title,
      assignee: project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.name || "Unassigned",
      avatar: project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.avatar,
      initials: (project.value?.teamMembers?.find(m => m.id === t.assigneeId)?.name || "UN").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      due: t.date || "Completed", status: "DONE",
      statusColor: "bg-green-100 text-green-600",
      dueRed: false,
      completed: true,
    })),
  },
]);

// ─── Milestone Modal ───
const showMilestoneModal = ref(false);
const editingMilestone = ref(null);
const milestoneForm = ref({ name: "", description: "", dueDate: "", phase: 1, progress: 0 });

function openAddMilestone() {
  editingMilestone.value = null;
  milestoneForm.value = { name: "", description: "", dueDate: "", phase: (project.value?.milestones?.length || 0) + 1, progress: 0 };
  showMilestoneModal.value = true;
}
function openEditMilestone(ms) {
  editingMilestone.value = ms.id;
  milestoneForm.value = { name: ms.name, description: ms.description, dueDate: ms.dueDate, phase: ms.phase, progress: ms.progress };
  showMilestoneModal.value = true;
}
function closeMilestoneModal() { showMilestoneModal.value = false; }
function submitMilestone() {
  if (!milestoneForm.value.name.trim()) return;
  if (editingMilestone.value) {
    editMilestone(projectId.value, editingMilestone.value, { ...milestoneForm.value });
  } else {
    addMilestone(projectId.value, { ...milestoneForm.value });
  }
  closeMilestoneModal();
}

// ─── File Management ───
const showFileMenu = ref(null);
const showCreateFolder = ref(false);
const newFolderName = ref("");
const folderParentId = ref(null);
const searchQuery = ref("");
const sortBy = ref("name");
const sortAsc = ref(true);
const showDeleteConfirm = ref(null);
const renameTarget = ref(null);
const renameValue = ref("");
const currentFolderId = ref(null);

function toggleFileMenu(id) {
  showFileMenu.value = showFileMenu.value === id ? null : id;
}
function openCreateFolder(parentId = null) {
  folderParentId.value = parentId;
  newFolderName.value = "";
  showCreateFolder.value = true;
}
function submitCreateFolder() {
  if (!newFolderName.value.trim()) return;
  createFolder(projectId.value, newFolderName.value.trim(), folderParentId.value);
  showCreateFolder.value = false;
}
function handleRename(item, type) {
  renameTarget.value = { item, type };
  renameValue.value = item.name;
}
function submitRename() {
  if (!renameTarget.value || !renameValue.value.trim()) return;
  if (renameTarget.value.type === "folder") {
    renameFolder(projectId.value, renameTarget.value.item.id, renameValue.value.trim());
  } else {
    renameFile(projectId.value, renameTarget.value.item.id, renameValue.value.trim());
  }
  renameTarget.value = null;
}
function handleDelete(item, type) {
  showDeleteConfirm.value = { item, type };
}
function confirmDeleteItem() {
  if (!showDeleteConfirm.value) return;
  const { item, type } = showDeleteConfirm.value;
  if (type === "folder") {
    if (folderHasChildren(projectId.value, item.id)) {
      if (!confirm("This folder contains items. Delete anyway?")) return;
    }
    deleteFolder(projectId.value, item.id);
  } else {
    deleteFile(projectId.value, item.id);
  }
  showDeleteConfirm.value = null;
}
function handleBrowseUpload() {
  const exts = ["PDF", "PNG", "JPG", "DOCX", "XLSX", "ZIP", "MP4"];
  const names = ["Report", "Screenshot", "Document", "Data", "Archive", "Video"];
  const ext = exts[Math.floor(Math.random() * exts.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  uploadFile(projectId.value, {
    name: `${name}.${ext.toLowerCase()}`,
    size: Math.round(Math.random() * 200 + 0.5 * 10) / 10,
    type: ext,
    folderId: currentFolderId.value,
    uploader: "Current User",
  });
}
function handleDropUpload(e) {
  e.preventDefault();
  const items = e.dataTransfer.files;
  for (const file of items) {
    const ext = file.name.split(".").pop().toUpperCase();
    uploadFile(projectId.value, {
      name: file.name,
      size: Math.round(file.size / (1024 * 1024) * 10) / 10,
      type: ext,
      folderId: currentFolderId.value,
      uploader: "Current User",
    });
  }
}

const filteredFiles = computed(() => {
  if (!project.value) return [];
  const q = searchQuery.value.toLowerCase().trim();
  let items = project.value.files.filter(f => !q || f.name.toLowerCase().includes(q));
  if (currentFolderId.value !== null) {
    items = items.filter(f => f.folderId === currentFolderId.value);
  }
  const sorted = [...items];
  sorted.sort((a, b) => {
    let cmp = 0;
    if (sortBy.value === "name") cmp = a.name.localeCompare(b.name);
    else if (sortBy.value === "date") cmp = new Date(a.lastModified) - new Date(b.lastModified);
    else if (sortBy.value === "size") cmp = a.size - b.size;
    return sortAsc.value ? cmp : -cmp;
  });
  return sorted;
});

const filteredFolders = computed(() => {
  if (!project.value) return [];
  const q = searchQuery.value.toLowerCase().trim();
  let items = project.value.folders.filter(f => !q || f.name.toLowerCase().includes(q));
  if (currentFolderId.value !== null) {
    items = items.filter(f => f.parentId === currentFolderId.value);
  } else {
    items = items.filter(f => f.parentId === null);
  }
  return items;
});

function getBreadcrumbs() {
  const crumbs = [];
  const allFolders = project.value?.folders || [];
  let current = allFolders.find(f => f.id === currentFolderId.value);
  while (current) {
    crumbs.unshift(current);
    current = allFolders.find(f => f.id === current.parentId);
  }
  return crumbs;
}

function navigateToFolder(folderId) {
  currentFolderId.value = folderId;
  showFileMenu.value = null;
}

function getExtBadge(ext) {
  const map = {
    PDF: { bg: "bg-red-50", fg: "text-red-500", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    ZIP: { bg: "bg-yellow-50", fg: "text-yellow-600", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
    PNG: { bg: "bg-blue-50", fg: "text-blue-500", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    FIGMA: { bg: "bg-purple-50", fg: "text-purple-500", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
    JPG: { bg: "bg-green-50", fg: "text-green-500", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    DOCX: { bg: "bg-blue-50", fg: "text-blue-600", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    XLSX: { bg: "bg-green-50", fg: "text-green-600", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    MP4: { bg: "bg-purple-50", fg: "text-purple-500", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  };
  return map[ext] || { bg: "bg-gray-50", fg: "text-text-gray", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" };
}

function formatSize(mb) {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(1)} MB`;
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] font-poppins text-text-black">

    <!-- ── NAVBAR ─────────────────────────────────────────────────────────── -->
    <header class="bg-white border-b border-gray-100 shadow-shadow-1 sticky top-0 z-50">
      <div class="px-main-margin-x flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-main flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span class="font-montaga text-xl tracking-tight text-text-black">Junior<span class="text-main">Connect</span></span>
        </RouterLink>
        <nav class="hidden md:flex items-center gap-8 font-inter text-sm font-medium">
          <RouterLink to="/" class="text-text-gray hover:text-text-black transition-colors">Dashboard</RouterLink>
          <RouterLink to="/projects" class="text-main border-b-2 border-main pb-0.5">Projects</RouterLink>
          <a href="#" class="text-text-gray hover:text-text-black transition-colors">Tasks</a>
          <a href="#" class="text-text-gray hover:text-text-black transition-colors">Team</a>
          <a href="#" class="text-text-gray hover:text-text-black transition-colors">Reports</a>
        </nav>
        <div class="flex items-center gap-3">
          <button class="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-text-gray hover:bg-[#E2E8F0] transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button class="relative w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-text-gray hover:bg-[#E2E8F0] transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D668FC] rounded-full ring-2 ring-white"></span>
          </button>
          <div class="w-9 h-9 rounded-full bg-main flex items-center justify-center text-white text-xs font-semibold font-inter cursor-pointer ring-2 ring-[#BBCFF9]">AX</div>
        </div>
      </div>
    </header>

    <!-- ── PAGE BODY ──────────────────────────────────────────────────── -->
    <main v-if="project" class="px-main-margin-x py-10 space-y-gap-custom">
      <button @click="router.back()" class="flex items-center text-text-gray hover:text-text-black transition group" aria-label="Go back">
        <svg class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <div class="flex items-start justify-between">
        <div>
          <p class="font-inter text-xs text-text-gray mb-1">
            <RouterLink to="/projects" class="hover:text-main transition-colors">Projects</RouterLink>
            <span class="mx-1">&#8250;</span>
            <span class="font-medium text-text-black">{{ project.title }}</span>
          </p>
          <h1 class="font-montaga text-3xl text-text-black leading-tight">{{ project.title }}</h1>
          <p class="font-inter text-sm text-text-gray mt-1.5">{{ project.category }} &middot; Due {{ project.dueDate }}</p>
        </div>
        <div class="flex items-center mt-1">
          <div class="flex -space-x-2">
            <img v-for="(av, i) in project.teamAvatars.slice(0, 3)" :key="i" :src="av" class="w-8 h-8 rounded-full border-2 border-white object-cover" />
          </div>
          <span class="ml-1 font-inter text-sm text-text-gray font-medium">+{{ project.extraTeamCount }}</span>
        </div>
      </div>

      <div class="flex items-center gap-1 border-b border-gray-200">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['px-4 py-2.5 text-sm font-inter font-medium transition-colors relative',
            activeTab === tab
              ? 'text-main after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-main'
              : 'text-text-gray hover:text-text-black']">
          {{ tab }}
        </button>
      </div>

      <!-- ===================== OVERVIEW ===================== -->
      <div v-if="activeTab === 'Overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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

      <!-- ===================== TASKS ===================== -->
      <div v-else-if="activeTab === 'Tasks'">
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
          <button @click="openAddTask"
            class="flex items-center gap-1.5 bg-main hover:bg-main-hover text-white text-sm font-inter font-medium px-4 py-2 rounded-xl transition-colors shadow-shadow-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Add Task
          </button>
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
                :class="['w-full bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-4 hover:shadow-shadow-2 transition-shadow group cursor-grab active:cursor-grabbing', draggedTaskId === card.id ? 'opacity-50' : '']">
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
                    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div class="relative" @click.stop>
                        <button class="text-text-gray hover:text-text-black p-0.5 rounded transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                        </button>
                        <div class="absolute right-0 top-full mt-1 bg-white rounded-xl border border-gray-100 shadow-shadow-2 py-1 z-20 min-w-[160px] hidden group-hover:block">
                          <button v-for="target in (project.boardColumns || []).filter(c => c.id !== col.id)" :key="target.id"
                            @click="moveTask(project.id, card.id, target.id)"
                            class="block w-full text-left px-4 py-1.5 font-inter text-xs text-text-gray hover:bg-[#F8FAFC] hover:text-text-black transition-colors">
                            Move to {{ target.label }}
                          </button>
                        </div>
                      </div>
                      <button @click="deleteTask(col.id, card.id)" class="text-text-gray hover:text-red-500 p-0.5 rounded transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </div>
                  <h4 class="font-inter font-semibold text-text-black text-sm mb-1">{{ card.title }}</h4>
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
            <div @click="openAddTask"
              class="flex items-center gap-2 px-section-pad-x py-3 font-inter text-sm text-text-gray hover:bg-[#F8FAFC] cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Add New Task
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== MILESTONES ===================== -->
      <div v-else-if="activeTab === 'Milestones'" class="flex flex-col gap-6">

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

            <!--
              LAYOUT STRATEGY (matching reference image exactly):
              ┌─────────────────────────────────────────────┐
              │  [badge]        [badge]        [badge]      │  ← row 1: status badges, same height
              │  [title]        [title]        [title]      │  ← row 2: names, same height
              │  ●━━━━━━━━━━━━━━●━━━━━━━━━━━━━━○           │  ← row 3: timeline line + nodes
              │  [card]         [card]         [card]       │  ← row 4: detail cards, equal width
              └─────────────────────────────────────────────┘
              Each column is flex-1 so all columns share width equally.
              The connector line is a single absolute element behind the nodes.
            -->

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

                    <!--
                      Single full-width connector line, only rendered once on the FIRST column
                      but stretched across ALL columns using left-1/2 and right calculation.
                      We use a pseudo-approach: render on every col but clip so the aggregate
                      gives a continuous line. Simpler: render a real absolute on the wrapper.
                    -->

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
  
  

      <!-- ===================== FILES ===================== -->
      <div v-else-if="activeTab === 'Files'">
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <button @click="openCreateFolder(currentFolderId)"
              class="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-text-black text-sm font-inter font-medium px-4 py-2 rounded-xl transition-colors shadow-shadow-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-5 4H6a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h5a2 2 0 012 2v1"/></svg>
              New Folder
            </button>
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button @click="fileView = 'list'"
                :class="['p-2 transition', fileView === 'list' ? 'bg-main/10 text-main' : 'text-text-gray hover:text-text-black']">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              </button>
              <button @click="fileView = 'grid'"
                :class="['p-2 transition border-l border-gray-200', fileView === 'grid' ? 'bg-main/10 text-main' : 'text-text-gray hover:text-text-black']">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M3 12h18M12 3v18"/></svg>
              </button>
            </div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
              <input v-model="searchQuery" type="text" placeholder="Search files..."
                class="pl-9 pr-4 py-2 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all w-56" />
            </div>
          </div>
          <div
            @drop.prevent="handleDropUpload"
            @dragover.prevent
            class="flex items-center gap-2 bg-main hover:bg-main-hover text-white text-sm font-inter font-medium px-4 py-2 rounded-xl transition-colors shadow-shadow-1 cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            <span @click="handleBrowseUpload">Upload Files</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-shadow-1 overflow-hidden">
            <div class="flex items-center gap-2 px-section-pad-x py-3 border-b border-gray-100 bg-[#F8FAFC]">
              <button @click="navigateToFolder(null)" :class="['font-inter text-xs', !currentFolderId ? 'text-main font-semibold' : 'text-text-gray hover:text-text-black']">
                Root
              </button>
              <template v-for="crumb in getBreadcrumbs()" :key="crumb.id">
                <span class="text-text-gray/40 text-xs">/</span>
                <button @click="navigateToFolder(crumb.id)" class="font-inter text-xs text-text-gray hover:text-text-black">{{ crumb.name }}</button>
              </template>
            </div>

            <div class="flex items-center gap-2 px-section-pad-x py-2 border-b border-gray-100 bg-[#F8FAFC]">
              <button v-for="opt in [{ key: 'name', label: 'Name' }, { key: 'date', label: 'Date' }, { key: 'size', label: 'Size' }]" :key="opt.key"
                @click="sortBy = opt.key; sortAsc = sortBy === opt.key ? !sortAsc : true"
                :class="['font-inter text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-colors',
                  sortBy === opt.key ? 'bg-main/10 text-main font-semibold' : 'text-text-gray hover:text-text-black']">
                {{ opt.label }} {{ sortBy === opt.key ? (sortAsc ? '↑' : '↓') : '' }}
              </button>
            </div>

            <div class="divide-y divide-gray-100">
              <div v-for="folder in filteredFolders" :key="'f'+folder.id"
                class="flex items-center justify-between px-section-pad-x py-3 hover:bg-[#F8FAFC] group">
                <div class="flex items-center gap-3 cursor-pointer" @click="navigateToFolder(folder.id)">
                  <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z"/></svg>
                  <span class="font-inter text-sm text-text-black">{{ folder.name }}</span>
                </div>
                <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="handleRename({ id: folder.id, name: folder.name }, 'folder')" class="text-text-gray hover:text-text-black p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="handleDelete({ id: folder.id, name: folder.name }, 'folder')" class="text-text-gray hover:text-red-500 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
              <div v-for="file in filteredFiles" :key="'ff'+file.id"
                class="flex items-center justify-between px-section-pad-x py-3 hover:bg-[#F8FAFC] group">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div :class="['w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', getExtBadge(file.type).bg]">
                    <svg :class="['w-4 h-4', getExtBadge(file.type).fg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getExtBadge(file.type).icon"/></svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-inter text-sm text-text-black truncate">{{ file.name }}</span>
                      <svg v-if="file.locked" class="w-3.5 h-3.5 text-text-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    </div>
                    <p class="font-inter text-[11px] text-text-gray">{{ formatSize(file.size) }} &middot; {{ file.lastModified }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button @click="handleRename({ id: file.id, name: file.name }, 'file')" class="text-text-gray hover:text-text-black p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="toggleLockFile(project.id, file.id)" :class="['p-1', file.locked ? 'text-main' : 'text-text-gray hover:text-text-black']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="file.locked" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button @click="handleDelete({ id: file.id, name: file.name }, 'file')" class="text-text-gray hover:text-red-500 p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
              <div v-if="!filteredFolders.length && !filteredFiles.length && (project.folders?.length || project.files?.length)"
                class="px-section-pad-x py-8 text-center font-inter text-sm text-text-gray">
                No files match your search.
              </div>
              <div v-if="!project.folders?.length && !project.files?.length"
                class="px-section-pad-x py-12 text-center">
                <div class="w-14 h-14 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-7 h-7 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </div>
                <p class="font-inter text-text-gray text-sm">Drag and drop files here, or click Upload to add files.</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-6">
              <h3 class="font-montaga text-sm font-bold text-text-black mb-4">Version History</h3>
              <div class="space-y-3 max-h-80 overflow-y-auto">
                <div v-for="log in getVersionHistory(project.id).slice(0, 15)" :key="log.id"
                  class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                    log.action === 'uploaded' ? 'bg-green-50 text-green-500' : log.action === 'deleted' ? 'bg-red-50 text-red-400' : log.action === 'locked' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-500']">
                    <svg v-if="log.action === 'uploaded'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    <svg v-else-if="log.action === 'deleted'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    <svg v-else-if="log.action === 'locked'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </div>
                  <div class="min-w-0">
                    <p class="font-inter text-xs text-text-black leading-snug">
                      <span class="font-medium">{{ log.user }}</span> {{ log.action }} <span class="font-medium">{{ log.fileName }}</span>
                    </p>
                    <p class="font-inter text-[10px] text-text-gray mt-0.5">{{ log.date }}</p>
                  </div>
                </div>
                <div v-if="!getVersionHistory(project.id).length" class="font-inter text-xs text-text-gray text-center py-4">No activity yet.</div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 p-6">
              <h3 class="font-montaga text-sm font-bold text-text-black mb-3">Storage Usage</h3>
              <div class="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div class="bg-main h-3 rounded-full transition-all duration-500" :style="'width:' + usedStoragePct(project.id) + '%'"></div>
              </div>
              <div class="flex justify-between font-inter text-xs text-text-gray">
                <span>{{ formatSize(usedStorage(project.id)) }} used</span>
                <span>{{ formatSize(remainingStorage(project.id)) }} remaining</span>
              </div>
              <p class="font-inter text-[10px] text-text-gray mt-1">of {{ formatSize(project.totalStorageMB) }} total</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== TEAMS ===================== -->
      <div v-else-if="activeTab === 'Teams'">
        <div class="flex items-center justify-between mb-5">
          <p class="font-inter text-sm text-text-gray">{{ project.teamMembers?.length || 0 }} members</p>
          <button @click="openAddMember"
            class="flex items-center gap-1.5 bg-main hover:bg-main-hover text-white text-sm font-inter font-medium px-4 py-2 rounded-xl transition-colors shadow-shadow-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
            Add Member
          </button>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="member in (project.teamMembers || [])" :key="member.id"
            class="bg-white rounded-2xl border border-gray-100 shadow-shadow-1 px-section-pad-x py-8 hover:shadow-shadow-2 transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div class="relative">
                <img :src="member.avatar" class="w-16 h-16 rounded-xl object-cover" />
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
    </main>

    <!-- ── Project Not Found ── -->
    <main v-else class="px-main-margin-x py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <div class="w-20 h-20 bg-[#F1F5F9] rounded-3xl flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h2 class="font-montaga text-2xl font-bold text-text-black mb-2">Project Not Found</h2>
      <p class="font-inter text-sm text-text-gray mb-6">The project you're looking for doesn't exist or has been removed.</p>
      <RouterLink to="/projects"
        class="bg-main hover:bg-main-hover text-white text-sm font-inter font-medium px-6 py-2.5 rounded-xl transition-colors shadow-shadow-1">
        Back to Projects
      </RouterLink>
    </main>

    <!-- ===================== ADD TASK MODAL ===================== -->
    <Teleport to="body">
      <div v-if="showAddTask" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" @click.self="closeAddTask">
        <div class="bg-white rounded-2xl shadow-shadow-2 w-full max-w-lg mx-4 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-montaga text-xl font-bold text-text-black">Add New Task</h2>
            <button @click="closeAddTask" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form @submit.prevent="submitTask" class="space-y-4">
            <div>
              <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Task Title *</label>
              <input v-model="newTask.title" type="text" placeholder="Enter task title" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all" />
            </div>
            <div>
              <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Description</label>
              <textarea v-model="newTask.desc" rows="3" placeholder="Optional description"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Priority</label>
                <select v-model="newTask.priority" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all">
                  <option value="HIGH">HIGH</option>
                  <option value="MED">MED</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
              <div>
                <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Assignee</label>
                <select v-model="newTask.assigneeId" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all">
                  <option :value="null">Unassigned</option>
                  <option v-for="m in (project?.teamMembers || [])" :key="m.id" :value="m.id">{{ m.name }}</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="closeAddTask" class="px-5 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" class="px-5 py-2.5 bg-main hover:bg-main-hover text-white font-inter text-sm font-medium rounded-xl transition-colors shadow-shadow-1">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===================== ADD MILESTONE MODAL ===================== -->
    <Teleport to="body">
      <div v-if="showMilestoneModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" @click.self="closeMilestoneModal">
        <div class="bg-white rounded-2xl shadow-shadow-2 w-full max-w-lg mx-4 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-montaga text-xl font-bold text-text-black">{{ editingMilestone ? 'Edit' : 'Add' }} Milestone</h2>
            <button @click="closeMilestoneModal" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form @submit.prevent="submitMilestone" class="space-y-4">
            <div>
              <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Milestone Name *</label>
              <input v-model="milestoneForm.name" type="text" placeholder="Enter milestone name" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all" />
            </div>
            <div>
              <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Description</label>
              <textarea v-model="milestoneForm.description" rows="2" placeholder="Optional description"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all resize-none"></textarea>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Due Date</label>
                <input v-model="milestoneForm.dueDate" type="text" placeholder="e.g. Jan 2024" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all" />
              </div>
              <div>
                <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Phase</label>
                <input v-model.number="milestoneForm.phase" type="number" min="1" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all" />
              </div>
              <div>
                <label class="block font-inter text-sm font-medium text-text-black mb-1.5">Progress %</label>
                <input v-model.number="milestoneForm.progress" type="number" min="0" max="100" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all" />
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="closeMilestoneModal" class="px-5 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" class="px-5 py-2.5 bg-main hover:bg-main-hover text-white font-inter text-sm font-medium rounded-xl transition-colors shadow-shadow-1">{{ editingMilestone ? 'Save' : 'Add' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===================== CREATE FOLDER MODAL ===================== -->
    <Teleport to="body">
      <div v-if="showCreateFolder" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" @click.self="showCreateFolder = false">
        <div class="bg-white rounded-2xl shadow-shadow-2 w-full max-w-sm mx-4 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-montaga text-xl font-bold text-text-black">New Folder</h2>
            <button @click="showCreateFolder = false" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form @submit.prevent="submitCreateFolder">
            <input v-model="newFolderName" type="text" placeholder="Folder name"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all mb-4" />
            <div class="flex justify-end gap-3">
              <button type="button" @click="showCreateFolder = false" class="px-5 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" class="px-5 py-2.5 bg-main hover:bg-main-hover text-white font-inter text-sm font-medium rounded-xl transition-colors shadow-shadow-1">Create</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===================== RENAME MODAL ===================== -->
    <Teleport to="body">
      <div v-if="renameTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" @click.self="renameTarget = null">
        <div class="bg-white rounded-2xl shadow-shadow-2 w-full max-w-sm mx-4 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-montaga text-xl font-bold text-text-black">Rename</h2>
            <button @click="renameTarget = null" class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-text-gray hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form @submit.prevent="submitRename">
            <input v-model="renameValue" type="text" placeholder="New name"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black placeholder-text-gray focus:outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition-all mb-4" />
            <div class="flex justify-end gap-3">
              <button type="button" @click="renameTarget = null" class="px-5 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" class="px-5 py-2.5 bg-main hover:bg-main-hover text-white font-inter text-sm font-medium rounded-xl transition-colors shadow-shadow-1">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ===================== DELETE CONFIRM MODAL ===================== -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" @click.self="showDeleteConfirm = null">
        <div class="bg-white rounded-2xl shadow-shadow-2 w-full max-w-sm mx-4 p-6">
          <div class="flex items-start gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            </div>
            <div>
              <h2 class="font-montaga text-lg font-bold text-text-black mb-1">Delete {{ showDeleteConfirm.type === 'folder' ? 'Folder' : 'File' }}</h2>
              <p class="font-inter text-sm text-text-gray">Are you sure you want to delete <span class="font-medium text-text-black">{{ showDeleteConfirm.item.name }}</span>? This action cannot be undone.</p>
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <button @click="showDeleteConfirm = null" class="px-5 py-2.5 border border-gray-200 rounded-xl font-inter text-sm text-text-black hover:bg-gray-50 transition-colors">Cancel</button>
            <button @click="confirmDeleteItem" class="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-inter text-sm font-medium rounded-xl transition-colors shadow-shadow-1">Delete</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>