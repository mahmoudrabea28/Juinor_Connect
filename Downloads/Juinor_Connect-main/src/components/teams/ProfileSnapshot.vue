<template>
  <div class="snapshot" v-if="profile">
    <div class="snap-avatar">{{ initials }}</div>
    <div class="snap-body">
      <div class="snap-top">
        <span class="snap-title">Your profile snapshot</span>
        <span class="snap-ai">✦ Used by AI to generate recommendations</span>
      </div>
      <div class="snap-details">
        <span>• Role <strong>{{ profile.currentRole || '—' }}</strong></span>
        <span>• Level <strong>{{ profile.experienceLevel || '—' }}</strong></span>
        <span>• Availability <strong>{{ avail }}</strong></span>
        <span>• Interests <strong>{{ ints }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ profile: Object })
const initials = computed(() => props.profile?.fullName?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() || '?')
const avail = computed(() => {
  const m = { 'less_than_5':'<5h/w', '5-10':'5-10h/w', '10-20':'10-20h/w', 'more_than_20':'20+h/w' }
  return m[props.profile?.timeCommitment] || '—'
})
const ints = computed(() => (props.profile?.interests||[]).slice(0,3).join(' · ') || '—')
</script>

<style scoped>
.snapshot{display:flex;gap:16px;align-items:center;padding:16px;background:#fff;border-radius:12px;box-shadow:0 6px 12px -6px rgba(19,25,39,.12),0 8px 24px -4px rgba(19,25,39,.08);margin-bottom:24px}
.snap-avatar{width:56px;height:56px;border-radius:50%;background:#4E61F6;color:#fff;font-weight:700;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.snap-body{flex:1;display:flex;flex-direction:column;gap:4px}
.snap-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.snap-title{font-weight:600;font-size:16px}
.snap-ai{font-size:10px;font-weight:500;background:#BBCFF9;color:#4E61F6;padding:2px 8px;border-radius:12px}
.snap-details{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:14px;color:#131927}
</style>
