<template>
  <section class="screen" :class="{ active }" id="screen-3" aria-labelledby="s3-title">
    <div class="card">
      <h1 id="s3-title" class="card-title">What are you interested in?</h1>
      <p class="card-subtitle">We'll use this to recommend teams and projects.</p>

      <div class="tag-grid" role="group" aria-label="Interests">
        <button
          v-for="interest in interests"
          :key="interest"
          class="tag"
          :class="{ selected: selected.has(interest) }"
          :aria-pressed="selected.has(interest) ? 'true' : 'false'"
          :data-value="interest"
          @click="$emit('toggle', interest)"
        >{{ interest }}</button>
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

const interests = [
  'Fintech', 'Health & Wellness', 'Education', 'Python', 'Climate Tech',
  'Figma', 'Developer Tools', 'Social Impact', 'E-commerce',
  'AI & Agents', 'Gaming', 'Productivity', 'Create Economy', 'Open Source',
]
</script>
