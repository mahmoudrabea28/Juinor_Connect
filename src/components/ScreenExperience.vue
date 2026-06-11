<template>
  <section class="screen" :class="{ active }" id="screen-4" aria-labelledby="s4-title">
    <div class="card card--wide">
      <h1 id="s4-title" class="card-title card-title--large">What are your experience level as developer?</h1>
      <p class="card-subtitle">Choose the option that best describes you.</p>

      <div class="experience-options" role="radiogroup" aria-labelledby="s4-title">
        <button
          v-for="option in options"
          :key="option.value"
          class="experience-card"
          :class="{ selected: selected === option.value }"
          :data-value="option.value"
          role="radio"
          :aria-checked="selected === option.value ? 'true' : 'false'"
          @click="$emit('select', option.value)"
          @keydown="handleKeydown($event, option.value)"
        >
          <span class="exp-title">{{ option.value }}</span>
          <span class="exp-desc">{{ option.desc }}</span>
        </button>
      </div>

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
const props = defineProps({
  active: Boolean,
  selected: String,
})
const emit = defineEmits(['select', 'next', 'back'])

const options = [
  { value: 'Beginner',     desc: "I'm just starting my coding journey and learning the basics" },
  { value: 'Intermediate', desc: 'I have some experience and have built a few projects' },
  { value: 'Advanced',     desc: "I'm comfortable building complex applications and solving problems" },
]

function handleKeydown(e, value) {
  const cards = [...e.target.closest('.experience-options').querySelectorAll('.experience-card')]
  const idx = cards.indexOf(e.target)
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    cards[idx + 1]?.focus()
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    cards[idx - 1]?.focus()
  }
}
</script>
