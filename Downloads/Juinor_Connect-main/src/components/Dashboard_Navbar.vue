<template>
  <div class="dashboard-container">
    
   <aside class="sidebar">
  <div class="logo-area">
    <img src="../assets/images/Logo.png" alt="Junior Connect Logo" class="logo-icon">
  </div>

  <ul class="menu-list">
    <li
      v-for="(item, index) in menuItems"
      :key="index"
      class="menu-item"
      :class="{ active: activeMenu === index }"
    >
      <router-link :to="item.link">
        <div class="menu-link-content">
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          {{ item.name }}
        </div>

        <span class="material-symbols-outlined chevron-icon">
          chevron_right
        </span>
      </router-link>
    </li>
  </ul>
</aside>

    <div class="main-layout">
      
      <header class="main-header">
          <button class="back-btn" @click="goBack">
    <span class="material-symbols-outlined">arrow_back</span>
  </button>
        <div class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="onSearch" 
            placeholder="Search tasks..."
          >
        </div>
        
        <div class="header-profile">
          <button class="notification-btn" @click="handleNotification">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          
          <div class="profile-card" @click="toggleProfileMenu">
            <div class="profile-img-container">
              <img src="../assets/images/Avatar.png" :alt="user.name" class="profile-img">
              <span class="status-dot" :class="{ online: user.isOnline }"></span>
            </div>
            <span class="profile-name">{{ user.name }}</span>
            <span class="material-symbols-outlined expand-icon">expand_more</span>
          </div>
        </div>
      </header>

      <main class="content-body">
        <slot></slot>
      </main>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',

  data() {
    return {
      searchQuery: '',

      user: {
        name: 'Ahmed',
        isOnline: true
      },

      menuItems: [
        { name: 'Dashboard', icon: 'dashboard', link: '/Overview' },
        { name: 'Browse Teams', icon: 'groups', link: '/browse-teams' },
        { name: 'My Projects', icon: 'folder_open', link: '/projects' },
        { name: 'AI Mentor', icon: 'psychology', link: '/AI_Mentor' }
      ]
    }
  },

  computed: {
    activeMenu() {
      const currentPath = this.$route.path

      const index = this.menuItems.findIndex(
        item =>
          currentPath === item.link ||
          currentPath.startsWith(item.link + '/')
      )

      return index !== -1 ? index : 0
    }
  },

  methods: {
    onSearch() {
      this.$emit('search-tasks', this.searchQuery)
    },

    handleNotification() {
      console.log('تم فتح الإشعارات')
    },

    goBack() {
      this.$router.back()
    },

    toggleProfileMenu() {
      console.log('تنقّل في قائمة الملف الشخصي')
    }
  }
}
</script>
<style scoped>
.dashboard-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f8fafc;
}

.main-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.content-body {
  flex: 1;
  overflow-y: auto;
  background-color: #fdfdfd;
  padding: 35px;
}

/* --- تنسيقات الـ Sidebar --- */
.sidebar {
  width: 260px;
  min-width: 260px;
  background-color: #E2E8F0;
  border-right: 1px solid rgba(26, 27, 35, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  z-index: 10;
}

.logo-area {
  margin-bottom: 20px;
}

.logo-icon {
  display: block; 
  margin: 0 auto; 
  width: 150px;
}

.menu-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  margin: 0;
}

.menu-item a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  color: #131927;
  text-decoration: none;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.menu-item .chevron-icon {
  font-size: 18px;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.menu-item.active a {
  background-color: #4E61F6;
  color: white;
}


.menu-link-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-item a:hover:not(.active a) {
  background-color: #F2F3FF;
  color: #4E61F6;
}

.menu-item a:hover .chevron-icon {
  opacity: 1;
  transform: translateX(0);
  color: #4E61F6;
}

/* --- Header --- */
.main-header {
  height: 80px;
  min-height: 80px;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(26, 27, 35, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 10;
  box-sizing: border-box;
}
.back-btn {
  background-color: #F2F3FF;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #e0e7ff;
  color: #4E61F6;
}
.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
  margin-left: -45%;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background-color: #F2F3FF; 
  outline: none;
  font-size: 14px;
  color: #0f172a;
  box-sizing: border-box;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.search-box .material-symbols-outlined {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 20px;
}

.header-profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-btn {
  background-color: #F2F3FF;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-btn:hover {
  background-color: #e0e7ff;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 14px 6px 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  cursor: pointer;
  height: 44px;
  box-sizing: border-box;
}

.profile-img-container {
  position: relative;
  display: flex;
  align-items: center;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #cbd5e1;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background-color: #cbd5e1;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.status-dot.online {
  background-color: #22c55e;
}

.profile-name {
  font-weight: 500;
  font-size: 14px;
  color: #0f172a;
}

.expand-icon {
  font-size: 20px;
  color: #64748b;
}
</style>