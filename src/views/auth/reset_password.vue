<template>
  <div class="page-bg">
    <div class="card">
      <div class="card__left">
        <span class="dot dot--top-right"></span>
        <span class="dot dot--bottom-left"></span>
        <div>
          <img 
            :src="resetImage" 
            width="380" 
            height="320" 
            alt="Reset Password illustration" 
            class="floating-image" 
            @error="handleImageError"
            @mouseenter="speedUpAnimation"
            @mouseleave="resetAnimation"
          />
        </div>
      </div>

      <div class="card__right">
        <h1 class="reset-heading">Reset <span>Password?</span></h1>

        <div v-if="message.text" :class="message.type === 'error' ? 'error-message' : 'success-message'">
          <i :class="message.type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle'"></i>
          {{ message.text }}
        </div>

        <div class="field">
          <label class="field__label" for="new-password">New Password</label>
          <div class="field__input-wrap">
            <i class="field__icon fas fa-lock"></i>
            <input 
              id="new-password"
              class="field__input" 
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="enter your new password"
              v-model="form.newPassword"
              @input="clearFieldError('new-password')"
              :class="{ 'error-border': errors.newPassword }"
            />
            <button type="button" class="password-toggle" @click="toggleNewPassword">
  <i class="fas" :class="showNewPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
</button>
          </div>
          <span v-if="errors.newPassword" class="field__error">{{ errors.newPassword }}</span>
        </div>

        <div class="field">
          <label class="field__label" for="confirm-password">Confirm Password</label>
          <div class="field__input-wrap">
            <i class="field__icon fas fa-check-circle"></i>
            <input 
              id="confirm-password"
              class="field__input" 
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="confirm your password"
              v-model="form.confirmPassword"
              @input="clearFieldError('confirm-password')"
              :class="{ 'error-border': errors.confirmPassword }"
            />
           <button type="button" class="password-toggle" @click="toggleConfirmPassword">
  <i class="fas" :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
</button>
          </div>
          <span v-if="errors.confirmPassword" class="field__error">{{ errors.confirmPassword }}</span>
        </div>

        <button class="btn-reset" @click="handleResetPassword" :disabled="isResetting" ref="resetBtnRef">
          <span v-if="isResetting">
            Resetting... <i class="fas fa-spinner fa-pulse"></i>
          </span>
          <span v-else>
            Next
            <i class="fas fa-arrow-right btn-arrow"></i>
          </span>
        </button>

        <div class="back-link">
          Remember your password? <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { resetPassword } from '../../services/api' 

const router = useRouter()
const resetImage = new URL('../../assets/images/Forget password.png', import.meta.url).href
const fallbackImage = 'https://placehold.co/380x320/E0E7FF/4F39F6?text=Reset+Password'

const form = reactive({
  newPassword: '',
  confirmPassword: ''
})
const isResetting = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = reactive({
  newPassword: '',
  confirmPassword: ''
})
const message = ref({ text: '', type: '' })
const resetBtnRef = ref(null)

const handleResetPassword = async (event) => {
  addRipple(resetBtnRef.value, event)
  clearMessages()

  errors.newPassword = ''
  errors.confirmPassword = ''
  
  const newPassword = form.newPassword.trim()
  const confirmPassword = form.confirmPassword.trim()
  let isValid = true
  if (!newPassword) {
    errors.newPassword = 'Please enter your new password.'
    isValid = false
  } else if (!isStrongPassword(newPassword)) {
    errors.newPassword = 'Password must be 8+ chars, letters and numbers.'
    isValid = false
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
    isValid = false
  }
  
  if (!isValid) return
  const token = localStorage.getItem('resetToken')
  const email = localStorage.getItem('resetEmail')

  if (!token || !email) {
    showMessage('error', 'Session expired. Please request a new code.')
    return
  }

  isResetting.value = true
  try {
    await resetPassword(email, token, newPassword)
    showMessage('success', 'Password reset successfully! Redirecting...')
    localStorage.removeItem('resetToken')
    localStorage.removeItem('resetEmail')
    setTimeout(() => router.push('/congrate'), 1500)
  } catch (error) {
    showMessage('error', error.message || 'Reset failed. Please try again.')
  } finally {
    isResetting.value = false
  }
}

const isStrongPassword = (p) => p.length >= 8 && /[A-Za-z]/.test(p) && /[0-9]/.test(p)
const showMessage = (type, text) => { message.value = { type, text }; setTimeout(() => { if (message.value.text === text) clearMessages() }, 4000) }
const clearMessages = () => message.value = { text: '', type: '' }
const clearFieldError = (fieldId) => { if (fieldId === 'new-password') errors.newPassword = ''; if (fieldId === 'confirm-password') errors.confirmPassword = '' }
const toggleNewPassword = () => showNewPassword.value = !showNewPassword.value
const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value
const handleImageError = (e) => e.target.src = fallbackImage
const speedUpAnimation = (e) => e.target.style.animationDuration = '2s'
const resetAnimation = (e) => e.target.style.animationDuration = '3.5s'

const addRipple = (btn, event) => {
  if (!btn) return
  const ripple = document.createElement('span')
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  ripple.style.cssText = `position: absolute; width: ${size}px; height: ${size}px; left: ${event.clientX - rect.left - size/2}px; top: ${event.clientY - rect.top - size/2}px; background: rgba(255,255,255,0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.5s linear; pointer-events: none;`
  btn.style.position = 'relative'; btn.style.overflow = 'hidden'; btn.appendChild(ripple)
  setTimeout(() => ripple.remove(), 520)
}

const handleEnter = (e) => { if (e.key === 'Enter') handleResetPassword(e) }

onMounted(() => {
  const n = document.getElementById('new-password')
  const c = document.getElementById('confirm-password')
  n?.addEventListener('keypress', handleEnter)
  c?.addEventListener('keypress', handleEnter)
})

onUnmounted(() => {
  const n = document.getElementById('new-password')
  const c = document.getElementById('confirm-password')
  n?.removeEventListener('keypress', handleEnter)
  c?.removeEventListener('keypress', handleEnter)
})
</script>

<style scoped>
*, *::before, *::after { margin: 0; padding: 0; }
.page-bg { width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #E2E8F0; }
.card { display: flex; width: 100%; max-width: 1040px; min-height: 580px; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(80, 90, 160, 0.13); background: #fff; }
.card__left { position: relative; flex: 0 0 46%; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; align-items: center; justify-content: center; overflow: hidden; min-height: 480px; }
.card__left::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.card__left::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.dot { position: absolute; border-radius: 50%; background: #7C86FF; animation: softPulse 4s ease-in-out infinite; }
.dot--top-right { width: 12px; height: 12px; top: 60px; right: 52px; }
.dot--bottom-left { width: 12px; height: 12px; bottom: 40px; left: 48px; }
@keyframes softPulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
.floating-image { display: block; max-width: 85%; height: auto; position: relative; z-index: 2; animation: floatUpDown 3.5s ease-in-out infinite; }
@keyframes floatUpDown { 0% { transform: translateY(0px); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0px); } }
.card__right { flex: 1; padding: 56px 60px 48px; display: flex; flex-direction: column; justify-content: center; background: #fff; }
.reset-heading { font-size: 38px; font-weight: 700; color: #111827; margin-bottom: 32px; letter-spacing: -0.5px; }
.reset-heading span { background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.field { margin-bottom: 24px; }
.field__label { display: block; font-size: 13.5px; font-weight: 500; color: #374151; margin-bottom: 7px; }
.field__input-wrap { position: relative; display: flex; align-items: center; }
.field__icon { position: absolute; left: 14px; width: 18px; height: 18px; font-size: 16px; color: #aab0cc; pointer-events: none; }
.field__input { width: 100%; padding: 12px 14px 12px 42px; border: 1.5px solid #e5e7f0; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 14px; color: #374151; background: #f8f9fc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.field__input:focus { border-color: #5b6ef5; background: #fff; box-shadow: 0 0 0 3px rgba(91, 110, 245, 0.12); }
.field__input.error-border { border-color: #ef4444; }
.password-toggle { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #aab0cc; font-size: 16px; z-index: 2; transition: color 0.2s; }
.password-toggle:hover { color: #5b6ef5; }
.field__error { display: block; font-size: 12px; color: #ef4444; margin-top: 5px; }
.btn-reset { width: 100%; padding: 14px 24px; border: none; border-radius: 12px; background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%); color: #fff; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 6px 20px rgba(79, 57, 246, 0.38); position: relative; overflow: hidden; margin-top: 8px; }
.btn-reset:hover { opacity: 0.93; transform: translateY(-1px); box-shadow: 0 10px 28px rgba(79, 57, 246, 0.44); }
.success-message, .error-message { padding: 14px 16px; border-radius: 12px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 500; animation: slideIn 0.3s ease-out; }
.success-message { background: #ecfdf5; border-left: 4px solid #10b981; color: #065f46; }
.error-message { background: #fef2f2; border-left: 4px solid #ef4444; color: #b91c1c; }
.back-link { text-align: center; margin-top: 28px; font-size: 13.5px; color: #6b7280; }
.back-link a { color: #4F39F6; font-weight: 600; text-decoration: none; }
@media (max-width: 860px) { .card { flex-direction: column; max-width: 500px; } .card__left { display: none; } .card__right { padding: 40px; } }
@keyframes ripple { to { transform: scale(4); opacity: 0; } }
</style>