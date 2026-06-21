<template>
  <div class="feedback-form">
    <div class="form-header">
      <h3>Submit Your Feedback</h3>
      <p>Help us improve by sharing your thoughts, ideas, and experiences with Junior Connect.</p>
    </div>

    <div class="form-body">
      <div class="form-row">
        <div class="form-group">
          <label>Feedback Type *</label>
          <select v-model="form.feedbackType">
            <option value="" disabled selected>Choose a feedback type</option>
            <option v-for="type in feedbackTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Title *</label>
          <input type="text" v-model="form.titleField" placeholder="Brief summary of your feedback" />
        </div>
      </div>

      <div class="form-row">
        <label class="priority-label">Priority Level</label>
        <div class="priority-selector">
          <button
            v-for="level in priorityLevels"
            :key="level"
            type="button"
            class="priority-btn"
            :class="{ active: form.priority === level }"
            @click="form.priority = level"
          >
            {{ level }}
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Description *</label>
          <textarea
            v-model="form.description"
            placeholder="Please provide detailed information about your feedback. For bugs, include steps to reproduce; for features, explain the problem."
            rows="5"
          ></textarea>
        </div>
      </div>

      <button class="submit-btn" type="button" @click="$emit('submit', form)">
        Submit Support Request →
      </button>
    </div>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
import { reactive } from 'vue'

defineProps({
  feedbackTypes: { type: Array, default: () => [] },
})
defineEmits(['submit'])

const priorityLevels = ['LOW', 'MEDIUM', 'HIGH']

const form = reactive({
  feedbackType: '',
  titleField: '',
  priority: 'MEDIUM',
  description: '',
})
</script>

<style scoped>
.feedback-form {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border);
}

.form-header {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: #fff;
  padding: 20px 24px;
}

.form-header h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.form-header p {
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.6;
}

.form-body {
  background: var(--color-white);
  padding: 24px;
}

.form-row {
  margin-bottom: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label,
.priority-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-text);
  display: block;
  margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 12.5px;
  color: var(--color-text);
  background: var(--color-white);
  outline: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--color-text-muted);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.priority-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.priority-btn {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.priority-btn.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
}

.submit-btn:hover {
  opacity: 0.92;
}
</style>
