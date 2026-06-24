<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @mousedown.self="handleCancel"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] max-h-[90vh] overflow-y-auto"
      @mousedown.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 class="text-2xl font-serif text-gray-900">Edit Profile</h2>
        <button
          type="button"
          class="text-gray-500 hover:text-gray-800"
          aria-label="Close"
          @click="handleCancel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="px-6 pt-4">
        <!-- Avatar -->
        <div class="flex items-center gap-4 mb-6">
          <div class="relative shrink-0">
            <img
              :src="form.avatar"
              alt="Avatar preview"
              class="w-16 h-16 rounded-full object-cover bg-gray-200"
            />
            <div class="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9a2 2 0 0 1 2-2h2l1.5-2h7L17 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
          </div>

          <div class="flex items-center gap-4 text-sm">
            <button type="button" class="text-indigo-600 font-semibold hover:text-indigo-700" @click="triggerFilePicker">
              Change Photo
            </button>
            <button type="button" class="text-gray-500 hover:text-gray-700" @click="removePhoto">
              Remove
            </button>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
          />
        </div>

        <!-- Name -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <!-- Headline -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Headline</label>
          <input
            v-model="form.headline"
            type="text"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <p class="text-xs text-gray-400 mt-1.5">Shown under your name on your profile card</p>
        </div>

        <!-- Short Bio -->
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Short Bio</label>
          <textarea
            v-model="form.bio"
            maxlength="150"
            rows="3"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
          ></textarea>
          <p class="text-xs text-gray-400 mt-1 text-right">{{ form.bio.length }}/150</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 mt-2">
        <button type="button" class="text-gray-600 font-medium text-sm hover:text-gray-800" @click="handleCancel">
          Cancel
        </button>
        <button type="button" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700" @click="handleSave">
          save change
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'
import { profileStore } from '../../state/profileStore'
import { updatePersonalInfo } from '../../services/api'
const emit = defineEmits(['close'])

const fileInput = ref(null)

// Local draft, copied from the live store the moment this component
// mounts. Because the parent renders this modal with v-if, a fresh
// copy is made on every open and silently thrown away on close —
// that's what gives us "discard unsaved changes" and "saved values
// remain on reopen" for free, with no extra bookkeeping.
const form = reactive({
  name: profileStore.profile.name,
  headline: profileStore.profile.headline,
  bio: profileStore.profile.bio,
  avatar: profileStore.profile.avatar,
})

// Tracks a blob URL created by the file picker that hasn't been
// committed to the store yet, so it can be released if the user
// cancels instead of saving.
let pendingObjectUrl = null

function triggerFilePicker() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl)
  const url = URL.createObjectURL(file)
  pendingObjectUrl = url
  form.avatar = url
}

function removePhoto() {
  if (pendingObjectUrl) {
    URL.revokeObjectURL(pendingObjectUrl)
    pendingObjectUrl = null
  }
  form.avatar = profileStore.defaultAvatar
}
const handleSave = async () => {
  try {
    await updatePersonalInfo({
      fullName: form.name,
      currentRole: form.headline,
      shortBio: form.bio,
    })

    profileStore.updateProfile({
      name: form.name,
      headline: form.headline,
      bio: form.bio,
      avatar: form.avatar,
    })

    window.dispatchEvent(
      new CustomEvent('profile-updated')
    )

    pendingObjectUrl = null
    emit('close')
  } catch (err) {
    console.error(err)
  }
}

function handleCancel() {
  if (pendingObjectUrl) {
    URL.revokeObjectURL(pendingObjectUrl)
    pendingObjectUrl = null
  }
  emit('close')
}

onBeforeUnmount(() => {
  if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl)
})
</script>
