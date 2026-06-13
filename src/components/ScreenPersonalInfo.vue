<template>
  <section class="screen" :class="{ active }" id="screen-1" aria-labelledby="s1-title">
    <div class="card">
      <h1 id="s1-title" class="card-title">Tell us about you</h1>
      <p class="card-subtitle">This helps teammates get to know you.</p>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label" for="full-name">Full name</label>
          <input
            class="form-input"
            id="full-name"
            type="text"
            placeholder="Full Name"
            autocomplete="name"
            :value="fullName"
            @input="$emit('update:fullName', $event.target.value.trim())"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="current-role">Current role</label>
          <input
            class="form-input"
            id="current-role"
            type="text"
            placeholder="Student / Graduated"
            :value="currentRole"
            @input="$emit('update:currentRole', $event.target.value.trim())"
          />
        </div>
      </div>

      <div class="form-group" style="margin-top: var(--space-5);">
        <label class="form-label" for="short-bio">Short bio</label>
        <textarea
          class="form-textarea"
          id="short-bio"
          placeholder="Write about you"
          rows="4"
          :value="shortBio"
          @input="$emit('update:shortBio', $event.target.value.trim())"
        ></textarea>
      </div>

      <div class="card-actions">
        <button class="btn-back" disabled>
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
  fullName: String,
  currentRole: String,
  shortBio: String,
})
defineEmits(['update:fullName', 'update:currentRole', 'update:shortBio', 'next'])
</script>
