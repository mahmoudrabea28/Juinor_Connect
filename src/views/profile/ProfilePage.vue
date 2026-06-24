<template>
  <LoadingScreen v-if="profileStore.loading" />

  <template v-else>
    <ProfileCard />
    <StatsCards />
    <SkillsSection />
    <PortfolioSection />
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { profileStore } from '../../state/profileStore.js'
import LoadingScreen from '../../components/LoadingScreen.vue'
import ProfileCard from '../../components/profile/ProfileCard.vue'
import StatsCards from '../../components/profile/StatsCards.vue'
import SkillsSection from '../../components/profile/SkillsSection.vue'
import PortfolioSection from '../../components/profile/PortfolioSection.vue'

onMounted(() => {
  profileStore.loadProfile()
})
</script>