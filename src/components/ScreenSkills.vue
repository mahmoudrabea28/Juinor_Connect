<template>
  <section class="screen" :class="{ active }" id="screen-2" aria-labelledby="s2-title">
    <div class="card">
      <h1 id="s2-title" class="card-title">What are your skills?</h1>
      <p class="card-subtitle">Pick everything you are comfortable with — you can update this later.</p>

      <div class="tag-grid" role="group" aria-label="Skills">
        <button
          v-for="skill in skills"
          :key="skill"
          class="tag"
          :class="{ selected: selected.has(skill) }"
          :aria-pressed="selected.has(skill) ? 'true' : 'false'"
          :data-value="skill"
          @click="$emit('toggle', skill)"
        >{{ skill }}</button>
      </div>

      <p class="selection-counter">{{ selected.size === 0 ? '0 selected' : `${selected.size} selected` }}</p>

      <div class="card-actions">
        <button class="btn-back" @click="$emit('back')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back
        </button>
        <button class="btn-continue" @click="$emit('next')">
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  active: Boolean,
  selected: {
    type: Set,
    default: () => new Set(),
  },
})
defineEmits(['toggle', 'next', 'back'])

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design',
  'Figma', 'Next.js', 'PostgreSQL', 'Machine Learning',
  'Product Management', 'Tailwind CSS', 'GraphQL', 'DevOps', 'Branding',
]
</script>
