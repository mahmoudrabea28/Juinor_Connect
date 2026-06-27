<template>
  <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
    <div>
      <SkillItem
        v-for="skill in skillsStore.selectedSkills"
        :key="skill.id"
        :skill="skill"
        :levels="skillsStore.levels"
        @change-level="(level) => skillsStore.changeSkillLevel(skill.id, level)"
        @remove="skillsStore.removeSkill(skill.id)"
      />
    </div>

    <div class="border-t border-gray-100 pt-4 mt-1">
      <button
        type="button"
        class="inline-flex items-center gap-2.5 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
        @click="skillsStore.openModal()"
      >
        <span class="w-7 h-7 rounded-full border-2 border-indigo-600 flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        Add another skill
      </button>
    </div>
  </section>
</template>

<script setup>
import { skillsStore } from '../../state/skillsStore'
import SkillItem from './SkillItem.vue'
</script>