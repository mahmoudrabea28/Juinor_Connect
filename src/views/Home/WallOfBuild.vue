<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { buildImages } from '../../assets/images.js'
import VanillaTilt from 'vanilla-tilt' // تأكدي من تثبيتها عبر npm install vanilla-tilt

// --- الحالات الخاصة بجزء الـ Hero ---
const entered = ref(false)

// --- الحالات الخاصة بجزء الـ Wall ---
const revealed = ref(false)
const root = ref(null)
let observer = null

const builds = [
  {
    bg: '#9eedfb',
    image: buildImages.sunpath,
    tag: 'Climate · Web',
    title: 'SunPath',
    badge: 'N',
    desc: 'A solar calculator for rooftops in 60 seconds',
    meta1: '1st place',
    meta2: 'By nora, 17',
  },
  {
    bg: '#e3d7fb',
    image: buildImages.tutorly,
    tag: 'AI · Education',
    title: 'Tutorly',
    badge: 'A',
    desc: 'AI study that actually explains your code',
    meta1: 'Top of the week',
    meta2: 'by Aman + crew, 19',
  },
  {
    bg: '#ffdc3a',
    image: buildImages.pixelio,
    tag: 'Game · Open source',
    title: 'Pixel.io',
    badge: 'M',
    desc: 'Tiny multiplayer pixel arena',
    meta1: '100★ on GitHub',
    meta2: 'by Mai, 16',
  },
]

// تفعيل تأثير حركة الكروت ثلاثية الأبعاد
const initTiltEffect = () => {
  if (window.innerWidth > 768) {
    const cardElements = document.querySelectorAll('.wall__grid > *')
    VanillaTilt.init(cardElements, {
      max: 10,      
      speed: 400,      
      glare: true,      
      "max-glare": 0.1, 
    })
  }
}

onMounted(() => {
  // تفعيل أنيميشن الـ Hero عند تحميل الصفحة
  requestAnimationFrame(() => requestAnimationFrame(() => (entered.value = true)))

  // مراقبة ظهور الـ Wall لتشغيل أنيميشن الدخول والـ Tilt
  if (!('IntersectionObserver' in window)) {
    revealed.value = true
    nextTick(() => initTiltEffect())
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true
        nextTick(() => initTiltEffect())
        observer.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  const cardElements = document.querySelectorAll('.wall__grid > *')
  cardElements.forEach(el => el.vanillaTilt?.destroy())
})
</script>

<template>
  <div class="page-container">
    <section class="hero" :class="{ entered }">
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

    <section class="wall" ref="root">
      <div class="wall__inner">
        <header class="wall__head">
          <p class="eyebrow">-Wall of builds-</p>
          <div class="wall__titlerow">
            <h2 class="wall__title">
              <span>Stuff our crew</span>
              <span class="grad">actually shipped</span>
            </h2>
            <a class="browse" href="#">
              Browse all 8,000+ projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </header>

        <div class="wall__grid">
          <article
            v-for="(b, i) in builds"
            :key="b.title"
            class="card tilt-card-target"
            :class="{ revealed }"
            :style="{ background: b.bg, transitionDelay: (i * 120) + 'ms' }"
          >
            <div class="card__media" :style="{ backgroundImage: `url(${b.image})` }" />

            <div class="card__body">
              <div class="card__head">
                <div class="card__titleblock">
                  <span class="card__tag">{{ b.tag }}</span>
                  <h3 class="card__title">{{ b.title }}</h3>
                </div>
                <span class="card__badge">{{ b.badge }}</span>
              </div>

              <p class="card__desc">{{ b.desc }}</p>

              <div class="card__meta">
                <span>{{ b.meta1 }}</span>
                <span>{{ b.meta2 }}</span>
              </div>

              <button class="card__open" type="button">
                Open
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  background: #fefefe;
}

/* ==========================================================================
   تنسيقات جزء الـ Hero
   ========================================================================== */
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

.quote {
  margin: 88px auto 0;
  max-width: 928px;
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

/* ==========================================================================
   تنسيقات جزء الـ Wall وجدار المشاريع
   ========================================================================== */
.wall {
  width: 100%;
  background: #fefefe;
  padding: 8px 0 80px;
}

.wall__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px; 
}

.wall__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.eyebrow {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #2563eb;
}

.wall__titlerow {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.wall__title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 40px;
  line-height: 1.25; 
  color: #000;
  padding-bottom: 4px; 
}

.grad {
  background: linear-gradient(90deg, #2563eb 0%, #00c0e8 69%, #8a38f5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.browse {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #4e61f6;
  text-decoration: underline;
  white-space: nowrap;
}
.browse:hover {
  color: #1651d2;
}

.wall__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px; 
  perspective: 1000px;
}

/* ==========================================================================
   تنسيقات كروت المشاريع (Cards)
   ========================================================================== */
.tilt-card-target {
  cursor: pointer;
  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.1s ease, box-shadow 0.3s ease;
}

.card {
  border: 1px solid #000;
  border-radius: 12px;
  padding: 13px 21px 16px 19px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s ease;
}

.card.revealed {
  opacity: 1;
  transform: translateY(0);
}

.tilt-card-target:hover {
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.12);
}

.card__media {
  height: 163px;
  border-radius: 12px;
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.card__titleblock {
  display: flex;
  flex-direction: column;
}

.card__tag {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #6d717f;
}

.card__title {
  margin: 0;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  color: #000;
}

.card__badge {
  flex-shrink: 0;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__desc {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #6d717f;
}

.card__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #6d717f;
}

.card__open {
  margin-top: 4px;
  align-self: flex-start;
  width: 96px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #2563eb;
  border: 3px solid #aeb6fb;
  border-radius: 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    filter 0.18s ease;
}
.card__open:hover {
  filter: brightness(1.08);
}
.card__open:active {
  transform: scale(0.96);
}

/* ==========================================================================
   شاشات العرض والتجاوب (Responsive)
   ========================================================================== */
@media (max-width: 1024px) {
  .hero__inner {
    padding: 64px 56px 80px;
  }
  .quote {
    margin-top: 64px;
  }
  .wall__inner {
    padding: 0 32px;
  }
  .wall__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero__inner {
    padding: 40px 24px 64px;
  }
  .quote {
    margin-top: 44px;
  }
  .wall__inner {
    padding: 0 20px;
  }
  .wall__grid {
    grid-template-columns: 1fr;
  }
  .wall__title {
    font-size: 32px;
    line-height: 1.3;
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
  .card,
  .card.revealed {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.3s ease;
  }
}
</style>