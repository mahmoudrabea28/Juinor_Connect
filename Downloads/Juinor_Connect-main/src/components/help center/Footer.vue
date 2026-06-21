<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <router-link to="/help-center" class="logo">
           <img src="../../assets/images/Logo.png" alt="Logo" class="logo-img"/>
        </router-link>
        <p class="footer-desc">
          Digital playground for ambitious students. Built by juniors, for juniors
        </p>
      </div>

      <div class="footer-col">
        <h4>Build</h4>
        <ul>
          <li>Projects</li>
          <li>Open source</li>
          <li>Teammate finder</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Learn</h4>
        <ul>
          <li>Workshops</li>
          <li>Mentors</li>
          <li>Study circles</li>
          <li>Newsletter</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Help center</h4>
        <ul>
          <li v-for="item in helpCenterLinks" :key="item.path">
            <router-link :to="item.path" class="footer-link">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>

       <img src="../../assets/images/Fotter img.png" alt="Logo" class="footer-img"/>
    </div>

    <div class="footer-bottom">
      © Copyright Junior Connect 2026. All rights reserved
    </div>
  </footer>
</template>

<script setup>
import '../../assets/images/main.css'
const helpCenterLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Guides', path: '/guides' },
  { label: 'Support', path: '/support' },
  { label: 'Feedback', path: '/feedback' },
  { label: 'Terms & Policies', path: '/terms' },
]
</script>

<style scoped>
.footer-img {
  height: 140px; 
  width: auto;
}

.footer {
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 24px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  gap: 24px;
  align-items: start;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
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

.footer-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  max-width: 200px;
  line-height: 1.5;
}

.footer-col h4 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
}

.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-col li {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.footer-link {
  font-size: 12px;
  color: var(--color-text-secondary);
  opacity: 0.85;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.footer-link:hover {
  color: var(--color-text);
  opacity: 1;
}

.footer-link.router-link-active {
  opacity: 1;
  color: var(--color-text);
}

.footer-illustration {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.footer-illustration svg {
  width: 130px;
  height: 100px;
}

.footer-bottom {
  text-align: center;
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 16px 0 24px;
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: repeat(2, 1fr);
    padding: 28px 18px 16px;
  }

  .footer-illustration {
    grid-column: span 2;
    justify-content: center;
  }
}
</style>
