<template>
  <div class="terms-section">
    <div class="terms-header">
      <div class="icon-box">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M2 19c0-2.8 3.1-5 7-5s7 2.2 7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="17" cy="7" r="2.5" stroke="currentColor" stroke-width="2"/>
          <path d="M16 14.5c2.8.4 5 2.2 5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h2>{{ title }}</h2>
    </div>

    <div class="terms-body">
      <div v-for="(sub, index) in subsections" :key="index" class="terms-subsection">
        <button class="terms-trigger" @click="toggle(index)">
          <span class="title">{{ sub.title }}</span>
          <svg
            class="chevron"
            :class="{ open: openIndex === index }"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L8 10L12 6" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <Transition name="accordion">
          <div class="terms-content" v-show="openIndex === index">
            <div class="terms-content-inner">
              <p>{{ sub.content }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  subsections: { type: Array, required: true },
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.terms-section {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  margin-bottom: 24px;
  overflow: hidden;
}

.terms-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  background: #f8f9fc;
  border-bottom: 1px solid var(--color-border);
}

.icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-icon-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.icon-box svg {
  width: 18px;
  height: 18px;
}

.terms-header h2 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.terms-body {
  padding: 4px 20px 20px;
}

.terms-subsection {
  border-bottom: 1px solid var(--color-border);
}

.terms-subsection:last-child {
  border-bottom: none;
}

.terms-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 14px 0;
  text-align: left;
  cursor: pointer;
}

.terms-trigger .title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
}

.chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.terms-content {
  overflow: hidden;
}

.terms-content-inner {
  padding: 0 0 14px 0;
}

.terms-content-inner p {
  font-size: 12.5px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
