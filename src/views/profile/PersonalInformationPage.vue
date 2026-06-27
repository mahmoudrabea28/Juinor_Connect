<template>
  <LoadingScreen v-if="isLoading" />
  <PersonalInformationForm v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileStore } from '../../state/profileStore.js'
import LoadingScreen from '../../components/LoadingScreen.vue'
import PersonalInformationForm from '../../components/profile/PersonalInformationForm.vue'

const isLoading = ref(true)

onMounted(async () => {
  try {
    await profileStore.loadProfile({ force: true })
  } finally {
    isLoading.value = false
  }
})
</script>