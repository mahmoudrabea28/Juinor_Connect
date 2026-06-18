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
import ScreenPersonalInfo from '../views/Onboarding/ScreenPersonalInfo.vue'
import ScreenSkills from '../views/Onboarding/ScreenSkills.vue'
import ScreenInterests from '../views/Onboarding/ScreenInterests.vue'
import ScreenExperience from '../views/Onboarding/ScreenExperience.vue'
import ScreenAvailability from '../views/Onboarding/ScreenAvailability.vue'
import Availability from '../views/Onboarding/Availability.vue'
import MatchwithAi from '../views/Onboarding/MatchwithAi.vue'
import AIResult from '../views/Onboarding/AIResult.vue'
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
   {
    path: '/ScreenPersonalInfo',
    name: 'ScreenPersonalInfo',
    component:ScreenPersonalInfo
  },
   {
    path: '/ScreenSkills',
    name: 'ScreenSkills',
    component:ScreenSkills
  },
   {
    path: '/ScreenInterests',
    name: 'ScreenInterests',
    component:ScreenInterests
  },
   {
    path: '/ScreenExperience',
    name: 'ScreenExperience',
    component:ScreenExperience
  },
   {
    path: '/ScreenAvailability',
    name: 'ScreenAvailability',
    component:ScreenAvailability
  },
   {
    path: '/Availability',
    name: 'Availability',
    component:Availability
  },
   {
    path: '/MatchwithAi',
    name: 'MatchwithAi',
    component:MatchwithAi 
  },
   {
    path: '/AIResult',
    name: 'AIResult',
    component:AIResult 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router