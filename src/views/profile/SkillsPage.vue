<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-serif text-gray-900">Your Selected Skills</h1>
      <span class="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
        {{ skillsStore.selectedSkills.length }} Skills Selected
      </span>
    </div>

    <SelectedSkillsList />
    <SuggestedSkills />

    <div class="flex justify-end mt-6">
      <button
        type="button"
        class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors"
        @click="handleSaveChanges"
      >
        Save changes
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <AddSkillModal v-if="skillsStore.isModalOpen" />
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingScreen from '../../components/LoadingScreen.vue'
import { skillsStore } from '../../state/skillsStore.js'
import SelectedSkillsList from '../../components/profile/SelectedSkillsList.vue'
import SuggestedSkills from '../../components/profile/SuggestedSkills.vue'
import AddSkillModal from '../../components/profile/AddSkillModal.vue'
import { updateSkills } from '../../services/api'
import { getOnboardingProfile } from '../../services/api'
import {getOnboardingOptions} from '../../services/api'

const isLoading = ref(true)


// Every skill change on this page (level switch, delete, add via the
// modal) already mutates skillsStore the moment it happens, so there
// is nothing left to persist here — this button mirrors the
// screenshot's affordance rather than gating a separate save step.
const handleSaveChanges = async () => {
  try {
    await updateSkills(
      skillsStore.selectedSkills.map(
        skill => skill.name
      )
    )

    window.dispatchEvent(
      new CustomEvent('skills-updated')
    )
  } catch (err) {
    console.error(err)
  }
}
onMounted(async () => {
  try {
    const [profileData, optionsData] = await Promise.all([
      getOnboardingProfile(),
      getOnboardingOptions(),
    ])

    // selected skills
    skillsStore.selectedSkills = (
      profileData.profile?.skills || []
    ).map((skill, index) => ({
      id: `${skill}-${index}`,
      name: skill,
      level: 'Intermediate',
    }))

    // available skills
    skillsStore.availableSkills =
      optionsData.SKILLS.map((skill) => ({
        id: skill.toLowerCase().replaceAll(' ', '-'),
        name: skill,
        category: 'General',
      }))
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})


</script>