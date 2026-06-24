<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  activeNav: {
    type: String,
    default: 'dashboard',
    validator: (value) => ['dashboard', 'projects'].includes(value)
  }
})
</script>

<template>
  <header class="bg-white border-b border-gray-100 shadow-shadow-1 sticky top-0 z-50">
    <div class="px-main-margin-x flex items-center justify-between h-16">

      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-main flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <span class="font-montaga text-xl tracking-tight text-text-black">Junior<span class="text-main">Connect</span></span>
      </RouterLink>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-8 font-inter text-sm font-medium">
        <RouterLink
          to="/"
          :class="activeNav === 'dashboard' ? 'text-main border-b-2 border-main pb-0.5' : 'text-text-gray hover:text-text-black transition-colors'"
        >Dashboard</RouterLink>
        <RouterLink
          to="/projects"
          :class="activeNav === 'projects' ? 'text-main border-b-2 border-main pb-0.5' : 'text-text-gray hover:text-text-black transition-colors'"
        >Projects</RouterLink>
        <a href="#" class="text-text-gray hover:text-text-black transition-colors">Tasks</a>
        <a href="#" class="text-text-gray hover:text-text-black transition-colors">Team</a>
        <a href="#" class="text-text-gray hover:text-text-black transition-colors">Reports</a>
      </nav>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <button class="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-text-gray hover:bg-[#E2E8F0] transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <button class="relative w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-text-gray hover:bg-[#E2E8F0] transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D668FC] rounded-full ring-2 ring-white"></span>
        </button>
        <div class="w-9 h-9 rounded-full bg-main flex items-center justify-center text-white text-xs font-semibold font-inter cursor-pointer ring-2 ring-[#BBCFF9]">
          AX
        </div>
      </div>

    </div>
  </header>
</template>
