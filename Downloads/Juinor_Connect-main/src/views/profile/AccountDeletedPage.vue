<template>
  <!-- Full-screen light-gray background, no navbar or sidebar -->
  <div class="min-h-screen bg-[#dde1ea] flex items-center justify-center px-4 py-12">

    <!-- Centered white card -->
    <div class="bg-white rounded-3xl shadow-lg w-full max-w-[380px] px-10 py-10 text-center">

     <!-- Logo -->
    <div class="flex items-center gap-2.5">
      
     <img id="Logo" src="../../assets/images/Logo.png" alt="Logo">
    </div>

      <!-- Title -->
      <h1 class="text-[22px] font-serif text-gray-900 leading-snug">Your account has been deleted</h1>

      <!-- Subtitle -->
      <p class="text-sm text-gray-500 mt-2">We're sorry to see you go, Alex.</p>

      <!-- Description -->
      <p class="text-sm text-gray-400 mt-3 leading-relaxed">
        Your account and all associated data have been permanently removed from Junior Connect.
      </p>

      <!-- Divider -->
      <hr class="border-gray-200 my-6" />

      <!-- What happens next -->
      <p class="text-xs font-semibold tracking-widest text-gray-500 uppercase text-left mb-4">
        What happens next
      </p>

      <ul class="space-y-4 text-left">
        <li class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">A confirmation email has been sent to your inbox</span>
        </li>

        <li class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">Your data will be fully erased within 30 days</span>
        </li>

        <li class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">You can create a new account anytime</span>
        </li>
      </ul>

      <!-- Go Back to Home button -->
      <button
        type="button"
        class="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        @click="router.push('/profile')"
      >
        Go Back to Home
      </button>

      <!-- Contact Support — visual only, no click logic -->
      <p class="text-sm text-gray-500 mt-4">
        Changed your mind?
        <span class="text-indigo-500 underline cursor-default">Contact Support</span>
      </p>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style>

#Logo {
  height: 60px;
  width: auto;
  object-fit: contain;

  transform: translate(65px, -10px);
}
</style>
