<script setup>
import Navbar from '../../components/Navbar.vue';
import HeroSection from './HeroSection.vue';
import WallOfBuild from './WallOfBuild.vue';
import WallSection from './WallSection.vue';
import Cook from './Cook.vue';
import InsideSection from './InsideSection.vue';
import MainLayout from './MainLayout.vue'; 
import CTA from './CTA.vue';
import Footer from '../../components/Footer.vue';



import { onMounted } from 'vue'
import Ideas from './Ideas.vue';

onMounted(() => {
  const sections = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        } else {
          entry.target.classList.remove('active')
        }

      })
    },
    {
      threshold: 0.2
    }
  )

  sections.forEach(section => observer.observe(section))
})
</script>

<template>
  <div class="page">
    <main>
      <Navbar />
     <div class="reveal-up">
       <HeroSection  />
     </div>
      <div class="reveal">
    <WallOfBuild />
  </div>
  <div class="reveal-right">
    <WallSection />
  </div>

  <div class="reveal-up">
    <Cook />
  </div>

  <div class="reveal-left">
    <Ideas />
  </div>

  <div class="reveal-right">
    <InsideSection />
  </div>

  <div >
    <MainLayout />
  </div>

  <div class="reveal-left">
    <CTA />
  </div>

  <div class="reveal-right">
    <Footer />
  </div>
    </main>
  </div>
</template>

<style>
.page {
  min-height: 100vh;
  position: relative;
  overflow-x: clip;
  /* Recreated background: soft gradient glow + subtle grid (from Figma) */
  background:
    radial-gradient(50% 40% at 5% 35%, rgba(78, 97, 246, 0.1) 0%, transparent 70%),
    radial-gradient(40% 35% at 97% 70%, rgba(0, 192, 232, 0.08) 0%, transparent 70%),
    radial-gradient(35% 30% at 70% 8%, rgba(138, 56, 245, 0.05) 0%, transparent 70%),
    linear-gradient(rgba(19, 25, 39, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 25, 39, 0.045) 1px, transparent 1px),
    var(--background);
  background-size:
    100% 100%,
    100% 100%,
    100% 100%,
    48px 48px,
    48px 48px,
    100% 100%;
}
/* ==========================================
   PREMIUM SAAS SCROLL REVEAL ANIMATIONS
========================================== */

.reveal-up,
.reveal-left,
.reveal-right {
  opacity: 0;
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(50px);
}

.reveal-left {
  transform: translateX(-50px);
}

.reveal-right {
  transform: translateX(50px);
}

.reveal-up.active,
.reveal-left.active,
.reveal-right.active {
  opacity: 1;
  transform: translate(0, 0);
}
/* ==========================================
   STAGGER CARDS
========================================== */

.active .card,
.active .feature-card,
.active .feature-item-card,
.active .item,
.active .box {
  animation: cardReveal .8s cubic-bezier(.16,1,.3,1) both;
}

.active .card:nth-child(1),
.active .feature-card:nth-child(1),
.active .feature-item-card:nth-child(1) {
  animation-delay: .1s;
}

.active .card:nth-child(2),
.active .feature-card:nth-child(2),
.active .feature-item-card:nth-child(2) {
  animation-delay: .2s;
}

.active .card:nth-child(3),
.active .feature-card:nth-child(3),
.active .feature-item-card:nth-child(3) {
  animation-delay: .3s;
}

.active .card:nth-child(4),
.active .feature-card:nth-child(4),
.active .feature-item-card:nth-child(4) {
  animation-delay: .4s;
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==========================================
   FLOATING EFFECT
========================================== */

.dashboard-image,
.hero-image,
.mockup-image,
.illustration {
  animation: floatAnimation 6s ease-in-out infinite;
}

@keyframes floatAnimation {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-12px);
  }
}
</style>
