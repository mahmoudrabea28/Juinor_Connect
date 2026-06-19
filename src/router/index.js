import { createRouter, createWebHistory } from 'vue-router'

/* ================= AUTH ================= */
import register from '../views/auth/register.vue'
import forgot_password from '../views/auth/forgot_password.vue'
import OTP from '../views/auth/OTP.vue'
import resetpassword from '../views/auth/reset_password.vue'
import congrate from '../views/auth/congrate.vue'

/* ================= HOME ================= */
import Home from '../views/Home/Home.vue'

/* ================= DASHBOARD ================= */
import Overview from '../views/Dahboard/Overview.vue'
import TeamBrowse from '../views/Dahboard/TeamBrowse.vue'
import Myproject1 from '../views/Dahboard/Myproject1.vue'
import AI_Mentor from '../views/Dahboard/AI_Mentor.vue'
import ChatAI from '../views/Dahboard/ChatAI.vue'

/* ================= ONBOARDING ================= */
import ScreenPersonalInfo from '../views/Onboarding/ScreenPersonalInfo.vue'
import ScreenSkills from '../views/Onboarding/ScreenSkills.vue'
import ScreenInterests from '../views/Onboarding/ScreenInterests.vue'
import ScreenExperience from '../views/Onboarding/ScreenExperience.vue'
import ScreenAvailability from '../views/Onboarding/ScreenAvailability.vue'
import Availability from '../views/Onboarding/Availability.vue'
import MatchwithAi from '../views/Onboarding/MatchwithAi.vue'
import AIResult from '../views/Onboarding/AIResult.vue'

/* ================= PROJECTS ================= */
import Dashboard from '../views/ProjectManagment/Dashboard.vue'
import AllProjects from '../views/ProjectManagment/AllProjects.vue'
import ProjectDetails from '../views/ProjectManagment//Projectdetails.vue'

const routes = [
  /* ===== root ===== */
  {
    path: '/',
    redirect: '/Home'
  },

  /* ================= AUTH ================= */
  { path: '/register', component: register },
  { path: '/forgot_password', component: forgot_password },
  { path: '/otp', component: OTP },
  { path: '/reset_password', component: resetpassword },
  { path: '/congrate', component: congrate },

  /* ================= HOME ================= */
  { path: '/Home', component: Home },

  /* ================= DASHBOARD ================= */
  { path: '/Overview', component: Overview },
  { path: '/TeamBrowse', component: TeamBrowse },
  { path: '/Myproject1', component: Myproject1 },
  { path: '/AI_Mentor', component: AI_Mentor },
  { path: '/ChatAI', component: ChatAI },

  /* ================= ONBOARDING ================= */
  { path: '/ScreenPersonalInfo', component: ScreenPersonalInfo },
  { path: '/ScreenSkills', component: ScreenSkills },
  { path: '/ScreenInterests', component: ScreenInterests },
  { path: '/ScreenExperience', component: ScreenExperience },
  { path: '/ScreenAvailability', component: ScreenAvailability },
  { path: '/Availability', component: Availability },
  { path: '/MatchwithAi', component: MatchwithAi },
  { path: '/AIResult', component: AIResult },

  /* ================= PROJECTS MODULE ================= */

  {
    path: '/projects',
    name: 'ProjectsDashboard',
    component: Dashboard
  },

  {
    path: '/projects/allProjects',
    name: 'AllProjects',
    component: AllProjects
  },

  {
    path: '/projects/:status(in-progress|completed)',
    name: 'ProjectsByStatus',
    component: AllProjects
  },

  {
    path: '/projects/:id(\\d+)',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router