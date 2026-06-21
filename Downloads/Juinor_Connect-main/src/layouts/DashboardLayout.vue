<template>
  <div class="flex flex-col min-h-screen bg-[#eef0f9]">
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
// Shared shell for every dashboard page: the navbar and sidebar are
// rendered once here, and only the routed page content underneath
// (<router-view />) swaps when navigating between sidebar items.
import Navbar from '../components/profile/Navbar.vue'
import Sidebar from '../components/profile/Sidebar.vue'
</script>
