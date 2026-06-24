<template>
  <router-link :to="link" class="category-card">
    <div class="icon-box">
      <slot name="icon"></slot>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <span class="explore-link">Explore →</span>
  </router-link>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
})
</script>

<style scoped>
.category-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease;
}

.category-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
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
  margin-bottom: 12px;
}

.icon-box svg {
  width: 18px;
  height: 18px;
}

.category-card h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--color-text);
}

.category-card p {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  flex: 1;
  margin-bottom: 10px;
}

.explore-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-link);
}
</style>
