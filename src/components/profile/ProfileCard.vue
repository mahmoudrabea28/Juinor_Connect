<template>
  <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
    <div class="flex items-center gap-5">
      <div class="relative shrink-0">
        <img
          :src="profile.avatar"
          :alt="profile.name"
          class="w-20 h-20 rounded-full object-cover bg-gray-200"
        />
        <div class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9a2 2 0 0 1 2-2h2l1.5-2h7L17 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-3 flex-wrap">
          <h2 class="text-2xl font-serif text-gray-900">{{ profile.name }}</h2>
          <span class="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {{profile.headline }}
          </span>
        </div>
        <p class="text-gray-500 text-[14px] mt-1.5 max-w-md leading-relaxed">
          {{ profile.bio }}
        </p>
      </div>
    </div>

    <button
      class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shrink-0"
      @click="isModalOpen = true"
    >
      Edit Profile
    </button>
  </section>

  <!-- Mounted only while open, so it always starts from a fresh
       copy of the store and discards any draft on close. -->
  <EditProfileModal v-if="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getOnboardingProfile } from "../../services/api";
import EditProfileModal from "./EditProfileModal.vue";

const isModalOpen = ref(false);

const profile = ref({
  name: "",
  headline: "",
  bio: "",
  avatar: "/default-avatar.png",
});

const fetchProfile = async () => {
  try {
    const data = await getOnboardingProfile();

    profile.value = {
      name: data.profile?.fullName || "",
      headline: data.profile?.currentRole || "",
      bio: data.profile?.shortBio || "",
      avatar: "/default-avatar.png",
    };
  } catch (error) {
    console.error("Error loading profile:", error);
  }
};
onMounted(() => {
  fetchProfile();

  window.addEventListener(
    "profile-updated",
    fetchProfile
  );
});


</script>
