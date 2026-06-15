import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/auth/register.vue'
import forgot_password from '../views/auth/forgot_password.vue'
import OTP from '../views/auth/OTP.vue'
import resetpassword from '../views/auth/reset_password.vue'
import congrate from '../views/auth/congrate.vue'
import Home from '../views/Home/Home.vue'
import Overview from '../views/Dahboard/Overview.vue'
import TeamBrowse from '../views/Dahboard/TeamBrowse.vue'
import Myproject1 from '../views/Dahboard/Myproject1.vue'
import AI_Mentor from '../views/Dahboard/AI_Mentor.vue'
import ChatAI from '../views/Dahboard/ChatAI.vue'
import Dashboard_Navbar from '../components/Dashboard_Navbar.vue'
const routes = [
  {
    path: '/',
    redirect: '/Home'
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
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
   {
    path: '/Overview',
    name: 'Overview',
    component: Overview
  },
   {
    path: '/TeamBrowse',
    name: 'TeamBrowse',
    component: TeamBrowse
  },
   {
    path: '/Myproject1',
    name: 'Myproject1',
    component: Myproject1
  },
   {
    path: '/AI_Mentor',
    name: 'AI_Mentor',
    component: AI_Mentor
  },
   {
    path: '/ChatAI',
    name: 'ChatAI',
    component: ChatAI
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router