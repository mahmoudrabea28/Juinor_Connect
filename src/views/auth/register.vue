<template>
  <div class="page-bg">
    <div class="card">
      <!-- Left Panel: Illustration with floating animation -->
      <div class="card__left">
        <span class="dot dot--top-right"></span>
        <span class="dot dot--bottom-left"></span>
        <div class="image-switch-wrapper">
          <Transition name="image-transition" mode="out-in">
            <img 
              :key="isLoginMode ? 'login' : 'signup'" 
              :src="isLoginMode ? loginImage : signupImage" 
              width="380" 
              height="320" 
              :alt="isLoginMode ? 'Login illustration' : 'Signup illustration'" 
              class="floating-image" 
              @error="handleImageError"
            />
          </Transition>
        </div>
      </div>

      <!-- Right Panel: Dynamic Form (Login or Signup) -->
      <div class="card__right">
        <Transition name="fade-slide" mode="out-in">
          <!-- Login Form -->
          <div v-if="isLoginMode" key="login-form">
            <p class="welcome-sub">Welcome back to</p>
            <h1 class="brand">Junior <span class="brand--accent">connect</span></h1>
            <p class="tagline">Build real SaaS products, together.</p>

            <!-- Email Field -->
            <div class="field">
              <label class="field__label" for="email">Email</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-envelope"></i>
                <input 
                  id="email"
                  class="field__input" 
                  type="email" 
                  placeholder="enter your email"
                  v-model="loginForm.email"
                  @input="clearFieldError('email')"
                />
              </div>
              <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
            </div>

            <!-- Password Field -->
            <div class="field">
              <label class="field__label" for="password">Password</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-lock"></i>
                <input 
                  id="password"
                  class="field__input" 
                  type="password" 
                  placeholder="enter your password"
                  v-model="loginForm.password"
                  @input="clearFieldError('password')"
                />
              </div>
              <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
            </div>

            <!-- Options Row (Forgot & Remember Me) -->
            <div class="options-row">
             <router-link to="/forgot_password" class="forgot-link">Forgot password?</router-link>
              <label class="remember-label">
                <input class="remember-cb" type="checkbox" v-model="loginForm.rememberMe" />
                <span class="remember-box" aria-hidden="true"></span>
                Remember Me
              </label>
            </div>

            <!-- Login Button -->
            <button class="btn-login" @click="handleLogin" ref="loginBtnRef">
              <span v-if="loading">Signing in…</span>
              <template v-else>
                Login
                <i class="fas fa-arrow-right btn-arrow"></i>
              </template>
            </button>

            <!-- Divider & Social Login -->
            <div class="divider">
              <span class="divider__line"></span>
              <span class="divider__text">OR LOGIN WITH</span>
              <span class="divider__line"></span>
            </div>

            <div class="social-row">
              <button class="btn-social" type="button" @click="socialLogin('google')">
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.09 29.53 1 24 1 14.79 1 6.97 6.52 3.44 14.44l7.1 5.52C12.3 13.63 17.7 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.54 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.68c-.55 2.97-2.2 5.48-4.68 7.17l7.19 5.59C43.37 37.42 46.54 31.41 46.54 24.5z"/>
                  <path fill="#FBBC05" d="M10.54 28.46A14.5 14.5 0 019.5 24c0-1.56.27-3.07.74-4.49L3.14 13.99A23.01 23.01 0 001 24c0 3.7.87 7.2 2.44 10.3l7.1-5.84z"/>
                  <path fill="#34A853" d="M24 47c5.53 0 10.17-1.83 13.56-4.96l-7.19-5.59C28.53 37.84 26.4 38.5 24 38.5c-6.3 0-11.64-4.24-13.55-9.95l-7.1 5.84C6.97 42.58 14.79 47 24 47z"/>
                </svg> Google
              </button>
              <button class="btn-social" @click="socialLogin('facebook')">
                <i class="fab fa-facebook-f" style="color: #4267B2;"></i> Facebook
              </button>
            </div>
            <p class="signup-line">Have no account? <a href="#" @click.prevent="toggleMode" class="signup-link">Sign up</a></p>
          </div>

          <!-- Signup Form -->
          <div v-else key="signup-form">
            <p class="welcome-sub">Join the community</p>
            <h1 class="brand">Junior <span class="brand--accent">connect</span></h1>
            <p class="tagline">Create your account. Start building.</p>

            <!-- Full Name Field -->
            <div class="field">
              <label class="field__label" for="fullname">Full name</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-user"></i>
                <input 
                  id="fullname"
                  class="field__input" 
                  type="text" 
                  placeholder="John Doe"
                  v-model="signupForm.fullname"
                  @input="clearFieldError('fullname')"
                />
              </div>
              <span v-if="errors.fullname" class="field__error">{{ errors.fullname }}</span>
            </div>

            <!-- Email Field -->
            <div class="field">
              <label class="field__label" for="signup-email">Email</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-envelope"></i>
                <input 
                  id="signup-email"
                  class="field__input" 
                  type="email" 
                  placeholder="your@email.com"
                  v-model="signupForm.email"
                  @input="clearFieldError('signup-email')"
                />
              </div>
              <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
            </div>

            <!-- Password Field -->
            <div class="field">
              <label class="field__label" for="signup-password">Password</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-lock"></i>
                <input 
                  id="signup-password"
                  class="field__input" 
                  type="password" 
                  placeholder="Create a strong password"
                  v-model="signupForm.password"
                  @input="clearFieldError('signup-password')"
                />
              </div>
              <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
            </div>

            <!-- Confirm Password Field -->
            <div class="field">
              <label class="field__label" for="confirm-pwd">Confirm password</label>
              <div class="field__input-wrap">
                <i class="field__icon fas fa-check-circle"></i>
                <input 
                  id="confirm-pwd"
                  class="field__input" 
                  type="password" 
                  placeholder="Confirm password"
                  v-model="signupForm.confirmPassword"
                  @input="clearFieldError('confirm-pwd')"
                />
              </div>
              <span v-if="errors.confirmPassword" class="field__error">{{ errors.confirmPassword }}</span>
            </div>

            <!-- Remember Me Checkbox -->
            <div class="options-row">
              <div></div>
              <label class="remember-label">
                <input class="remember-cb" type="checkbox" v-model="signupForm.rememberMe" />
                <span class="remember-box" aria-hidden="true"></span>
                Remember Me
              </label>
            </div>

            <!-- Signup Button -->
            <button class="btn-login" @click="handleSignup" ref="signupBtnRef">
              <span v-if="loading">Creating account…</span>
              <template v-else>
                Sign up
                <i class="fas fa-arrow-right btn-arrow"></i>
              </template>
            </button>

            <!-- Divider & Social Signup -->
            <div class="divider">
              <span class="divider__line"></span>
              <span class="divider__text">OR SIGN UP WITH</span>
              <span class="divider__line"></span>
            </div>

            <div class="social-row">
              <button class="btn-social" @click="socialLogin('google')">
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.09 29.53 1 24 1 14.79 1 6.97 6.52 3.44 14.44l7.1 5.52C12.3 13.63 17.7 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.54 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.68c-.55 2.97-2.2 5.48-4.68 7.17l7.19 5.59C43.37 37.42 46.54 31.41 46.54 24.5z"/>
                  <path fill="#FBBC05" d="M10.54 28.46A14.5 14.5 0 019.5 24c0-1.56.27-3.07.74-4.49L3.14 13.99A23.01 23.01 0 001 24c0 3.7.87 7.2 2.44 10.3l7.1-5.84z"/>
                  <path fill="#34A853" d="M24 47c5.53 0 10.17-1.83 13.56-4.96l-7.19-5.59C28.53 37.84 26.4 38.5 24 38.5c-6.3 0-11.64-4.24-13.55-9.95l-7.1 5.84C6.97 42.58 14.79 47 24 47z"/>
                </svg> Google
              </button>
              <button class="btn-social" @click="socialLogin('facebook')">
                <i class="fab fa-facebook-f" style="color: #4267B2;"></i> Facebook
              </button>
            </div>
            <p class="signup-line">Already have an account? <a href="#" @click.prevent="toggleMode" class="signup-link">Log in</a></p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const loginImage = new URL('../../assets/images/Login Image.png', import.meta.url).href
const signupImage = new URL('../../assets/images/Register.png', import.meta.url).href
const fallbackImage = loginImage

const isLoginMode = ref(true)
const loading = ref(false)


const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const signupForm = reactive({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: '',
  fullname: '',
  confirmPassword: ''
})
const loginBtnRef = ref(null)
const signupBtnRef = ref(null)

const isValidEmail = (val) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

const clearFieldError = (field) => {
  if (field === 'email') errors.email = ''
  if (field === 'password') errors.password = ''
  if (field === 'fullname') errors.fullname = ''
  if (field === 'signup-email') errors.email = ''
  if (field === 'signup-password') errors.password = ''
  if (field === 'confirm-pwd') errors.confirmPassword = ''
}

const addRipple = (btnElement, event) => {
  if (!btnElement) return
  const ripple = document.createElement('span')
  const rect = btnElement.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  ripple.style.cssText = `
    position:absolute; width:${size}px; height:${size}px;
    left:${event.clientX - rect.left - size / 2}px;
    top:${event.clientY - rect.top - size / 2}px;
    background:rgba(255,255,255,0.25); border-radius:50%;
    transform:scale(0); animation:ripple .5s linear; pointer-events:none;
  `
  btnElement.style.position = 'relative'
  btnElement.style.overflow = 'hidden'
  btnElement.appendChild(ripple)
  setTimeout(() => ripple.remove(), 520)
}

const handleImageError = (e) => {
  e.target.src = fallbackImage
}

const handleLogin = (event) => {
  addRipple(loginBtnRef.value, event)
  

  errors.email = ''
  errors.password = ''
  
  let isValid = true
  

  if (!loginForm.email.trim() || !isValidEmail(loginForm.email.trim())) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }
  

  if (!loginForm.password) {
    errors.password = 'Please enter your password.'
    isValid = false
  }
  
  if (isValid) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      alert('Login simulation – great!')
    }, 1500)
  }
}


const handleSignup = (event) => {
  addRipple(signupBtnRef.value, event)
  
  errors.fullname = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  
  let isValid = true
  if (!signupForm.fullname.trim()) {
    errors.fullname = 'Full name required'
    isValid = false
  }

  if (!signupForm.email.trim() || !isValidEmail(signupForm.email.trim())) {
    errors.email = 'Valid email required'
    isValid = false
  }
  if (!signupForm.password) {
    errors.password = 'Password required'
    isValid = false
  } else if (signupForm.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
 
  if (signupForm.password !== signupForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  if (isValid) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      alert('Account created! (demo)')
      toggleMode()
    }, 1500)
  }
}

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  if (isLoginMode.value) {
    Object.assign(loginForm, { email: '', password: '', rememberMe: false })
  } else {
    Object.assign(signupForm, { fullname: '', email: '', password: '', confirmPassword: '', rememberMe: false })
  }
  Object.keys(errors).forEach(key => errors[key] = '')
}

const socialLogin = (provider) => {
  alert(`${provider} login simulation – coming soon!`)
}
</script>

<style scoped>
*, *::before, *::after { 
  box-sizing: border-box; 
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

.floating-image {
  display: block;
   width: 380px;
  max-width: 85%;
  height: auto;
  object-fit: contain;
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

.floating-image:hover {
  animation-duration: 2s;
}

.image-switch-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__right {
  flex: 1;
  padding: 56px 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}

.welcome-sub {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 4px;
  letter-spacing: 0.01em;
}

.brand {
  font-size: 44px;
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.brand--accent {
  font-weight: 700;
  background: linear-gradient(90deg, #4F39F6 0%, #2B7FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 28px;
  letter-spacing: 0.01em;
}
.field {
  margin-bottom: 16px;
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
  box-shadow: 0 0 0 3px rgba(91,110,245,0.12);
}

.field__error {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 5px;
}

.options-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 2px;
}

.forgot-link {
  font-size: 13.5px;
  font-weight: 400;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover { color: #5b6ef5; }

.remember-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 400;
  color: #374151;
  cursor: pointer;
  user-select: none;
}

.remember-cb {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.remember-box {
  width: 18px;
  height: 18px;
  border: 1.8px solid #2563EB;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  flex-shrink: 0;
  transition: border-color 0.2s, background 0.2s;
}

.remember-cb:checked + .remember-box {
  border-color: #5b6ef5;
  background: #5b6ef5;
}

.remember-cb:checked + .remember-box::after {
  content: '';
  display: block;
  width: 10px;
  height: 6px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(1px, -1px);
}

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
  box-shadow: 0 6px 20px rgba(79,57,246,0.38);
  position: relative;
  overflow: hidden;
}

.btn-login:hover {
  opacity: 0.93;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(79,57,246,0.44);
}

.btn-login:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(79,57,246,0.32);
}

.btn-arrow {
  font-size: 14px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 18px;
}

.divider__line {
  flex: 1;
  height: 1px;
  background: #e5e7f0;
}

.divider__text {
  font-size: 11.5px;
  font-weight: 500;
  color: #9ca3b8;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* Social Buttons */
.social-row {
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
}

.btn-social {
  flex: 1;
  padding: 11px 16px;
  border: 1.5px solid #e5e7f0;
  border-radius: 10px;
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.btn-social:hover {
  border-color: #c5caee;
  background: #f5f6ff;
  box-shadow: 0 2px 8px rgba(91,110,245,0.09);
}

.btn-social i, .btn-social svg {
  font-size: 18px;
}

.signup-line {
  font-size: 13.5px;
  color: #6b7280;
  text-align: center;
}

.signup-link {
  color: #4F39F6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.signup-link:hover { color: #2B7FFF; }
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.38s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.image-transition-enter-active,
.image-transition-leave-active {
  transition: all 0.4s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-transition-enter-from {
  opacity: 0;
  transform: scale(0.94);
}

.image-transition-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

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
  .brand { font-size: 36px; }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
}

@media (max-width: 520px) {
  .page-bg { padding: 0; }
  .card {
    border-radius: 0;
    max-width: 100%;
    min-height: 100vh;
  }
  .card__left { flex: 0 0 200px; min-height: 200px; }
  .card__right { padding: 28px 24px 32px; }
  .brand { font-size: 30px; }
  .social-row { flex-direction: column; }
  @keyframes floatUpDown {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
}
</style>