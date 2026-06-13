<script setup>
defineProps({
  bg: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  badge: { type: String, required: true },
  desc: { type: String, required: true },
  meta1: { type: String, required: true },
  meta2: { type: String, required: true },
  revealed: { type: Boolean, default: false },
  delay: { type: Number, default: 0 },
})
</script>

<template>
  <article
    class="card"
    :class="{ revealed }"
    :style="{ background: bg, transitionDelay: delay + 'ms' }"
  >
    <div class="card__media" :style="{ backgroundImage: `url(${image})` }" />

    <div class="card__body">
      <div class="card__head">
        <div class="card__titleblock">
          <span class="card__tag">{{ tag }}</span>
          <h3 class="card__title">{{ title }}</h3>
        </div>
        <span class="card__badge">{{ badge }}</span>
      </div>

      <p class="card__desc">{{ desc }}</p>

      <div class="card__meta">
        <span>{{ meta1 }}</span>
        <span>{{ meta2 }}</span>
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
</template>

<style scoped>
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
.card:hover {
  box-shadow: 0 18px 36px -16px rgba(20, 30, 60, 0.4);
  transform: translateY(-6px);
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
  font-family: 'Montaga', Georgia, serif;
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
  font-family: 'Montaga', Georgia, serif;
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

@media (prefers-reduced-motion: reduce) {
  .card,
  .card.revealed {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.3s ease;
  }
  .card:hover {
    transform: none;
  }
}
</style>
