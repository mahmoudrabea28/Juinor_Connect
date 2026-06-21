<template>
  <div class="support-form">
    <div class="form-header">
      <div class="icon-box">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M3 6l7.5 6L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 16l5-4M21 16l-5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div>
        <h3>Submit a Support Request</h3>
        <p>Fill out the form below and our team will get back to you as soon as possible.</p>
      </div>
    </div>

    <div class="form-body">
      <div class="form-row two-col">
        <div class="form-group">
          <label>Full Name*</label>
          <input type="text" v-model="form.fullName" placeholder="Enter your full name" />
        </div>
        <div class="form-group">
          <label>Email Address*</label>
          <input type="email" v-model="form.email" placeholder="Enter your full name" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Category*</label>
          <select v-model="form.category">
            <option value="" disabled selected>Choose a category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Subject*</label>
          <input type="text" v-model="form.subject" placeholder="How can we help you?" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Message*</label>
          <textarea v-model="form.message" placeholder="Share your thoughts or questions..." rows="5"></textarea>
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
  categories: { type: Array, default: () => [] },
})
defineEmits(['submit'])

const form = reactive({
  fullName: '',
  email: '',
  category: '',
  subject: '',
  message: '',
})
</script>

<style scoped>
.support-form {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border);
}

.form-header {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end));
  color: #fff;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
}

.icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-box svg {
  width: 18px;
  height: 18px;
}

.form-header h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
}

.form-header p {
  font-size: 12px;
  opacity: 0.9;
}

.form-body {
  background: var(--color-white);
  padding: 24px;
}

.form-row {
  margin-bottom: 16px;
}

.form-row.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-text);
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

@media (max-width: 600px) {
  .form-row.two-col {
    grid-template-columns: 1fr;
  }
}
</style>
