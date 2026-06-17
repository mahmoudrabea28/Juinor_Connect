<template>
  <div class="page-bg">
    <div class="card">
      <div class="card__left">
        <span class="dot dot--top-right"></span>
        <span class="dot dot--bottom-left"></span>
        <div>
          <img 
            :src="forgotImage" 
            width="380" 
            height="320" 
            alt="Forgot password illustration" 
            class="floating-image" 
            @error="handleImageError"
            @mouseenter="speedUpAnimation"
            @mouseleave="resetAnimation"
          />
        </div>
      </div>

      <div class="card__right">
        <h1 class="forgot-heading">Forget your <br /><span>Password?</span></h1>
        <p class="forgot-description">Enter your email and we'll send you a verification code</p>

        <div v-if="successMessage" class="success-message">
          <i class="fas fa-check-circle"></i>
          <span>{{ successMessage }}</span>
        </div>

        <div class="field">
          <label class="field__label" for="reset-email">Email</label>
          <div class="field__input-wrap">
            <i class="field__icon fas fa-envelope"></i>
            <input 
              id="reset-email"
              class="field__input" 
              type="email" 
              placeholder="enter your email"
              v-model="email"
              @input="clearError"
              @keypress="handleKeyPress"
              :class="{ 'error-border': errorMessage }"
            />
          </div>
          <span v-if="errorMessage" class="field__error">{{ errorMessage }}</span>
        </div>

        <button 
          class="btn-next" 
          :disabled="isLoading" 
          @click="handleSendCode"
        >
          {{ isLoading ? 'Sending...' : 'Next' }}
          <i v-if="!isLoading" class="fas fa-arrow-right btn-arrow"></i>
        </button>

        <div class="back-link">
          Remember your password? <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { forgotPassword } from '../../services/api' 

const forgotImage = new URL('../../assets/images/Forget password.png', import.meta.url).href
const fallbackImage = 'https://placehold.co/380x320/E0E7FF/4F39F6?text=Junior+Connect'

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const handleSendCode = async (event) => {
  const emailValue = email.value.trim()
  
  if (!emailValue) {
    errorMessage.value = 'Please enter your email address.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await forgotPassword(emailValue)
    successMessage.value = 'Verification code has been sent to your email.'

    setTimeout(() => {
      window.location.href = `./OTP?email=${encodeURIComponent(emailValue)}`
    }, 1000)
    
  } catch (error) {
    errorMessage.value = error.message || 'Something went wrong.'
  } finally {
    isLoading.value = false
  }
}
const speedUpAnimation = (e) => (e.target.style.animationDuration = '2s')
const resetAnimation = (e) => (e.target.style.animationDuration = '3.5s')
const handleImageError = (e) => (e.target.src = fallbackImage)
const clearError = () => (errorMessage.value = '')
const handleKeyPress = (event) => {
  if (event.key === 'Enter') handleSendCode()
}
</script>
<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

/* Page background */
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
  50% { opacity: 1; transform: scale(1.15); }
}

/* Floating animation for image */
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

/* RIGHT PANEL (form side) */
.card__right {
  flex: 1;
  padding: 56px 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}

/* Forgot password specific heading */
.forgot-heading {
  font-size: 38px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.forgot-heading span {
  background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.forgot-description {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 32px;
  line-height: 1.5;
}

/* Form fields */
.field {
  margin-bottom: 24px;
}

.field__label {
  display: block;
  font-size: 13.5px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 7px;
}

.field__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.field__icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  font-size: 18px;
  color: #aab0cc;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.field__input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: 1.5px solid #e5e7f0;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #374151;
  background: #f8f9fc;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field__input::placeholder {
  color: #aab0cc;
}

.field__input:focus {
  border-color: #5b6ef5;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(91, 110, 245, 0.12);
}

.field__input.error-border {
  border-color: #ef4444;
}

/* Error message */
.field__error {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 5px;
}

/* Next button */
.btn-next {
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
}

.btn-next:hover {
  opacity: 0.93;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(79, 57, 246, 0.44);
}

.btn-next:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(79, 57, 246, 0.32);
}

.btn-next:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-arrow {
  font-size: 14px;
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
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Success message styling */
.success-message {
  background: #ecfdf5;
  border-left: 4px solid #10b981;
  padding: 14px 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #065f46;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-message i {
  font-size: 18px;
  color: #10b981;
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
  .forgot-heading {
    font-size: 32px;
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
  .forgot-heading {
    font-size: 28px;
  }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
}
</style>