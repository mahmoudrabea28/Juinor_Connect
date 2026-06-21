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
      title="Get Support"
      subtitle="Our team is here to help you with any questions or issues you're experiencing."
    >
      <template #icon>
        <img src="../../assets/images/customer-service.png" alt="">
      </template>
    </SectionHeader>

    <div class="card-grid">
      <SupportCard title="Contact Support" description="Reach our support team for any technical issues and account-related questions.">
        <template #icon>
         <img src="../../assets/images/comment.png" alt="">
        </template>
      </SupportCard>
      <SupportCard title="Technical Issues" description="Get help with login problems, bugs, and platform errors.">
        <template #icon>
          <img src="../../assets/images/question-circle.png" alt="">
        </template>
      </SupportCard>
      <SupportCard title="Account Assistance" description="Update account details, recover passwords, and manage settings.">
        <template #icon>
          <img src="../../assets/images/User.png" alt="">
        </template>
      </SupportCard>
    </div>

    <div class="response-time-box">
      <svg class="clock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#4338ca" stroke-width="2"/>
        <path d="M12 7v5l3 2" stroke="#4338ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <p class="response-title">Response Time</p>
        <p class="response-note">Most requests receive a response within 24-48 hours. Urgent technical issues are prioritized and typically addressed within a few hours.</p>
      </div>
    </div>

    <SupportForm :categories="supportCategories" @submit="handleSubmit" />

    <div class="bottom-cards">
      <div class="bottom-card">
        <h4>Check our FAQ</h4>
        <p>Many common questions are answered in our FAQ section.</p>
        <router-link to="/faq" class="bottom-link">Browse FAQ →</router-link>
      </div>
      <div class="bottom-card">
        <h4>Explore Guides</h4>
        <p>Step-by-step tutorials for common tasks and features.</p>
        <router-link to="/guides" class="bottom-link">View Guides →</router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>

import SectionHeader from '../../components/help center/SectionHeader.vue'
import SupportCard from '../../components/help center/SupportCard.vue'
import SupportForm from '../../components/help center/SupportForm.vue'
import { supportCategories } from '../../data/support.js'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'

function handleSubmit(formData) {
  // UI only — no submission
  console.log('Support request (UI only):', formData)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.response-time-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-card);
}

.clock-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.response-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2px;
}

.response-note {
  font-size: 12px;
  color: var(--color-primary);
  line-height: 1.6;
}

.bottom-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
}

.bottom-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-card);
}

.bottom-card h4 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--color-text);
}

.bottom-card p {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
  line-height: 1.5;
}

.bottom-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-link);
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .bottom-cards {
    grid-template-columns: 1fr;
  }
}
</style>
