<script setup>
const props = defineProps({
  project: { type: Object, default: null },
  openCreateFolder: { type: Function, default: () => {} },
  navigateToFolder: { type: Function, default: () => {} },
  getBreadcrumbs: { type: Function, default: () => [] },
  filteredFolders: { type: Array, default: () => [] },
  filteredFiles: { type: Array, default: () => [] },
  handleRename: { type: Function, default: () => {} },
  handleDelete: { type: Function, default: () => {} },
  toggleLockFile: { type: Function, default: () => {} },
  handleBrowseUpload: { type: Function, default: () => {} },
  handleDropUpload: { type: Function, default: () => {} },
  getExtBadge: { type: Function, default: () => ({}) },
  formatSize: { type: Function, default: () => "" },
  usedStoragePct: { type: Function, default: () => 0 },
  usedStorage: { type: Function, default: () => 0 },
  remainingStorage: { type: Function, default: () => 0 },
  getVersionHistory: { type: Function, default: () => [] },
});

const fileView = defineModel('fileView', { type: String, default: 'list' });
const currentFolderId = defineModel('currentFolderId', { default: null });
const searchQuery = defineModel('searchQuery', { type: String, default: '' });
const sortBy = defineModel('sortBy', { type: String, default: 'name' });
const sortAsc = defineModel('sortAsc', { type: Boolean, default: true });
</script>

<template>
  <div>
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
</template>
