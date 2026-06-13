<template>
  <section class="screen" :class="{ active }" id="screen-5" aria-labelledby="s5-title">
    <div class="card card--wide">
      <h1 id="s5-title" class="card-title">What's your availability?</h1>
      <p class="card-subtitle">Let us know when you're usually available to work on projects.</p>

      <!-- Time commitment -->
      <div class="avail-section">
        <p class="avail-section-label"><strong>1. Time commitment</strong></p>
        <p class="avail-section-sub">How many hours can you dedicate per week?</p>

        <div class="time-options" role="radiogroup" aria-label="Weekly hours">
          <button
            v-for="opt in timeOptions"
            :key="opt.value"
            class="time-card"
            :class="{ selected: weeklyHours === opt.value }"
            :data-value="opt.value"
            role="radio"
            :aria-checked="weeklyHours === opt.value ? 'true' : 'false'"
            @click="$emit('selectHours', opt.value)"
            @keydown="handleTimeKeydown($event)"
          >
            <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 15" />
            </svg>
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- Preferred days -->
      <div class="avail-section">
        <p class="avail-section-label"><strong>2. Preferred days</strong></p>
        <p class="avail-section-sub">Select the days you're usually available.</p>

        <div class="day-options" role="group" aria-label="Preferred days">
          <button
            v-for="day in days"
            :key="day"
            class="day-pill"
            :class="{ selected: availableDays.has(day) }"
            :data-value="day"
            :aria-pressed="availableDays.has(day) ? 'true' : 'false'"
            @click="$emit('toggleDay', day)"
          >
            {{ day }}
            <svg class="day-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn-back" @click="$emit('back')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back
        </button>
        <button class="btn-continue btn-continue--finish" @click="$emit('finish')">
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
  weeklyHours: String,
  availableDays: {
    type: Set,
    default: () => new Set(),
  },
})
defineEmits(['selectHours', 'toggleDay', 'finish', 'back'])

const timeOptions = [
  { value: '<5',   label: 'Less than 5 hours' },
  { value: '5-10', label: '5-10 hours' },
  { value: '10-20',label: '10-20 hours' },
  { value: '20+',  label: 'More than 20 hours' },
]

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function handleTimeKeydown(e) {
  const cards = [...e.target.closest('.time-options').querySelectorAll('.time-card')]
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
