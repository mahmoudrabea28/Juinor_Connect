<template>
  <div class="section-header">
    <div class="icon-box">
      <slot name="icon">
        <span class="icon-fallback"></span>
      </slot>
    </div>
    <div class="text-box">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-icon-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}

.icon-box svg {
  width: 20px;
  height: 20px;
}

.text-box h1 {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 6px;
}

.text-box p {
  font-size: 13px;
  color: var(--color-text-secondary);
}
</style>
