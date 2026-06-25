<template>
  <div class="page-bg">
    <div class="card">
      <!-- LEFT PANEL with FLOATING illustration -->
      <div class="card__left">
        <span class="dot dot--top-right"></span>
        <span class="dot dot--bottom-left"></span>
        <div>
          <img 
            :src="successImage" 
            width="380" 
            height="320" 
            alt="Congratulations illustration" 
            class="floating-image" 
            @error="handleImageError"
            @mouseenter="speedUpAnimation"
            @mouseleave="resetAnimation"
          />
        </div>
      </div>

      <!-- RIGHT PANEL - Success Message -->
      <div class="card__right">
        <!-- Success Icon -->
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>

        <!-- Heading -->
        <h1 class="congrats-heading">Congrats!</h1>

        <!-- Description -->
        <p class="success-description">
          Your password has been reset successfully. You can now login with your new password.
        </p>

        <!-- Back to Login Button -->
      <button class="btn-login" @click="handleBackToLogin" ref="loginBtnRef">
  Back to Login
  <i class="fas fa-arrow-right btn-arrow"></i>
</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const successImage = new URL('../../assets/images/party_bubble.png', import.meta.url).href
const fallbackImage = 'https://placehold.co/380x320/E0E7FF/4F39F6?text=Success!'

const loginBtnRef = ref(null)

const speedUpAnimation = (e) => {
  e.target.style.animationDuration = '2s'
}

const resetAnimation = (e) => {
  e.target.style.animationDuration = '3.5s'
}
const handleImageError = (e) => {
  e.target.src = fallbackImage
}
const addRipple = (btnElement, event) => {
  if (!btnElement) return
  
  const ripple = document.createElement('span')
  const rect = btnElement.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${event.clientX - rect.left - size / 2}px;
    top: ${event.clientY - rect.top - size / 2}px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.5s linear;
    pointer-events: none;
  `
  btnElement.style.position = 'relative'
  btnElement.style.overflow = 'hidden'
  btnElement.appendChild(ripple)
  setTimeout(() => ripple.remove(), 520)
}

const handleBackToLogin = (event) => {
  addRipple(loginBtnRef.value, event)

  setTimeout(() => {
    router.push('/login')
  }, 150)
}

const createConfetti = () => {
  const colors = ['#4F39F6', '#2B7FFF', '#10b981', '#f59e0b', '#ef4444']
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'fixed'
    confetti.style.width = '8px'
    confetti.style.height = '8px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.borderRadius = '50%'
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.top = '-10px'
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    confetti.style.animation = `confetti ${Math.random() * 2 + 2}s linear forwards`
    confetti.style.animationDelay = Math.random() * 0.5 + 's'
    document.body.appendChild(confetti)
    
    setTimeout(() => {
      if (confetti.parentNode) confetti.remove()
    }, 3000)
  }
}
const addConfettiStyles = () => {
  if (!document.getElementById('confetti-style')) {
    const confettiStyle = document.createElement('style')
    confettiStyle.id = 'confetti-style'
    confettiStyle.textContent = `
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `
    document.head.appendChild(confettiStyle)
  }
}
const addRippleStyles = () => {
  if (!document.getElementById('success-ripple-style')) {
    const style = document.createElement('style')
    style.id = 'success-ripple-style'
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `
    document.head.appendChild(style)
  }
}
onMounted(() => {
  addConfettiStyles()
  addRippleStyles()
  setTimeout(() => {
    createConfetti()
  }, 300)
})
</script>

<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

.page-bg {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #E2E8F0;
}

.card {
  display: flex;
  width: 100%;
  max-width: 1040px;
  min-height: 580px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(80, 90, 160, 0.13);
  background: #fff;
}

/* LEFT PANEL */
.card__left {
  position: relative;
  flex: 0 0 46%;
  background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 480px;
}

.card__left::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #C6D2FF;
  filter: blur(60px);
  opacity: 0.75;
  pointer-events: none;
}

.card__left::after {
  content: '';
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #8EC5FF;
  filter: blur(60px);
  opacity: 0.65;
  pointer-events: none;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background: #7C86FF;
  animation: softPulse 4s ease-in-out infinite;
}

.dot--top-right {
  width: 12px;
  height: 12px;
  top: 60px;
  right: 52px;
}

.dot--bottom-left {
  width: 12px;
  height: 12px;
  bottom: 40px;
  left: 48px;
}

@keyframes softPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Floating Image Animation */
.floating-image {
  display: block;
  max-width: 85%;
  height: auto;
  position: relative;
  z-index: 2;
  animation: floatUpDown 3.5s ease-in-out infinite;
  will-change: transform;
}

@keyframes floatUpDown {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0px); }
}

/* RIGHT PANEL */
.card__right {
  flex: 1;
  padding: 56px 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}

/* Success Icon */
.success-icon {
  text-align: center;
  margin-bottom: 24px;
}

.success-icon i {
  font-size: 80px;
  background: linear-gradient(135deg, #4F39F6 0%, #2B7FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Heading */
.congrats-heading {
  font-size: 44px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.congrats-heading span {
  background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Description */
.success-description {
  font-size: 15px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
}

/* Back to Login Button */
.btn-login {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  letter-spacing: 0.02em;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 6px 20px rgba(79, 57, 246, 0.38);
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.btn-login:hover {
  opacity: 0.93;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(79, 57, 246, 0.44);
}

.btn-login:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(79, 57, 246, 0.32);
}

.btn-arrow {
  font-size: 14px;
  transition: transform 0.2s;
}

.btn-login:hover .btn-arrow {
  transform: translateX(4px);
}

/* Ripple animation support */
.btn-login {
  position: relative;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 860px) {
  .card {
    flex-direction: column;
    max-width: 500px;
  }
  .card__left {
    flex: 0 0 260px;
    min-height: 260px;
  }
  .card__right {
    padding: 40px 40px 36px;
  }
  .congrats-heading {
    font-size: 36px;
  }
  .success-icon i {
    font-size: 65px;
  }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
}

@media (max-width: 520px) {
  .page-bg {
    padding: 0;
  }
  .card {
    border-radius: 0;
    max-width: 100%;
    min-height: 100vh;
  }
  .card__left {
    flex: 0 0 200px;
    min-height: 200px;
  }
  .card__right {
    padding: 28px 24px 32px;
  }
  .congrats-heading {
    font-size: 30px;
  }
  .success-icon i {
    font-size: 55px;
  }
  .success-description {
    font-size: 14px;
  }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
}
</style>