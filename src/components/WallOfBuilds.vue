<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BuildCard from './BuildCard.vue'
import { buildImages } from '../assets/images.js'

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

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    revealed.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
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
        <BuildCard
          v-for="(b, i) in builds"
          :key="b.title"
          v-bind="b"
          :revealed="revealed"
          :delay="i * 120"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.wall {
  width: 100%;
  background: #fefefe;
  padding: 8px 0 80px;
}

.wall__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 120px;
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
  font-family: 'Montaga', Georgia, serif;
  font-weight: 400;
  font-size: 40px;
  line-height: 35px;
  color: #000;
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

.wall__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1024px) {
  .wall__inner {
    padding: 0 56px;
  }
  .wall__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .wall__inner {
    padding: 0 24px;
  }
  .wall__grid {
    grid-template-columns: 1fr;
  }
  .wall__title {
    font-size: 32px;
  }
}
</style>
