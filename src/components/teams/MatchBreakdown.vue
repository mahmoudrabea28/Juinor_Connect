<template>
  <div class="bd">
    <p class="bd-label">AI MATCH SCORE</p>
    <p class="bd-score"><span class="bd-num">{{ score }}</span><span class="bd-pct">%</span></p>
    <div class="bd-line"></div>
    <p class="bd-label">COMPATIBILITY BREAKDOWN</p>
    <div class="bd-bars">
      <div v-for="b in bars" :key="b.label" class="bd-row">
        <span class="bd-bar-label">{{ b.label }}</span>
        <div class="bd-track">
          <div class="bd-fill" :style="{width: b.value+'%'}"></div>
        </div>
        <span class="bd-val">{{ b.value }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ score: { type: Number, default: 0 } })
const bars = computed(() => {
  const s = props.score || 0
  return [
    { label: 'Skills Match', value: Math.min(100, s + 3) },
    { label: 'Availability Match', value: Math.max(60, s - 4) },
    { label: 'Experience Match', value: Math.max(60, s - 2) },
    { label: 'Preferences Match', value: Math.max(60, s - 1) },
  ]
})
</script>

<style scoped>
.bd{background:#fff;border-radius:8px;padding:20px;display:flex;flex-direction:column;gap:12px;height:100%}
.bd-label{font-size:14px;color:#6D717F;letter-spacing:.5px;margin:0}
.bd-score{font-size:32px;font-weight:500;margin:0;line-height:1}
.bd-num{font-weight:500}
.bd-pct{font-size:16px;font-weight:300}
.bd-line{height:1px;background:#E5E7EA}
.bd-bars{display:flex;flex-direction:column;gap:10px}
.bd-row{display:flex;flex-direction:column;gap:4px}
.bd-bar-label{font-size:14px;color:#131927}
.bd-track{height:8px;border-radius:8px;background:#EDEFFE;overflow:hidden;flex:1}
.bd-fill{height:100%;background:#4E61F6;border-radius:8px;transition:width .6s ease}
.bd-val{font-size:14px;color:#131927;text-align:right;margin-top:2px}
.bd-row{display:flex;flex-wrap:wrap;gap:4px}
.bd-bar-label{width:100%}
.bd-track{flex:1;min-width:0}
.bd-val{width:40px;flex-shrink:0}
.bd-row{flex-direction:row;flex-wrap:wrap;align-items:center}
.bd-bar-label{width:100%;margin-bottom:2px}
</style>
