import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/auth/register.vue'
import forgot_password from '../views/auth/forgot_password.vue'
import OTP from '../views/auth/OTP.vue'
import resetpassword from '../views/auth/reset_password.vue'
import congrate from '../views/auth/congrate.vue'
const routes = [
  {
    path: '/',
    redirect: '/register'
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/forgot_password',
    name: 'forgetPassword',
    component: forgot_password
  },
  {
    path: '/otp',
    name: 'otp',
    component: OTP
  },
  {
    path: '/reset_password',
    name: 'resetPassword',
    component: resetpassword
  },
  {
    path: '/congrate',
    name: 'congrate',
    component: congrate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router