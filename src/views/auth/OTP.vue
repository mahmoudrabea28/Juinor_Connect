<template>
  <div class="page-bg">
    <div class="card">
      <div class="card__left">
        <span class="dot dot--top-right"></span>
        <span class="dot dot--bottom-left"></span>
        <img 
          :src="otpImage" 
          alt="OTP Verification" 
          class="floating-image" 
        />
      </div>

      <div class="card__right">
        <h1 class="otp-heading">Email <span>Verification</span></h1>
        <p class="otp-description">Enter the 6-digit verification code sent to</p>
        <div class="email-display">{{ userEmail }}</div>

        <div v-if="message.text" :class="message.type === 'error' ? 'error-message' : 'success-message'">
          <i :class="message.type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle'"></i>
          {{ message.text }}
        </div>

        <div class="otp-container">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            type="text"
            maxlength="1"
            class="otp-input"
            v-model="otpDigits[index]"
            @input="handleOtpInput(index, $event)"
            @keydown="handleOtpKeydown(index, $event)"
            @paste="handleOtpPaste"
            ref="otpInputs"
          />
        </div>

        <div class="timer-row">
          <div class="timer">
            <i class="fas fa-hourglass-half"></i>
            <span>{{ timerDisplay }}</span>
          </div>
          <a href="#" @click.prevent="handleResend" class="resend-link" :class="{ disabled: !canResend }">
            {{ isResending ? 'Sending...' : 'Resend OTP?' }}
          </a>
        </div>

        <button class="btn-verify" @click="handleVerify" :disabled="isVerifying">
          <span v-if="isVerifying">Verifying... <i class="fas fa-spinner fa-pulse"></i></span>
          <span v-else>Verify <i class="fas fa-arrow-right btn-arrow"></i></span>
        </button>

        <div class="back-link">
          <router-link to="/login">← Back to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { verifyCode, forgotPassword } from '../../services/api'

const router = useRouter()
const otpImage = new URL('../../assets/images/chat_bubble.png', import.meta.url).href

const urlParams = new URLSearchParams(window.location.search)
const userEmail = ref(urlParams.get('email') || '')

const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const isVerifying = ref(false)
const isResending = ref(false)
const message = ref({ text: '', type: '' })
const timeLeft = ref(59)
let timerInterval = null
const canResend = ref(false)

const timerDisplay = computed(() => {
  const mins = Math.floor(timeLeft.value / 60)
  const secs = timeLeft.value % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
})

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  timeLeft.value = 59
  canResend.value = false
  timerInterval = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
      canResend.value = true
    } else {
      timeLeft.value--
    }
  }, 1000)
}

const handleVerify = async () => {
  clearMessages()
  const code = otpDigits.value.join('')
  
  if (code.length !== 6) {
    showMessage('error', 'Please enter the complete 6-digit code.')
    return
  }

  isVerifying.value = true
  try {
    const response = await verifyCode(userEmail.value, code)
    if (response && response.token) {
        localStorage.setItem('resetToken', response.token)
        localStorage.setItem('resetEmail', userEmail.value)
    }
    
    showMessage('success', 'Verified successfully!')
    setTimeout(() => router.push('/reset_password'), 1000)
  } catch (error) {
    showMessage('error', error.message || 'Invalid code.')
  } finally {
    isVerifying.value = false
  }
}

const handleResend = async () => {
  if (!canResend.value) return
  isResending.value = true
  try {
    await forgotPassword(userEmail.value)
    showMessage('success', 'New code sent!')
    otpDigits.value = ['', '', '', '', '', '']
    startTimer()
  } catch (error) {
    showMessage('error', 'Failed to resend.')
  } finally {
    isResending.value = false
  }
}


const handleOtpInput = (index, event) => {
  let value = event.target.value.replace(/[^0-9]/g, '')
  otpDigits.value[index] = value.charAt(0)
  if (value && index < 5) otpInputs.value[index + 1]?.focus()
}

const handleOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) otpInputs.value[index - 1]?.focus()
}

const handleOtpPaste = (event) => {
  event.preventDefault()
  const pasted = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6).split('')
  pasted.forEach((d, i) => otpDigits.value[i] = d)
}

const showMessage = (type, text) => {
  message.value = { type, text }
  setTimeout(() => message.value = { type: '', text: '' }, 4000)
}

const clearMessages = () => message.value = { type: '', text: '' }

onMounted(() => {
  startTimer()
})

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })
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

/* Card container */
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

/* LEFT PANEL (illustration side) */
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

/* Decorative blurred circles */
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

/* Decorative dots */
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

/* FLOATING IMAGE ANIMATION */
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

/* Heading */
.otp-heading {
  font-size: 38px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.otp-heading span {
  background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.otp-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
  line-height: 1.5;
}

.email-display {
  font-size: 14px;
  font-weight: 600;
  color: #4F39F6;
  background: #f0f2ff;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 28px;
}

/* OTP Input Fields */
.otp-container {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 24px;
}

.otp-input {
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Inter', monospace;
  border: 1.5px solid #e5e7f0;
  border-radius: 16px;
  background: #f8f9fc;
  color: #374151;
  outline: none;
  transition: all 0.2s;
}

.otp-input:focus {
  border-color: #5b6ef5;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(91, 110, 245, 0.12);
}

/* Timer and Resend */
.timer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.timer {
  font-size: 16px;
  font-weight: 600;
  color: #ef4444;
  background: #fee2e2;
  padding: 6px 14px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.timer i {
  font-size: 14px;
}

.resend-link {
  font-size: 13.5px;
  color: #4F39F6;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.resend-link:hover {
  color: #2B7FFF;
  text-decoration: underline;
}

.resend-link.disabled {
  color: #9ca3b8;
  cursor: not-allowed;
  pointer-events: none;
}

/* Verify Button */
.btn-verify {
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

.btn-verify:hover {
  opacity: 0.93;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(79, 57, 246, 0.44);
}

.btn-verify:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(79, 57, 246, 0.32);
}

.btn-verify:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Error and Success messages */
.error-message {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #b91c1c;
  display: flex;
  align-items: center;
  gap: 10px;
}

.success-message {
  background: #ecfdf5;
  border-left: 4px solid #10b981;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #065f46;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Back to login link */
.back-link {
  text-align: center;
  margin-top: 28px;
  font-size: 13.5px;
  color: #6b7280;
}

.back-link a {
  color: #4F39F6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #2B7FFF;
}

/* Ripple animation */
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

.btn-verify {
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
  .otp-heading {
    font-size: 32px;
  }
  .otp-input {
    width: 50px;
    height: 50px;
    font-size: 20px;
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
  .otp-heading {
    font-size: 28px;
  }
  .otp-container {
    gap: 8px;
  }
  .otp-input {
    width: 42px;
    height: 42px;
    font-size: 18px;
  }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
}
</style>