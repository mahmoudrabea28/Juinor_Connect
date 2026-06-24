<template>
  <LoadingScreen v-if="profileStore.loading" />
  <PersonalInformationForm v-else />
</template>

<script setup>
import { onMounted } from 'vue'
import { profileStore } from '../../state/profileStore.js'
import LoadingScreen from '../../components/LoadingScreen.vue'
import PersonalInformationForm from '../../components/profile/PersonalInformationForm.vue'

onMounted(() => {
  profileStore.loadProfile()
})
</script>