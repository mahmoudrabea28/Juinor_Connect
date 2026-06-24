<template>
  <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-5">
    <h3 class="text-xl font-serif text-gray-900">Suggested Skills</h3>
    <p class="text-sm text-gray-400 mt-1 mb-4">Based on your interests</p>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="skill in skillsStore.suggestedSkills"
        :key="skill.id"
        type="button"
        class="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
        @click="skillsStore.openModal(skill)"
      >
        {{ skill.name }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { skillsStore } from '../../state/skillsStore'
</script>
