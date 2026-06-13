<template>
  <div class="onboarding-wrapper">

     <header class="navbar">
    <img src="./assets/logo.png" alt="Logo" class="logo">
  </header>

    <!-- ── PROGRESS STEPPER ── -->
    <nav class="stepper" aria-label="Onboarding progress">
      <ol class="stepper-list">
        <template v-for="(stepDef, i) in stepDefs" :key="stepDef.num">
          <li
            class="step"
            :class="stepClass(stepDef.num)"
            :data-step="stepDef.num"
          >
            <span class="step-indicator"><span class="step-num">{{ stepDef.num }}</span></span>
            <span class="step-label">{{ stepDef.label }}</span>
          </li>
          <li
            v-if="i < stepDefs.length - 1"
            class="step-connector"
            :class="{ done: connectorDone(i) }"
            aria-hidden="true"
          ></li>
        </template>
      </ol>
    </nav>

    <!-- ── SCREENS ── -->
    <main class="screens-container">
      <ScreenPersonalInfo
        v-if="!isDone"
        :active="currentStep === 1"
        v-model:fullName="data.fullName"
        v-model:currentRole="data.currentRole"
        v-model:shortBio="data.shortBio"
        @next="goToStep(2)"
      />
      <ScreenSkills
        v-if="!isDone"
        :active="currentStep === 2"
        :selected="data.skills"
        @toggle="toggleSkill"
        @next="goToStep(3)"
        @back="goToStep(1)"
      />
      <ScreenInterests
        v-if="!isDone"
        :active="currentStep === 3"
        :selected="data.interests"
        @toggle="toggleInterest"
        @next="goToStep(4)"
        @back="goToStep(2)"
      />
      <ScreenExperience
        v-if="!isDone"
        :active="currentStep === 4"
        :selected="data.experienceLevel"
        @select="val => data.experienceLevel = val"
        @next="goToStep(5)"
        @back="goToStep(3)"
      />
      <ScreenAvailability
        v-if="!isDone"
        :active="currentStep === 5"
        :weeklyHours="data.weeklyHours"
        :availableDays="data.availableDays"
        @selectHours="val => data.weeklyHours = val"
        @toggleDay="toggleDay"
        @finish="handleFinish"
        @back="goToStep(4)"
      />

      <!-- SUCCESS -->
      <section v-if="isDone" class="screen active">
        <div class="card" style="text-align:center; padding: 4rem 2.5rem;">
          <div style="width:64px; height:64px; border-radius:50%; background:#EFF4FF; display:flex; align-items:center; justify-content:center; margin: 0 auto var(--space-6);">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 14.5L11 20.5L23 8.5" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2 style="font-family: var(--font-display); font-size: var(--text-2xl); margin-bottom: var(--space-3);">You're all set!</h2>
          <p style="color: var(--color-text-muted); font-size: var(--text-base); max-width: 340px; margin: 0 auto;">
            Your profile is ready. We'll use your preferences to match you with the best teams and projects.
          </p>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import ScreenPersonalInfo from './components/ScreenPersonalInfo.vue'
import ScreenSkills from './components/ScreenSkills.vue'
import ScreenInterests from './components/ScreenInterests.vue'
import ScreenExperience from './components/ScreenExperience.vue'
import ScreenAvailability from './components/ScreenAvailability.vue'

/* ── STATE ── */
const currentStep = ref(1)
const totalSteps = 5
const isDone = ref(false)

const data = reactive({
  fullName: '',
  currentRole: '',
  shortBio: '',
  skills: new Set(),
  interests: new Set(),
  experienceLevel: '',
  weeklyHours: '20+',
  availableDays: new Set(['Sun']),
})

/* ── STEPPER DEFS ── */
const stepDefs = [
  { num: 1, label: 'Personal info' },
  { num: 2, label: 'Skills' },
  { num: 3, label: 'Interests' },
  { num: 4, label: 'Experience level' },
  { num: 5, label: 'Availability' },
]

function stepClass(num) {
  if (isDone.value || num < currentStep.value) return 'done'
  if (num === currentStep.value) return 'active'
  return ''
}

/* ── CONNECTOR ── */
function connectorDone(i) {
  // connector[i] sits between step i+1 and step i+2; done if step i+2 is past
  return isDone.value || (i + 1 < currentStep.value)
}

/* ── NAVIGATION ── */
function goToStep(n) {
  if (n < 1 || n > totalSteps) return
  currentStep.value = n
}

/* ── TAG TOGGLES ── */
function toggleSkill(value) {
  const s = new Set(data.skills)
  s.has(value) ? s.delete(value) : s.add(value)
  data.skills = s
}

function toggleInterest(value) {
  const s = new Set(data.interests)
  s.has(value) ? s.delete(value) : s.add(value)
  data.interests = s
}

function toggleDay(value) {
  const s = new Set(data.availableDays)
  s.has(value) ? s.delete(value) : s.add(value)
  data.availableDays = s
}

/* ── FINISH ── */
function handleFinish() {
  const payload = {
    fullName: data.fullName,
    currentRole: data.currentRole,
    shortBio: data.shortBio,
    skills: [...data.skills],
    interests: [...data.interests],
    experienceLevel: data.experienceLevel,
    weeklyHours: data.weeklyHours,
    availableDays: [...data.availableDays],
  }
  console.log('Onboarding complete:', payload)
  isDone.value = true
}
</script>
