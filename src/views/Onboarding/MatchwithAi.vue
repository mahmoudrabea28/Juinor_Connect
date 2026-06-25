<template>
  <div class="page-wrapper">
     <div class="solid-dot solid-dot--top-right"></div>
    <div class="solid-dot solid-dot--bottom-left"></div>

    <div class="logo-wrapper">
      <img src="../../assets/images/Logo.png" height="70px" style="margin-bottom: 10px;">
    </div>

    <section class="card">
      <h1 class="title">Find Your Perfect Team</h1>
      <p class="subtitle">
        Our AI is analyzing your profile, skills, interests, and <br>
        collaboration style to recommend the most compatible teams.
      </p>

      <div class="mascot-wrap">
        <div class="mascot-glow"></div>
        <div class="ring"></div>
        <div class="ring r2"></div>
        <div class="ring r3"></div>
        
        <img src="../../assets/images//AI hiring assistant mascot.png" alt="AI Robot" class="mascot-img" />

        <div class="orbit">
          <div class="orbit-badge t"><i class="fas fa-cog"></i></div>
          <div class="orbit-badge r"><i class="fas fa-comment-dots"></i></div>
          <div class="orbit-badge b"><i class="fas fa-bell"></i></div>
          <div class="orbit-badge l"><i class="fas fa-wrench"></i></div>
        </div>
      </div>

      <div class="checklist">
        <div v-for="(item, index) in checklist" :key="index" class="check-item" :style="{ animationDelay: (0.5 + index * 0.4) + 's' }">
          <i class="fas fa-check"></i>
          <span>{{ item }}</span>
        </div>
      </div>

             <button class="cta-button" @click="handleViewMatches" :disabled="loading">
               <span v-if="loading" class="spinner-sm"></span>
               {{ loading ? progressMsg : 'View My Matches' }}
             </button>
             <p v-if="errorMsg" style="color:#ef4444;margin-top:12px;font-size:14px;text-align:center">{{ errorMsg }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { generateProfile, generateIdeas } from '../../services/api';

const router = useRouter();
const loading = ref(false);
const errorMsg = ref('');
const progressMsg = ref('Generating...');

const checklist = [
  'Skills Analyzed', 'Interests Matched', 'Personality Evaluated', 'Availability Checked'
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The AI endpoints are rate-limited to one request every 5 seconds on the
// server. Firing both with Promise.all made the second one fail instantly
// with 429. So we run them one after another, and if we still hit the
// cooldown we wait the requested number of seconds and retry once or twice.
async function callWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (e) {
      const isRateLimited =
        e?.status === 429 || /wait\s+\d+s|too many/i.test(e?.message || '');
      if (!isRateLimited || attempt > maxRetries) throw e;

      // Pull the number of seconds from the server message if present,
      // otherwise fall back to the 5s cooldown.
      const match = /wait\s+(\d+)s/i.exec(e?.message || '');
      const waitMs = (match ? parseInt(match[1], 10) : 5) * 1000 + 250;
      await sleep(waitMs);
    }
  }
}

async function handleViewMatches() {
  if (loading.value) return; // guard against double-clicks
  loading.value = true;
  errorMsg.value = '';
  try {
    // Sequential, not parallel — respects the server's per-request cooldown.
    progressMsg.value = 'Building your profile...';
    await callWithRetry(() => generateProfile());
    progressMsg.value = 'Finding your matches...';
    await sleep(5250); // wait out the cooldown before the next AI call
    await callWithRetry(() => generateIdeas());
    router.push('/AIResult');
  } catch (e) {
    errorMsg.value = e.message || 'Something went wrong, please try again.';
  } finally {
    loading.value = false;
    progressMsg.value = 'Generating...';
  }
}
</script>

<style scoped>
.page-wrapper { min-height: 100vh; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden;flex-direction: column; }
.page-wrapper::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.page-wrapper::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }


.card { background: white; padding: 40px; border-radius: 30px; box-shadow: 0 20px 60px rgba(80, 90, 160, 0.1); max-width: 888px; width: 100%; text-align: center; z-index: 1; max-height: 804px; }
.title { color: #5b63ff; font-size: 2rem; margin-bottom: 10px; }
.subtitle { color: #6b7280; margin-bottom: 30px; }

.mascot-wrap { position: relative; width: 288px; height: 288px; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; }
.mascot-glow { position: absolute; inset: 18px; border-radius: 50%; background: radial-gradient(circle, rgba(0, 188, 125, 0.2), transparent 70%); filter: blur(14px); animation: glowPulse 3s infinite; }
.ring { position: absolute; border-radius: 50%; border: 1px solid rgba(0, 188, 125, 0.2); inset: 32px; }
.ring.r2 { inset: 6px; border-style: dashed; border-color: rgba(0, 188, 125, 0.15); animation: spin 26s linear infinite; }
.ring.r3 { inset: 54px; border-color: rgba(0, 188, 125, 0.1); animation: spin 18s linear reverse infinite; }
.mascot-img { position: relative; z-index: 3; width: 350px; animation: bob 4s ease-in-out infinite; }
.orbit { position: absolute; inset: 0; z-index: 4; animation: spin 20s linear infinite; }
.orbit-badge { position: absolute; width: 40px; height: 40px; border-radius: 30%; background: #1f2937; color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 10px rgba(0,0,0,0.2); animation: spin 20s linear reverse infinite; }
.orbit-badge.t { left: calc(50% - 20px); top: 0px; }
.orbit-badge.r { right: 0px; top: calc(50% - 20px); }
.orbit-badge.b { left: calc(50% - 20px); bottom: 0px; }
.orbit-badge.l { left: 0px; top: calc(50% - 20px); }


.checklist { text-align: left; max-width: 568px; margin: 0 auto 30px; background: #EDEFFE; padding: 20px; border-radius: 20px; border:1px solid #4E61F6;}
.check-item { margin: 10px 0; opacity: 0; animation: slideIn 0.5s forwards; color:#4E61F6; }
.cta-button { display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  cursor: pointer;
  color: #f2f4fb;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #4F39F6, #2B7FFF);
  background-size: 180% 100%;
  background-position: 0% 0;
  border-radius: 12px;
  box-shadow: 0 10px 22px -10px rgba(79, 57, 246, 0.6);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s,
    background-position 0.5s;
  white-space: nowrap; 
width: 332px; max-width: 100%;
height: 60px;}
.cta-button:hover{
      transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65);
}
.cta-button:disabled{opacity:.7;cursor:not-allowed;transform:none}
.spinner-sm{width:20px;height:20px;border:3px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spinB .6s linear infinite;display:inline-block}
@keyframes spinB{to{transform:rotate(360deg)}}

@keyframes glowPulse { 0%, 100% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1.05); opacity: 1; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes slideIn { to { opacity: 1; transform: translateX(0); } from { transform: translateX(-20px); } }
@keyframes softPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
</style>