<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="profileStore.closeSkillModal()"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden"
      @mousedown.stop
    >
      <!-- Header -->
      <div class="flex items-start justify-between px-6 pt-6 pb-2">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Add Skill</h2>
          <p class="text-sm text-gray-400 mt-0.5">Choose a skill to add to your profile</p>
        </div>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-700 mt-0.5"
          aria-label="Close"
          @click="profileStore.closeSkillModal()"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Search -->
      <div class="px-6 pt-4">
        <div class="relative">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            :value="profileStore.skillSearch"
            type="text"
            placeholder="Search skills..."
            class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            @input="profileStore.searchSkills($event.target.value)"
          />
        </div>
      </div>

      <!-- Skill chips -->
      <div class="px-6 pt-4 pb-2 min-h-[120px]">
        <div v-if="profileStore.filteredAvailableSkills.length" class="flex flex-wrap gap-2">
          <button
            v-for="skill in profileStore.filteredAvailableSkills"
            :key="skill"
            type="button"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
              profileStore.pendingSkillLabel === skill
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50',
            ]"
            @click="profileStore.selectSkill(skill)"
          >
            {{ skill }}
          </button>
        </div>
        <p v-else class="text-sm text-gray-400 text-center py-6">No skills found</p>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button
          type="button"
          class="text-gray-600 font-medium text-sm hover:text-gray-800"
          @click="profileStore.closeSkillModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="!profileStore.pendingSkillLabel"
          @click="saveSkill"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profileStore } from '../../state/profileStore'
import { getOnboardingProfile, updateSkills } from '../../services/api'
const saveSkill = async () => {
  try {
    const data = await getOnboardingProfile()

    const currentSkills = data.profile?.skills || []

    const selectedSkill = profileStore.pendingSkillLabel

    if (!selectedSkill) return

    const updatedSkills = [...currentSkills]

    if (!updatedSkills.includes(selectedSkill)) {
      updatedSkills.push(selectedSkill)
    }

    await updateSkills(updatedSkills)

    window.dispatchEvent(
      new CustomEvent('skills-updated')
    )

    profileStore.closeSkillModal()
  } catch (err) {
    console.error(err)
  }
}
</script>
