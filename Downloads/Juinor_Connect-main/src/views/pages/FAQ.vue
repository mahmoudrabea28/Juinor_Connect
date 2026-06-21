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
      title="Frequently Asked Questions"
      subtitle="Find quick answers to common questions about Junior Connect."
    >
      <template #icon>
        <img src="../../assets/images/question-circle.png" alt="">
      </template>
    </SectionHeader>

    <div class="search-wrapper">
      <SearchInput v-model="searchQuery" placeholder="Search for answers..." />
    </div>

    <Accordion :items="filteredFaq" />

    <GradientBanner
      title="Still have questions?"
      description="Can't find what you're looking for? Our support team is ready to help."
      button-text="Contact Support"
      @action="goToSupport"
    />
  </div>
  <Footer/>
</template>

<script setup>
// import '../../assets/images/main.css'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SectionHeader from '../../components/help center/SectionHeader.vue'
import SearchInput from '../../components/help center/SearchInput.vue'
import Accordion from '../../components/help center/Accordion.vue'
import GradientBanner from '../../components/help center/GradientBanner.vue'
import { faqItems } from '../../data/faq.js'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'
const router = useRouter()
const searchQuery = ref('')

function goToSupport() {
  router.push('/support')
}

const filteredFaq = computed(() => {
  if (!searchQuery.value.trim()) return faqItems
  const q = searchQuery.value.toLowerCase()
  return faqItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
  )
})
</script>

<style scoped>

.search-wrapper {
  margin-bottom: 20px;
}
</style>
