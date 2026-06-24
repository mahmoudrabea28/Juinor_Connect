<template>
  <Header />
  <div class="page-container">
    <router-link to="/help-center" class="back-link">
       <svg viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 3L5 8L9.5 13" stroke="#746f6d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </router-link>

    <SectionHeader
      title="Step-by-Step Guides"
      subtitle="Comprehensive tutorials to help you master Junior Connect."
    >
      <template #icon>
       <img src="../../assets/images/menu-book.png" alt="">
      </template>
    </SectionHeader>

    <GuideSection
      v-for="(guide, index) in guideSections"
      :key="index"
      :title="guide.title"
      :subtitle="guide.subtitle"
      :icon="guide.icon"
      :steps="guide.steps"
    />
  </div>
  <Footer/>
</template>

<script setup>
import SectionHeader from '../../components/help center/SectionHeader.vue'
import GuideSection from '../../components/help center/GuideSection.vue'
import { guideSections } from '../../data/guides.js'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'

</script>
