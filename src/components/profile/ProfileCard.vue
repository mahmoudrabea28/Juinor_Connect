<template>
  <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
    <div class="flex items-center gap-5">
      <div class="relative shrink-0">
        <img
          v-if="profile.avatar"
          :src="profile.avatar"
          :alt="profile.name"
          class="w-20 h-20 rounded-full object-cover bg-gray-200"
          @error="onAvatarError"
        />
        <!-- No avatar set → neutral person icon (not a shared stock photo) -->
        <div
          v-else
          class="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400"
          :aria-label="profile.name || 'No photo'"
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>
        <!-- Camera badge: click to upload a new photo right here -->
        <button
          type="button"
          :disabled="uploading"
          class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-indigo-700 disabled:opacity-60"
          aria-label="Change photo"
          @click="triggerFilePicker"
        >
          <svg v-if="!uploading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9a2 2 0 0 1 2-2h2l1.5-2h7L17 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <!-- tiny spinner while uploading -->
          <svg v-else class="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="12" cy="12" r="9" stroke-opacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
          </svg>
        </button>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
      </div>

      <div>
        <div class="flex items-center gap-3 flex-wrap">
          <h2 class="text-2xl font-serif text-gray-900">{{ profile.name }}</h2>
          <span
            v-if="profile.headline"
            class="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
          >
            {{ profile.headline }}
          </span>
        </div>
        <p
          v-if="profile.bio"
          class="text-gray-500 text-[14px] mt-1.5 max-w-md leading-relaxed"
        >
          {{ profile.bio }}
        </p>
        <p
          v-else
          class="text-gray-400 text-[14px] mt-1.5 max-w-md leading-relaxed italic"
        >
          Add a short bio from “Edit Profile”.
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { profileStore } from "../../state/profileStore";
import { uploadAvatar, updateProfileCard } from "../../services/api";
import EditProfileModal from "./EditProfileModal.vue";

const isModalOpen = ref(false);
const fileInput = ref(null);
const uploading = ref(false);

// Read straight from the shared store so edits (name, bio, avatar)
// show up instantly after saving.
const profile = computed(() => profileStore.profile);

// If the avatar URL is broken, clear it so the neutral person icon
// (the v-else block in the template) is shown instead of a broken image.
function onAvatarError() {
  profileStore.profile.avatar = "";
}

function triggerFilePicker() {
  fileInput.value?.click();
}

// Read the picked file as a base64 data URL.
function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function onFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  uploading.value = true;
  try {
    const base64 = await readAsDataURL(file);

    // 1) Upload to Cloudinary via the server → returns hosted URL.
    const res = await uploadAvatar(base64);
    const avatarUrl = res.avatar;

    // 2) Persist it on the profile card too (so it survives reloads).
    await updateProfileCard({ avatar: avatarUrl });

    // 3) Update the shared store → ProfileCard AND the Navbar both
    //    read from here, so the photo shows up in the nav instantly.
    profileStore.updateProfile({ avatar: avatarUrl });

    // Let the Navbar know to refresh the user (name + avatar).
    window.dispatchEvent(new CustomEvent("profile-updated"));
    window.dispatchEvent(new CustomEvent("user-updated"));
  } catch (err) {
    console.error("Avatar upload failed:", err);
  } finally {
    uploading.value = false;
    // Reset so picking the same file again still triggers change.
    if (fileInput.value) fileInput.value.value = "";
  }
}

const refresh = () => profileStore.loadProfile({ force: true });

onMounted(() => {
  // Loads the real profile (name, headline, bio, avatar) from /api/profile.
  profileStore.loadProfile();
  window.addEventListener("profile-updated", refresh);
});

onBeforeUnmount(() => {
  window.removeEventListener("profile-updated", refresh);
});
</script>
