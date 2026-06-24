<template>
  <section class="grid grid-cols-3 gap-5 mt-5">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
    >
      <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="stat.icon" />
      </div>
      <div>
        <p class="text-xl font-bold text-gray-900 leading-tight">{{ stat.value }}</p>
        <p class="text-sm text-gray-400 leading-tight">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getOnboardingProfile, getMyProjects } from "../../services/api";

const profile = ref(null);
const projects = ref([]);

const fetchData = async () => {
  try {
    const [profileData, projectsData] = await Promise.all([
      getOnboardingProfile(),
      getMyProjects(),
    ]);

    profile.value = profileData.profile;
    projects.value = projectsData.projects || projectsData || [];
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);

const stats = computed(() => [
  {
    label: "Skills",
    value: profile.value?.skills?.length || 0,
    icon: '<polyline points="9 7 4 12 9 17"></polyline><polyline points="15 7 20 12 15 17"></polyline>',
  },
  {
    label: "Projects",
    value: projects.value.length,
    icon: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path>',
  },
  {
    label: "Achievements",
    value: 0,
    icon: '<circle cx="12" cy="8" r="5"></circle><path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5"></path>',
  },
]);
</script>