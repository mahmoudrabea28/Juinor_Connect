<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="handleCancel"
  >
  
    <div
     class="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] max-h-[88vh] flex flex-col overflow-hidden" @mousedown.stop>
      <!-- Header -->
      <div class="px-6 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-serif text-gray-900">Add a Skill</h2>
          <button type="button" class="text-gray-400 hover:text-gray-700" aria-label="Close" @click="handleCancel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">Pick a skill and set your level in one step.</p>
      </div>

      <!-- Search -->
      <div class="px-6">
        <div class="relative mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search skills"
            class="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <!-- Results -->
      <div class="px-6 overflow-y-auto flex-1">
        <div v-if="results.length === 0" class="text-sm text-gray-400 text-center py-8">
          No skills found
        </div>

        <div v-else class="space-y-2 pb-1">
          <template v-for="skill in results" :key="skill.id">
            <!-- Picked: expanded card with its own level selector -->
            <div
              v-if="isPending(skill.id)"
              class="border border-indigo-200 border-l-4 border-l-indigo-500 rounded-lg px-4 py-3 cursor-pointer"
              @click="togglePending(skill)"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-[15px] font-semibold text-gray-900">{{ skill.name }}</p>
                  <span class="inline-block mt-1 text-[10px] font-semibold tracking-wide uppercase text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                    {{ skill.category }}
                  </span>
                </div>
                <div class="flex items-center gap-1.5" @click.stop>
                  <button
                    v-for="level in levels"
                    :key="level"
                    type="button"
                    :class="levelButtonClasses(pendingLevel(skill.id) === level)"
                    @click="setPendingLevel(skill, level)"
                  >
                    {{ level }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Not picked yet: plain selectable row -->
            <button
              v-else
              type="button"
              class="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/40 text-left transition-colors"
              @click="togglePending(skill)"
            >
              <span class="text-[15px] text-gray-800">{{ skill.name }}</span>
              <span class="text-[10px] font-semibold tracking-wide uppercase text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
                {{ skill.category }}
              </span>
            </button>
          </template>
        </div>
      </div>

      <!-- Status: skills picked, ready to add -->
      <div v-if="pendingSkills.length" class="mx-6 mb-2 mt-3 bg-indigo-50 rounded-lg px-4 py-3 flex items-center gap-2 flex-wrap text-sm">
        <span class="text-gray-600 whitespace-nowrap">
          {{ pendingSkills.length }} skill{{ pendingSkills.length === 1 ? '' : 's' }} ready to add:
        </span>
        <span
          v-for="skill in pendingSkills"
          :key="skill.id"
          class="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-medium pl-3 pr-2 py-1 rounded-full"
        >
          {{ skill.name }}
          <button type="button" class="hover:opacity-80" aria-label="Remove" @click="removePending(skill.id)">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button type="button" class="text-gray-600 font-medium text-sm hover:text-gray-800" @click="handleCancel">
          Cancel
        </button>
        <button
          type="button"
          class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="pendingSkills.length === 0"
          @click="handleAdd"
        >
          Add skills
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { skillsStore } from '../../state/skillsStore'

const levels = skillsStore.levels
const pendingSkills = computed(() => skillsStore.pendingSkills)
const results = computed(() => skillsStore.searchResults)

const searchQuery = computed({
  get: () => skillsStore.searchQuery,
  set: (value) => skillsStore.searchSkills(value),
})

function isPending(id) {
  return skillsStore.pendingSkills.some((s) => s.id === id)
}

function pendingLevel(id) {
  const skill = skillsStore.pendingSkills.find((s) => s.id === id)
  return skill ? skill.level : null
}

function togglePending(skill) {
  skillsStore.togglePendingSkill(skill)
}

function setPendingLevel(skill, level) {
  skillsStore.setPendingSkillLevel(skill.id, level)
}

function removePending(id) {
  skillsStore.removePendingSkill(id)
}

function levelButtonClasses(active) {
  return [
    'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap',
    active
      ? 'bg-indigo-600 border-indigo-600 text-white'
      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
  ]
}

function handleCancel() {
  skillsStore.closeModal()
}

function handleAdd() {
  skillsStore.addSkill()
}
</script>
