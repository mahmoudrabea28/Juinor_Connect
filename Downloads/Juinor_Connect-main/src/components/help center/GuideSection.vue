<template>
  <div class="guide-section">
    <div class="guide-header">
      <div class="icon-box">
       <img src="../../assets/images/rocket.png" alt="Rocket">
      </div>
      <div>
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <div class="steps">
      <div v-for="(step, index) in steps" :key="index" class="step">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-text">
          <h4>{{ step.title }}</h4>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  icon: { type: String, default: 'user' },
  steps: { type: Array, required: true },
})
</script>

<style scoped>
.guide-section {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  margin-bottom: 24px;
  overflow: hidden;
}

.guide-header {
  display: flex;
  align-items: center;
  gap: 14px;
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

.guide-header h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2px;
}

.guide-header p {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.steps {
  padding: 8px 20px 12px;
}

.step {
  display: flex;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}

.step:last-child {
  border-bottom: none;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-text h4 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--color-text);
}

.step-text p {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
