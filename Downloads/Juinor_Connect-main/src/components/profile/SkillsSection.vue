<template>
  <section class="mt-6">
    <h3 class="text-xl font-serif text-gray-900 mb-3">My Skills</h3>
    <div class="flex items-center gap-3 flex-wrap">
      <span
        v-for="skill in profileStore.skills"
        :key="skill.label"
        :class="[
          skill.gradient
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
            : 'bg-indigo-600',
          'text-white text-sm font-medium px-5 py-2 rounded-full',
        ]"
      >
        {{ skill.label }}
      </span>

      <!-- Exact same button — only @click added -->
      <button
        class="border border-gray-300 text-gray-600 text-sm font-medium px-5 py-2 rounded-full flex items-center gap-1.5 hover:bg-gray-50"
        @click="profileStore.openSkillModal()"
      >
        <span class="text-base leading-none">+</span> add skills
      </button>
    </div>

    <!-- Modal: mounted only while open so the draft resets on each open -->
    <ProfileAddSkillModal v-if="profileStore.skillModalOpen" />
  </section>
</template>

<script setup>
import { profileStore } from '../../state/profileStore'
import ProfileAddSkillModal from './ProfileAddSkillModal.vue'
</script>
