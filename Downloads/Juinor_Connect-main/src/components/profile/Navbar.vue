<template>
  <header class="h-[73px] w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
    <!-- Logo -->
    <div class="flex items-center gap-2.5">
      
     <img id="Logo2" src="../../assets/images/Logo.png" alt="Logo">
    </div>
    

    <!-- Center nav -->
    <nav class="hidden md:flex items-center gap-9 text-gray-700 text-[15px]">
      <a v-for="item in navItems" :key="item" href="#" class="hover:text-indigo-600 transition-colors">{{ item }}</a>
    </nav>

    <!-- Right side -->
    <div class="flex items-center gap-4">
      <button class="text-indigo-400 hover:text-indigo-600" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      <div class="w-px h-8 bg-gray-200"></div>

      <div class="flex items-center gap-2.5">
        <div class="text-right leading-tight">
          <p class="text-sm font-semibold text-gray-900 m-0">Alex C.</p>
          <p class="text-xs text-gray-400 m-0">UI/UX Developer</p>
        </div>
        <div class="w-9 h-9 rounded-full border border-indigo-300 flex items-center justify-center text-indigo-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const navItems = ['Home', 'Teams', 'Projects', 'Dashboard', 'Help center']
</script>
<style>

#Logo2{
  height: 50px;
  width: auto;
  object-fit: contain;
  display: block;
  max-height: 100%;
  transform: translateX(60px);

}

</style>
