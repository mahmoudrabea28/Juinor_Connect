<template>
  <div class="border-2 border-dashed border-indigo-300 rounded-2xl bg-white p-8">
    <!-- Row 1: Full Name / Current Role -->
    <div class="grid grid-cols-2 gap-x-8 gap-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
        <input
          v-model="form.fullName"
          type="text"
          placeholder="Enter Your Full Name"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-800 mb-2">Current Role</label>
        <input
          v-model="form.role"
          type="text"
          placeholder="Enter Your Current Role"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </div>

    <!-- Row 2: Bio -->
    <div class="mt-6">
      <label class="block text-sm font-medium text-gray-800 mb-2">Bio</label>
      <textarea
        v-model="form.bio"
        rows="5"
        placeholder="Write About You"
        class="w-full h-[150px] bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
      ></textarea>
    </div>

    <!-- Row 3: Github / LinkedIn -->
    <div class="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
      <div>
        <label class="block text-sm font-medium text-gray-800 mb-2">Github</label>
        <div class="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M10.5 13.5a3 3 0 0 0 4 .2l3-3a3 3 0 0 0-4.2-4.2l-1.2 1.1" />
            <path d="M13.5 10.5a3 3 0 0 0-4-.2l-3 3a3 3 0 0 0 4.2 4.2l1.1-1.2" />
          </svg>
          <input
            v-model="form.github"
            type="text"
            placeholder="https://github.com/alexmorgan"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-800 mb-2">Linked In</label>
        <div class="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M10.5 13.5a3 3 0 0 0 4 .2l3-3a3 3 0 0 0-4.2-4.2l-1.2 1.1" />
            <path d="M13.5 10.5a3 3 0 0 0-4-.2l-3 3a3 3 0 0 0 4.2 4.2l1.1-1.2" />
          </svg>
          <input
            v-model="form.linkedin"
            type="text"
            placeholder="https://linkedin.com/in/alexmorgan"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Row 4: Location -->
    <div class="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
      <div>
        <label class="block text-sm font-medium text-gray-800 mb-2">Location</label>
        <div class="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <input
            v-model="form.location"
            type="text"
            placeholder="City, Country"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
      <div></div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mt-10">
      <button type="button" class="text-indigo-600 font-medium text-sm hover:text-indigo-700" @click="handleDiscard">
        Discard change
      </button>
      <button type="button" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2" @click="handleSave">
        Save changes
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getOnboardingProfile, updatePersonalInfo } from '../../services/api'
import { profileStore } from '../../state/profileStore'
import { toast } from '../../state/toastStore'

// Local draft, seeded from whatever is currently saved in the store.
// Typing only edits this draft; nothing reaches the store until Save
// is pressed, which is what makes "Discard restores previous values"
// work — it just copies the saved values back over the draft.
const form = reactive({ ...profileStore.personalInfo })
const loadProfile = async () => {
  try {
    const data = await getOnboardingProfile()

    Object.assign(form, {
      fullName: data.profile?.fullName || '',
      role: data.profile?.currentRole || '',
      // النبذة بقت في حقل bio الموحّد (مع دعم القديم shortBio).
      bio: data.profile?.bio || data.profile?.shortBio || '',
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(loadProfile)
const handleSave = async () => {
  try {
    const payload = {
      fullName: form.fullName,
      currentRole: form.role,
      shortBio: form.bio,
    }

    if (form.github?.trim()) {
      payload.github = form.github
    }

    if (form.linkedin?.trim()) {
      payload.linkedin = form.linkedin
    }

    if (form.location?.trim()) {
      payload.location = form.location
    }

    await updatePersonalInfo(payload)

    window.dispatchEvent(
      new CustomEvent('profile-updated')
    )

    toast.success('Profile updated')
  } catch (err) {
    console.error(err)
    toast.error(err.message || "Couldn't update your profile")
  }
}

const handleDiscard = () => {
  loadProfile()
}
</script>
