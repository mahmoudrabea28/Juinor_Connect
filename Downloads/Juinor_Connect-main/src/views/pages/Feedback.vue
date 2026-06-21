<template>
  <Header />
  <div class="page-container">
    <router-link to="/help-center" class="back-link">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 3L5 8L9.5 13" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </router-link>

    <SectionHeader
      title="Share Your Feedback"
      subtitle="Your ideas and suggestions help us build a better Junior Connect. We value your input!"
    >
      <template #icon>
        <img src="../../assets/images/comment.png" alt="">
      </template>
    </SectionHeader>

    <div class="card-grid">
      <SupportCard title="Feature Request" description="Suggest new platform features">
        <template #icon>
          <img src="../../assets/images/lamp.png" alt="">
        </template>
      </SupportCard>
      <SupportCard title="Bug Report" description="Report technical problems">
        <template #icon>
          <img src="../../assets/images/question-circle.png" alt="">
        </template>
      </SupportCard>
      <SupportCard title="Suggestion" description="Share ideas to improve user experience">
        <template #icon>
          <img src="../../assets/images/star.png" alt="">
        </template>
      </SupportCard>
    </div>

    <FeedbackForm :feedback-types="feedbackTypes" @submit="handleSubmit" />

    <div class="impact-box">
      <svg class="spark-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" stroke="#4338ca" stroke-width="1.6" stroke-linejoin="round"/>
      </svg>
      <div>
        <p class="impact-title">Your Impact</p>
        <p class="impact-note">Many of Junior Connect's most popular features came directly from user feedback. Recent user suggestions included the team matching algorithm improvements, portfolio templates, and enhanced collaboration tools. Your voice shapes the platform!</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import '../../assets/images/main.css'
import SectionHeader from '../../components/help center/SectionHeader.vue'
import SupportCard from '../../components/help center/SupportCard.vue'
import FeedbackForm from '../../components/help center/FeedbackForm.vue'
import { feedbackTypes } from '../../data/support.js'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'

function handleSubmit(formData) {
  // UI only — no submission
  console.log('Feedback (UI only):', formData)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.impact-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-success-bg);
  border: 1px solid var(--color-success-border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-top: 24px;
}

.spark-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.impact-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.impact-note {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
