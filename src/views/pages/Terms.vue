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
      title="Terms & Policies"
      subtitle="Understand the rules, guidelines, and privacy practices that keep Junior Connect safe."
    >
      <template #icon>
        <img src="../../assets/images/comment.png" alt="">
      </template>
    </SectionHeader>

    <div class="updated-box">
      <svg class="updated-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#4338ca" stroke-width="2"/>
        <path d="M12 7v5l3 2" stroke="#4338ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <p class="updated-title">Last Updated: {{ lastUpdated.date }}</p>
        <p class="updated-note">{{ lastUpdated.note }}</p>
      </div>
    </div>

    <TermsSection
      v-for="(section, index) in termsSections"
      :key="index"
      :title="section.title"
      :subsections="section.subsections"
    />
  </div>
  <Footer/>
</template>

<script setup>

import SectionHeader from '../../components/help center/SectionHeader.vue'
import TermsSection from '../../components/help center/TermsSection.vue'
import { termsSections, lastUpdated } from '../../data/terms.js'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'

</script>

<style scoped>
.updated-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--color-success-bg);
  border: 1px solid var(--color-success-border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-bottom: 24px;
}

.updated-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.updated-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.updated-note {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
