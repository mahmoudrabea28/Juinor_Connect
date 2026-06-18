<template>
  <div class="page-wrapper">
    <div class="blur-dot blur-dot--top-left"></div>
    <div class="blur-dot blur-dot--bottom-right"></div>
    <span class="dot dot--top-right"></span>
    <span class="dot dot--bottom-left"></span>

    <div class="logo-wrapper">
      <img src="../../assets/images/Logo.png" class="logo" alt="Junior Connect Logo">
    </div>

    <div class="content-card">
      <div class="main-content">
        <h1 class="title">Your AI-built profile, ready for the right team.</h1>
        <p class="description">
          Finish onboarding and we'll generate your developer profile and 
          match you with teams that actually need someone like you.
        </p>

        <router-link to="/MatchwithAi"> <button class="generate-btn" @click="generateProfile">
          <i class="fa-solid fa-wand-magic-sparkles"></i>Generate my profile
        </button></router-link> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const generateProfile = () => { console.log("Generating profile..."); }
</script>

<style scoped>
.page-wrapper {
min-height: 100vh; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden;flex-direction: column;
}


.logo-wrapper { 
  margin-bottom: 40px; 
  z-index: 2; 
}
.logo { height: 70px; }

.content-card {
  background: white;
  padding: 60px;
  border-radius: 24px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(80, 90, 160, 0.13);
  position: relative;
  z-index: 1;
}

.title { font-size: 38px; color: #111827; margin-bottom: 20px; font-weight: 700; line-height: 1.2; }
.description { color: #6b7280; font-size: 16px; margin-bottom: 40px; line-height: 1.6; }
.generate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  cursor: pointer;
  color: #f2f4fb;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #4F39F6, #2B7FFF);
  background-size: 180% 100%;
  background-position: 0% 0;
  border-radius: 12px;
  box-shadow: 0 10px 22px -10px rgba(79, 57, 246, 0.6);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s,
    background-position 0.5s;
  white-space: nowrap;
  max-width: 210px;
  width: 100%;
}
.generate-btn:hover {   transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65);}

.blur-dot { position: absolute; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.blur-dot--top-left { top: -60px; left: -60px; background: #C6D2FF; }
.blur-dot--bottom-right { bottom: -60px; right: -60px; background: #8EC5FF; }

.dot { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #7C86FF; animation: softPulse 4s ease-in-out infinite; }
.dot--top-right { top: 60px; right: 52px; }
.dot--bottom-left { bottom: 40px; left: 48px; }

@keyframes softPulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
</style>