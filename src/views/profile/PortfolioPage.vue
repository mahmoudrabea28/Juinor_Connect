<template>
  <div>
    <!-- Page header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h1 class="text-2xl font-serif text-gray-900">Projects</h1>
        <p class="text-sm text-gray-400 mt-1">Showcase the projects you've built or collaborated on.</p>
      </div>
      <button
        type="button"
        class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors shrink-0"
        @click="portfolioStore.openAddModal()"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Project
      </button>
    </div>

    <!-- Existing project cards -->
    <div v-if="portfolioStore.projects.length" class="space-y-4 mb-4">
      <ProjectCard
        v-for="project in portfolioStore.projects"
        :key="project.id"
        :project="project"
      />
    </div>

    <!-- Empty-state / call-to-action lower card (always visible) -->
    <EmptyPortfolioState />

    <!-- Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <AddProjectModal v-if="portfolioStore.isModalOpen" />
    </Transition>
  </div>
</template>

<script setup>
import { portfolioStore } from '../../state/portfolioStore.js'
import ProjectCard from '../../components/profile/ProjectCard.vue'
import EmptyPortfolioState from '../../components/profile/EmptyPortfolioState.vue'
import AddProjectModal from '../../components/profile/AddProjectModal.vue'
</script>
