<template>
  <div class="flex flex-col min-h-screen bg-[#eef0f9]">
    <Navbar />
    <div class="layout-shell flex flex-col lg:flex-row flex-1 gap-4 lg:gap-6 py-5 lg:py-8">
      <Sidebar />
      <main class="flex-1 min-w-0">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
// Shared shell for every dashboard page: the navbar and sidebar are
// rendered once here, and only the routed page content underneath
// (<router-view />) swaps when navigating between sidebar items.
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/profile/Sidebar.vue'
</script>

<style scoped>
/* Match the navbar's inner container exactly so the sidebar + content
   start and end on the same gridlines as the navbar's logo and Logout. */
.layout-shell {
  width: min(1280px, 100% - 32px);
  margin-inline: auto;
}
@media (min-width: 1024px) {
  .layout-shell {
    width: min(1280px, 100% - 48px);
  }
}
</style>