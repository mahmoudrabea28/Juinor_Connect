<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjects } from "../../composables/useProjects";
import ProductDetailsOverview from "./ProductDetailsOverview.vue";
import ProductDetailsTasks from "./ProductDetailsTasks.vue";
import ProductDetailsMilestones from "./ProductDetailsMilestones.vue";
import ProductDetailsFiles from "./ProductDetailsFiles.vue";
import ProductDetailsTeams from "./ProductDetailsTeams.vue";
import Navbar from '../../components/Navbar.vue';

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
const fileView = ref("list");
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
  <Navbar />
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
            <RouterLink to="/projects/allProjects" class="hover:text-main transition-colors">ALL Projects</RouterLink>
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
      <ProductDetailsOverview v-if="activeTab === 'Overview'"
        :project="project"
        :completionPct="completionPct"
        :donutOffset="donutOffset"
        :DONUT_CIRC="DONUT_CIRC"
        :totalTaskCount="totalTaskCount"
        :openIssuesCount="openIssuesCount"
        :criticalIssueCount="criticalIssueCount"
        :milestonesDone="milestonesDone"
        :milestonesTotal="milestonesTotal"
      />

      <!-- ===================== TASKS ===================== -->
      <ProductDetailsTasks v-else-if="activeTab === 'Tasks'"
        :project="project"
        :taskView="taskView"
        :phases="phases"
        :draggedTaskId="draggedTaskId"
        :onDragStart="onDragStart"
        :onDragOver="onDragOver"
        :onDrop="onDrop"
        :onDragEnd="onDragEnd"
        :openAddTask="openAddTask"
        :deleteTask="deleteTask"
        :toggleSubtask="toggleSubtask"
        :moveTask="moveTask"
      />

      <!-- ===================== MILESTONES ===================== -->
      <ProductDetailsMilestones v-else-if="activeTab === 'Milestones'"
        :project="project"
        :openAddMilestone="openAddMilestone"
        :openEditMilestone="openEditMilestone"
        :deleteMilestone="deleteMilestone"
      />
  

      <!-- ===================== FILES ===================== -->
      <ProductDetailsFiles v-else-if="activeTab === 'Files'"
        :project="project"
        v-model:fileView="fileView"
        v-model:currentFolderId="currentFolderId"
        v-model:searchQuery="searchQuery"
        v-model:sortBy="sortBy"
        v-model:sortAsc="sortAsc"
        :openCreateFolder="openCreateFolder"
        :navigateToFolder="navigateToFolder"
        :getBreadcrumbs="getBreadcrumbs"
        :filteredFolders="filteredFolders"
        :filteredFiles="filteredFiles"
        :handleRename="handleRename"
        :handleDelete="handleDelete"
        :toggleLockFile="toggleLockFile"
        :handleBrowseUpload="handleBrowseUpload"
        :handleDropUpload="handleDropUpload"
        :getExtBadge="getExtBadge"
        :formatSize="formatSize"
        :usedStoragePct="usedStoragePct"
        :usedStorage="usedStorage"
        :remainingStorage="remainingStorage"
        :getVersionHistory="getVersionHistory"
      />

      <!-- ===================== TEAMS ===================== -->
      <ProductDetailsTeams v-else-if="activeTab === 'Teams'"
        :project="project"
        :openAddMember="openAddMember"
      />
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