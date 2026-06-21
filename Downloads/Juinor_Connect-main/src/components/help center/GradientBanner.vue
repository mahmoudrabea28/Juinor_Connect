<template>
  <div class="gradient-banner">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button v-if="buttonText" class="banner-btn" @click="$emit('action')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, default: '' },
})
defineEmits(['action'])
</script>

<style scoped>
.gradient-banner {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-align: center;
  color: #fff;
  margin-top: 24px;
}

.gradient-banner h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.gradient-banner p {
  font-size: 13px;
  opacity: 0.9;
  max-width: 480px;
  margin: 0 auto 18px;
  line-height: 1.6;
}

.banner-btn {
  background: #fff;
  color: var(--color-primary);
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
}

.banner-btn:hover {
  background: #f3f4f6;
}
</style>
