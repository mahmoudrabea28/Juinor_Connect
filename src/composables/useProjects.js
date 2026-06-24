import { ref, computed } from "vue"

const projects = ref([
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    category: "UI/UX Design",
    description: "Revamping the full UI/UX of the storefront to improve conversion rates and mobile experience across all device sizes.",
    progress: 72,
    dueDate: "Jul 15, 2024",
    status: "in-progress",
    startDate: "Feb 1, 2024",
    projectLead: "Sarah Jenkins",
    leadAvatar: "https://i.pravatar.cc/24?img=47",
    teamAvatars: ["https://i.pravatar.cc/24?img=47", "https://i.pravatar.cc/24?img=12", "https://i.pravatar.cc/24?img=33"],
    extraTeamCount: 4,
    tags: ["E-Commerce", "Redesign", "Frontend", "Q2_Goals"],
    totalTasks: 98,
    openIssues: 8,
    criticalIssues: 2,
    milestonesCompleted: 3,
    milestonesTotal: 5,
    nextMajorStep: "User Acceptance Testing",
    nextMajorStepIn: "10 days from now",
    boardColumns: [
      {
        id: "todo", label: "TO DO", color: "text-text-black",
        cards: [
          { id: 1, priority: "HIGH", title: "Refactor Auth Middleware", desc: "Optimize the JWT verification flow.", assigneeId: 1, subtasks: [{ id: 1, name: "Review current implementation", done: true }, { id: 2, name: "Write unit tests", done: false }], timeLeft: "4h 20m left", date: "OCT 24" },
          { id: 2, priority: "MED", title: "Schema Migration", desc: "Migrate legacy user tables to the new partitioned schema.", assigneeId: 3, subtasks: [], timeLeft: null, date: null },
        ],
      },
      {
        id: "inprogress", label: "IN PROGRESS", color: "text-main",
        cards: [
          { id: 3, priority: "LOW", title: "UI Component Library", desc: "Build reusable Vue components.", assigneeId: 2, subtasks: [{ id: 4, name: "Button component", done: true }, { id: 5, name: "Modal component", done: false }], progress: 60 },
          { id: 4, priority: "HIGH", title: "Payment Gateway Integration", desc: "Final QA pass for Stripe Connect.", assigneeId: 5, subtasks: [], reviewPending: true },
        ],
      },
      {
        id: "done", label: "DONE", color: "text-main",
        cards: [
          { id: 5, priority: "HIGH", title: "Initial Deployment", desc: "Deploy the application to production.", assigneeId: 4, subtasks: [], completedYesterday: true },
        ],
      },
    ],
    teamMembers: [
      { id: 1, name: "Sarah Chen", role: "React Specialist", skills: ["REACT","TYPESCRIPT","TAILWIND"], task: "Optimizing Asset Pipeline v2", online: true, avatar: "https://i.pravatar.cc/80?img=47" },
      { id: 2, name: "Marcus Thorne", role: "UI Designer", skills: ["FIGMA","MOTION"], task: "Dark Mode Refinement", online: false, avatar: "https://i.pravatar.cc/80?img=12" },
      { id: 3, name: "Elena Rodriguez", role: "Backend Architect", skills: ["NODE.JS","GO","REDIS"], task: "Scaling WebSocket Clusters", online: true, avatar: "https://i.pravatar.cc/80?img=33" },
      { id: 4, name: "Sia Khanna", role: "Product Manager", skills: ["STRATEGY","KANBAN"], task: "Q4 Roadmap Planning", online: true, avatar: "https://i.pravatar.cc/80?img=59" },
      { id: 5, name: "Kenji Tanaka", role: "Full-Stack Dev", skills: ["VUE","PYTHON","AWS"], task: "API Rate Limiting", online: true, avatar: "https://i.pravatar.cc/80?img=60" },
    ],
    milestones: [
      { id: 1, name: "UX Research", description: "User personas and journey mapping.", dueDate: "Nov 2023", status: "complete", phase: 1, progress: 100, members: ["https://i.pravatar.cc/24?img=47", "https://i.pravatar.cc/24?img=12"] },
      { id: 2, name: "UI Design", description: "Design system tokens and high-fidelity wireframes.", dueDate: "Dec 2023", status: "in-progress", phase: 2, progress: 60, members: ["https://i.pravatar.cc/24?img=12", "https://i.pravatar.cc/24?img=33"] },
      { id: 3, name: "Backend Architecture", description: "API architecture design and database schema.", dueDate: "Jan 2024", status: "pending", phase: 3, progress: 0, members: ["https://i.pravatar.cc/24?img=33"] },
    ],
    folders: [
      { id: 1, name: "Design Assets", parentId: null, createdAt: "2024-01-10" },
      { id: 2, name: "Documentation", parentId: null, createdAt: "2024-01-12" },
      { id: 3, name: "Mockups", parentId: 1, createdAt: "2024-01-15" },
    ],
    files: [
      { id: 1, name: "Project_Requirements_v2.pdf", size: 2.4, type: "PDF", folderId: null, uploadDate: "Dec 12, 2023", uploader: "Sarah Chen", locked: false, lastModified: "Dec 12, 2023", currentEditor: null },
      { id: 2, name: "Design_Assets_Figma.zip", size: 14.8, type: "ZIP", folderId: 1, uploadDate: "Dec 10, 2023", uploader: "Marcus Thorne", locked: true, lastModified: "Dec 10, 2023", currentEditor: null },
      { id: 3, name: "Dashboard_Mockup.png", size: 3.1, type: "PNG", folderId: 3, uploadDate: "Dec 8, 2023", uploader: "Marcus Thorne", locked: false, lastModified: "Dec 8, 2023", currentEditor: "Sarah Chen" },
      { id: 4, name: "UI_KIT_Specs.fig", size: 6.2, type: "FIGMA", folderId: 1, uploadDate: "Dec 5, 2023", uploader: "Marcus Thorne", locked: false, lastModified: "Dec 5, 2023", currentEditor: null },
      { id: 5, name: "API_Documentation.docx", size: 1.8, type: "DOCX", folderId: 2, uploadDate: "Dec 14, 2023", uploader: "Elena Rodriguez", locked: false, lastModified: "Dec 14, 2023", currentEditor: "Kenji Tanaka" },
      { id: 6, name: "Sprint_Report.xlsx", size: 0.9, type: "XLSX", folderId: 2, uploadDate: "Dec 15, 2023", uploader: "Sia Khanna", locked: false, lastModified: "Dec 15, 2023", currentEditor: null },
    ],
    versionHistory: [
      { id: 1, action: "uploaded", fileName: "API_Documentation.docx", user: "Elena Rodriguez", date: "Dec 14, 2023 2:30 PM", details: "Initial upload" },
      { id: 2, action: "uploaded", fileName: "Sprint_Report.xlsx", user: "Sia Khanna", date: "Dec 15, 2023 10:15 AM", details: "Weekly report" },
      { id: 3, action: "locked", fileName: "Design_Assets_Figma.zip", user: "Marcus Thorne", date: "Dec 11, 2023 4:00 PM", details: "Locked for review" },
      { id: 4, action: "uploaded", fileName: "Dashboard_Mockup.png", user: "Marcus Thorne", date: "Dec 8, 2023 11:20 AM", details: "Final mockup" },
    ],
    totalStorageMB: 10240,
  },
  {
    id: 2,
    title: "Dashboard Analytics Module",
    category: "Data Visualization",
    description: "Building interactive charts and KPI widgets for the internal operations team to monitor metrics in real time.",
    progress: 45,
    dueDate: "Aug 1, 2024",
    status: "in-progress",
    startDate: "Apr 15, 2024",
    projectLead: "Elena Rodriguez",
    leadAvatar: "https://i.pravatar.cc/24?img=33",
    teamAvatars: ["https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=59", "https://i.pravatar.cc/24?img=60"],
    extraTeamCount: 2,
    tags: ["Analytics", "Dashboard", "Internal", "Q3_Goals"],
    totalTasks: 134,
    openIssues: 11,
    criticalIssues: 3,
    milestonesCompleted: 2,
    milestonesTotal: 4,
    nextMajorStep: "Data Pipeline Setup",
    nextMajorStepIn: "12 days from now",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [
      { id: 1, name: "Elena Rodriguez", role: "Backend Architect", skills: ["NODE.JS","GO"], task: "Pipeline Setup", online: true, avatar: "https://i.pravatar.cc/80?img=33" },
      { id: 2, name: "Kenji Tanaka", role: "Full-Stack Dev", skills: ["VUE","PYTHON"], task: "Chart Components", online: true, avatar: "https://i.pravatar.cc/80?img=60" },
    ],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 5120,
  },
  {
    id: 3,
    title: "Mobile App Onboarding Flow",
    category: "Mobile Development",
    description: "Designed and implemented a multi-step onboarding experience for new mobile users with animated transitions.",
    progress: 100,
    dueDate: "May 30, 2024",
    status: "completed",
    startDate: "Jan 10, 2024",
    projectLead: "Marcus Thorne",
    leadAvatar: "https://i.pravatar.cc/24?img=12",
    teamAvatars: ["https://i.pravatar.cc/24?img=12", "https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=47"],
    extraTeamCount: 3,
    tags: ["Mobile", "Onboarding", "UX", "Q2_Goals"],
    totalTasks: 62,
    openIssues: 0,
    criticalIssues: 0,
    milestonesCompleted: 4,
    milestonesTotal: 4,
    nextMajorStep: "Post-Launch Monitoring",
    nextMajorStepIn: "Completed",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 2048,
  },
  {
    id: 4,
    title: "API Integration & Testing",
    category: "Backend Development",
    description: "Connecting third-party payment gateways and writing comprehensive integration tests with full coverage reports.",
    progress: 31,
    dueDate: "Sep 10, 2024",
    status: "in-progress",
    startDate: "Jun 1, 2024",
    projectLead: "Kenji Tanaka",
    leadAvatar: "https://i.pravatar.cc/24?img=60",
    teamAvatars: ["https://i.pravatar.cc/24?img=60", "https://i.pravatar.cc/24?img=47"],
    extraTeamCount: 1,
    tags: ["API", "Backend", "Testing", "Q3_Goals"],
    totalTasks: 76,
    openIssues: 14,
    criticalIssues: 5,
    milestonesCompleted: 1,
    milestonesTotal: 4,
    nextMajorStep: "Payment Gateway Integration",
    nextMajorStepIn: "8 days from now",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 4096,
  },
  {
    id: 5,
    title: "Design System Documentation",
    category: "UI/UX Design",
    description: "Created a comprehensive Storybook library with all reusable UI components, tokens, and usage guidelines.",
    progress: 100,
    dueDate: "Apr 20, 2024",
    status: "completed",
    startDate: "Jan 5, 2024",
    projectLead: "Sarah Jenkins",
    leadAvatar: "https://i.pravatar.cc/24?img=47",
    teamAvatars: ["https://i.pravatar.cc/24?img=47", "https://i.pravatar.cc/24?img=12"],
    extraTeamCount: 2,
    tags: ["Design System", "Documentation", "Storybook", "Q1_Goals"],
    totalTasks: 45,
    openIssues: 0,
    criticalIssues: 0,
    milestonesCompleted: 3,
    milestonesTotal: 3,
    nextMajorStep: "Component Audit",
    nextMajorStepIn: "Completed",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 2048,
  },
  {
    id: 6,
    title: "User Authentication Refactor",
    category: "Backend Development",
    description: "Migrated legacy session-based auth to JWT with refresh token rotation and OAuth2 social login support.",
    progress: 100,
    dueDate: "May 5, 2024",
    status: "completed",
    startDate: "Feb 15, 2024",
    projectLead: "Elena Rodriguez",
    leadAvatar: "https://i.pravatar.cc/24?img=33",
    teamAvatars: ["https://i.pravatar.cc/24?img=33", "https://i.pravatar.cc/24?img=60", "https://i.pravatar.cc/24?img=59"],
    extraTeamCount: 1,
    tags: ["Auth", "Security", "Backend", "Q2_Goals"],
    totalTasks: 88,
    openIssues: 2,
    criticalIssues: 0,
    milestonesCompleted: 5,
    milestonesTotal: 5,
    nextMajorStep: "Security Audit",
    nextMajorStepIn: "Scheduled",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 3072,
  },
  {
    id: 7,
    title: "Notification & Alerts Engine",
    category: "Full-Stack Development",
    description: "Building a real-time notification service using WebSockets to deliver in-app and email alerts at scale.",
    progress: 58,
    dueDate: "Aug 25, 2024",
    status: "in-progress",
    startDate: "May 20, 2024",
    projectLead: "Sia Khanna",
    leadAvatar: "https://i.pravatar.cc/24?img=59",
    teamAvatars: ["https://i.pravatar.cc/24?img=59", "https://i.pravatar.cc/24?img=33"],
    extraTeamCount: 2,
    tags: ["Notifications", "WebSocket", "Real-Time", "Q3_Goals"],
    totalTasks: 112,
    openIssues: 9,
    criticalIssues: 2,
    milestonesCompleted: 2,
    milestonesTotal: 5,
    nextMajorStep: "WebSocket Cluster Setup",
    nextMajorStepIn: "5 days from now",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 6144,
  },
  {
    id: 8,
    title: "Search & Filter Optimization",
    category: "Data Engineering",
    description: "Implementing Elasticsearch-powered full-text search with faceted filters, synonyms, and typo tolerance.",
    progress: 19,
    dueDate: "Oct 1, 2024",
    status: "in-progress",
    startDate: "Jul 1, 2024",
    projectLead: "Kenji Tanaka",
    leadAvatar: "https://i.pravatar.cc/24?img=60",
    teamAvatars: ["https://i.pravatar.cc/24?img=60", "https://i.pravatar.cc/24?img=47", "https://i.pravatar.cc/24?img=12"],
    extraTeamCount: 3,
    tags: ["Search", "Elasticsearch", "Performance", "Q4_Goals"],
    totalTasks: 95,
    openIssues: 16,
    criticalIssues: 6,
    milestonesCompleted: 0,
    milestonesTotal: 4,
    nextMajorStep: "Index Schema Design",
    nextMajorStepIn: "15 days from now",
    boardColumns: [
      { id: "todo", label: "TO DO", color: "text-text-black", cards: [] },
      { id: "inprogress", label: "IN PROGRESS", color: "text-main", cards: [] },
      { id: "done", label: "DONE", color: "text-main", cards: [] },
    ],
    teamMembers: [],
    milestones: [],
    folders: [],
    files: [],
    versionHistory: [],
    totalStorageMB: 5120,
  },
])

let nextMilestoneId = 100
let nextFolderId = 100
let nextFileId = 100
let nextHistoryId = 100

function getProject(id) {
  return projects.value.find(p => p.id === Number(id))
}

// ─── Milestone CRUD ────────────────────────────────────────────────────

function addMilestone(projectId, ms) {
  const project = getProject(projectId)
  if (!project) return
  project.milestones.push({
    id: nextMilestoneId++,
    name: ms.name,
    description: ms.description || "",
    dueDate: ms.dueDate || "",
    status: ms.progress >= 100 ? "complete" : ms.progress > 0 ? "in-progress" : "pending",
    phase: ms.phase || project.milestones.length + 1,
    progress: ms.progress ?? 0,
    members: ms.members || [],
  })
  updateMilestoneCounts(project)
  addVersionLogFn(projectId, "created", ms.name, "System", "Milestone created")
}

function editMilestone(projectId, msId, updates) {
  const project = getProject(projectId)
  if (!project) return
  const ms = project.milestones.find(m => m.id === msId)
  if (!ms) return
  Object.assign(ms, updates)
  ms.status = ms.progress >= 100 ? "complete" : ms.progress > 0 ? "in-progress" : "pending"
  updateMilestoneCounts(project)
  addVersionLogFn(projectId, "edited", ms.name, "System", "Milestone updated")
}

function deleteMilestone(projectId, msId) {
  const project = getProject(projectId)
  if (!project) return
  const ms = project.milestones.find(m => m.id === msId)
  const name = ms?.name || "Unknown"
  project.milestones = project.milestones.filter(m => m.id !== msId)
  updateMilestoneCounts(project)
  addVersionLogFn(projectId, "deleted", name, "System", "Milestone deleted")
}

function updateMilestoneProgress(projectId, msId, progress) {
  const project = getProject(projectId)
  if (!project) return
  const ms = project.milestones.find(m => m.id === msId)
  if (!ms) return
  ms.progress = progress
  ms.status = progress >= 100 ? "complete" : progress > 0 ? "in-progress" : "pending"
  updateMilestoneCounts(project)
}

function updateMilestoneCounts(project) {
  project.milestonesCompleted = project.milestones.filter(m => m.status === "complete").length
  project.milestonesTotal = project.milestones.length
}

// ─── Folder CRUD ───────────────────────────────────────────────────────

function createFolder(projectId, name, parentId = null) {
  const project = getProject(projectId)
  if (!project) return
  project.folders.push({ id: nextFolderId++, name, parentId, createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })
  addVersionLogFn(projectId, "created folder", name, "System", `Folder created${parentId ? " in subfolder" : ""}`)
}

function renameFolder(projectId, folderId, newName) {
  const project = getProject(projectId)
  if (!project) return
  const folder = project.folders.find(f => f.id === folderId)
  if (!folder) return
  const oldName = folder.name
  folder.name = newName
  addVersionLogFn(projectId, "renamed folder", `${oldName} → ${newName}`, "System", "Folder renamed")
}

function deleteFolder(projectId, folderId) {
  const project = getProject(projectId)
  if (!project) return
  const hasFiles = project.files.some(f => f.folderId === folderId) || project.folders.some(f => f.parentId === folderId)
  if (hasFiles) return false // caller should show confirmation
  const folder = project.folders.find(f => f.id === folderId)
  const name = folder?.name || "Unknown"
  project.folders = project.folders.filter(f => f.id !== folderId)
  project.files = project.files.filter(f => f.folderId !== folderId)
  addVersionLogFn(projectId, "deleted folder", name, "System", "Folder deleted")
  return true
}

function folderHasChildren(projectId, folderId) {
  const project = getProject(projectId)
  if (!project) return false
  return project.files.some(f => f.folderId === folderId) || project.folders.some(f => f.parentId === folderId)
}

// ─── File CRUD ─────────────────────────────────────────────────────────

function uploadFile(projectId, file) {
  const project = getProject(projectId)
  if (!project) return
  const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  project.files.push({
    id: nextFileId++,
    name: file.name,
    size: file.size || 0,
    type: file.type || "FILE",
    folderId: file.folderId || null,
    uploadDate: now,
    uploader: file.uploader || "System",
    locked: false,
    lastModified: now,
    currentEditor: null,
  })
  addVersionLogFn(projectId, "uploaded", file.name, file.uploader || "System", "File uploaded")
}

function deleteFile(projectId, fileId) {
  const project = getProject(projectId)
  if (!project) return
  const file = project.files.find(f => f.id === fileId)
  if (!file || file.locked) return
  const name = file.name
  project.files = project.files.filter(f => f.id !== fileId)
  addVersionLogFn(projectId, "deleted", name, "System", "File deleted")
}

function renameFile(projectId, fileId, newName) {
  const project = getProject(projectId)
  if (!project) return
  const file = project.files.find(f => f.id === fileId)
  if (!file || file.locked) return
  const oldName = file.name
  file.name = newName
  file.lastModified = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  addVersionLogFn(projectId, "renamed", `${oldName} → ${newName}`, "System", "File renamed")
}

function toggleLockFile(projectId, fileId) {
  const project = getProject(projectId)
  if (!project) return
  const file = project.files.find(f => f.id === fileId)
  if (!file) return
  file.locked = !file.locked
  addVersionLogFn(projectId, file.locked ? "locked" : "unlocked", file.name, "System", `File ${file.locked ? "locked" : "unlocked"}`)
}

function moveFile(projectId, fileId, targetFolderId) {
  const project = getProject(projectId)
  if (!project) return
  const file = project.files.find(f => f.id === fileId)
  if (!file || file.locked) return
  file.folderId = targetFolderId
  file.lastModified = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  addVersionLogFn(projectId, "moved", file.name, "System", `File moved to ${targetFolderId ? "folder" : "root"}`)
}

// ─── Computed helpers ──────────────────────────────────────────────────

function usedStorage(projectId) {
  const project = getProject(projectId)
  if (!project) return 0
  return project.files.reduce((sum, f) => sum + f.size, 0)
}

function remainingStorage(projectId) {
  const project = getProject(projectId)
  if (!project) return 0
  return project.totalStorageMB - usedStorage(projectId)
}

function usedStoragePct(projectId) {
  const project = getProject(projectId)
  if (!project) return 0
  return project.totalStorageMB > 0 ? Math.round((usedStorage(projectId) / project.totalStorageMB) * 100) : 0
}

// ─── Version History ───────────────────────────────────────────────────

function addVersionLogFn(projectId, action, fileName, user, details) {
  const project = getProject(projectId)
  if (!project) return
  const now = new Date()
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " " + now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  project.versionHistory.unshift({
    id: nextHistoryId++,
    action,
    fileName,
    user,
    date: dateStr,
    details: details || "",
  })
}

// ─── Task / Board Sync ─────────────────────────────────────────────────

function moveTask(projectId, taskId, toColId) {
  const project = getProject(projectId)
  if (!project) return
  const fromCol = project.boardColumns.find(c => c.cards.some(t => t.id === taskId))
  if (!fromCol) return
  const task = fromCol.cards.find(t => t.id === taskId)
  if (!task) return
  fromCol.cards = fromCol.cards.filter(t => t.id !== taskId)
  const toCol = project.boardColumns.find(c => c.id === toColId)
  if (toCol) toCol.cards.push({ ...task, progress: toColId === "done" ? 100 : task.progress })
  syncProjectProgress(project)
}

function deleteTaskFn(projectId, colId, taskId) {
  const project = getProject(projectId)
  if (!project) return
  const col = project.boardColumns.find(c => c.id === colId)
  if (col) col.cards = col.cards.filter(t => t.id !== taskId)
  syncProjectProgress(project)
}

function addTaskFn(projectId, task) {
  const project = getProject(projectId)
  if (!project) return
  const todo = project.boardColumns.find(c => c.id === "todo")
  if (todo) todo.cards.push(task)
  syncProjectProgress(project)
}

function syncProjectProgress(project) {
  const all = project.boardColumns.reduce((sum, c) => sum + c.cards.length, 0)
  const done = project.boardColumns.find(c => c.id === "done")?.cards.length || 0
  project.totalTasks = all
  project.openIssues = all - done
  project.progress = all > 0 ? Math.round((done / all) * 100) : 0
  if (all > 0 && done === all) {
    project.status = "completed"
  } else if (all > 0 && done < all) {
    project.status = project.status === "completed" ? "in-progress" : project.status
  }
}

// ─── Search & Sort ─────────────────────────────────────────────────────

function searchItems(projectId, query) {
  const project = getProject(projectId)
  if (!project) return { files: [], folders: [] }
  const q = query.toLowerCase()
  const matchedFiles = project.files.filter(f => f.name.toLowerCase().includes(q))
  const matchedFolders = project.folders.filter(f => f.name.toLowerCase().includes(q))
  return { files: matchedFiles, folders: matchedFolders }
}

function sortFiles(projectId, by, asc = true) {
  const project = getProject(projectId)
  if (!project) return []
  const sorted = [...project.files]
  sorted.sort((a, b) => {
    let cmp = 0
    if (by === "name") cmp = a.name.localeCompare(b.name)
    else if (by === "date") cmp = new Date(a.lastModified) - new Date(b.lastModified)
    else if (by === "size") cmp = a.size - b.size
    return asc ? cmp : -cmp
  })
  return sorted
}

// ─── Expose a function to get version history ──────────────────────────

function getVersionHistory(projectId) {
  const project = getProject(projectId)
  return project?.versionHistory || []
}

export function useProjects() {
  return {
    projects,
    getProject,
    // milestones
    addMilestone,
    editMilestone,
    deleteMilestone,
    updateMilestoneProgress,
    // folders
    createFolder,
    renameFolder,
    deleteFolder,
    folderHasChildren,
    // files
    uploadFile,
    deleteFile,
    renameFile,
    toggleLockFile,
    moveFile,
    // storage
    usedStorage,
    remainingStorage,
    usedStoragePct,
    // history
    addVersionLog: addVersionLogFn,
    getVersionHistory,
    // tasks
    moveTask,
    deleteTask: deleteTaskFn,
    addTask: addTaskFn,
    syncProjectProgress,
    // search & sort
    searchItems,
    sortFiles,
  }
}
