<template>
  <div class="accordion-item">
    <button class="accordion-trigger" @click="toggle">
      <span class="title-row">
        <span v-if="bullet" class="bullet"></span>
        <span class="title">{{ title }}</span>
      </span>
      <svg
        class="chevron"
        :class="{ open: isOpen }"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 6L8 10L12 6" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <Transition name="accordion">
      <div class="accordion-content" v-show="isOpen">
        <div class="accordion-content-inner">
          <slot>{{ content }}</slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  bullet: { type: Boolean, default: false },
})

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.accordion-item {
  border-bottom: 1px solid var(--color-border);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 16px 0;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}

.chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 300ms ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
}

.accordion-content-inner {
  padding: 0 0 16px 0;
  font-size: 12.5px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 300ms ease, opacity 300ms ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
