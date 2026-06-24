<template>
  <div class="support-card">
    <div class="icon-box">
      <slot name="icon"></slot>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<style scoped>
.support-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-card);
}

.icon-box {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--color-icon-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 12px;
}

.icon-box svg {
  width: 16px;
  height: 16px;
}

.support-card h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--color-text);
}

.support-card p {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
