<script setup>
import { ref, onMounted } from 'vue'

const entered = ref(false)

onMounted(() => {
  requestAnimationFrame(() => requestAnimationFrame(() => (entered.value = true)))
})
</script>

<template>
  <section class="hero" :class="{ entered }">
    <!-- soft blue blob: wavy top edge, flat bottom (Vector 1) -->
    <svg
      class="hero__blob"
      viewBox="0 0 1440 616"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C130,30 280,26 440,42 C600,58 690,60 850,50 C1010,40 1110,12 1260,18 C1340,21 1400,40 1440,50 L1440,616 L0,616 Z"
        fill="#DEE8FC"
      />
    </svg>

    <div class="hero__inner">
      <span class="pill">·From the founders</span>

      <p class="quote">
        We started Junior Connect because we were tired of waiting to be
        "senior enough" to build cool things. You don't need a degree. You don't
        need permission. You need people who believe in your weird ideas and a
        weekend to make them real
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  background: #fefefe;
  overflow: hidden;
  padding-bottom: 24px;
}

.hero__blob {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  transform: translateY(-14px);
  transition:
    opacity 0.9s ease,
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero.entered .hero__blob {
  opacity: 1;
  transform: translateY(0);
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 120px 96px;
}

/* pill — Foundation/Blue/Main, top-left, drops in */
.pill {
  display: inline-block;
  background: #2563eb;
  color: #000;
  border: 1px solid #000;
  border-radius: 50px;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  box-shadow: 0 4px 3.65px rgba(0, 0, 0, 0.9);
  opacity: 0;
  transform: translateY(-22px);
  transition:
    opacity 0.5s ease,
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: 0.08s;
}
.hero.entered .pill {
  opacity: 1;
  transform: translateY(0);
}

/* quote — Montaga 48 / 58, centered, fades up */
.quote {
  margin: 88px auto 0;
  max-width: 928px;
  font-family: 'Montaga', Georgia, serif;
  font-size: clamp(28px, 3.6vw, 48px);
  line-height: 1.21;
  text-align: center;
  color: #000;
  word-break: break-word;
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.9s ease,
    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.22s;
}
.hero.entered .quote {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .hero__inner {
    padding: 64px 56px 80px;
  }
  .quote {
    margin-top: 64px;
  }
}

@media (max-width: 640px) {
  .hero__inner {
    padding: 40px 24px 64px;
  }
  .quote {
    margin-top: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__blob,
  .pill,
  .quote {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
