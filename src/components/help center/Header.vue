<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/help-center" class="logo">
         <img src="../../assets/images/Logo.png" alt="Logo" class="logo-img"/>

      
      </router-link>

      <nav class="nav">
        <router-link to="/help-center" class="nav-link">Help Center</router-link>
        <router-link to="/faq" class="nav-link">FAQ</router-link>
        <router-link to="/guides" class="nav-link">Guides</router-link>
        <router-link to="/support" class="nav-link">Support</router-link>
        <router-link to="/feedback" class="nav-link">Feedback</router-link>
        <router-link to="/terms" class="nav-link">Terms &amp; Policies</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import '../../assets/images/main.css'
</script>

<style scoped>
.logo-img {
  height: 45px; /* or any suitable size */
  width: auto;
}
.header {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 28px;
  height: 22px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-junior {
  font-weight: 700;
  font-size: 15px;
  color: var(--color-text);
}

.logo-connect {
  font-weight: 700;
  font-size: 11px;
  color: var(--color-primary);
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-weight: 500;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link.router-link-active {
  color: var(--color-text);
  font-weight: 700;
  border-bottom-color: var(--color-text);
}

@media (max-width: 900px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
  }

  .nav {
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>
