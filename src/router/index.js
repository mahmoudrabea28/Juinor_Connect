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
import BrowseTeamsPage from '../views/Dahboard/BrowseTeamsPage.vue'
import TeamDetailsPage from '../views/Dahboard/TeamDetailsPage.vue'

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
/*----------------hepl center---------------------*/
import HelpCenter from '../views/pages/HelpCenter.vue'
import FAQ from '../views/pages/FAQ.vue'
import Feedback from '../views/pages/Feedback.vue'
import Guides from '../views/pages/Guides.vue'
import Support from '../views/pages/Support.vue'
import Terms from '../views/pages/Terms.vue'
/*--------profile----------*/
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AccountDeletedPage from '../views/profile/AccountDeletedPage.vue'
import AchievementsPage from '../views/profile/AchievementsPage.vue'
import PersonalInformationPage from '../views/profile/PersonalInformationPage.vue'
import PortfolioPage from '../views/profile/PortfolioPage.vue'
import PrivacySecurityPage from '../views/profile/PrivacySecurityPage.vue'
import ProfilePage from '../views/profile/ProfilePage.vue'
import SkillsPage from '../views/profile/SkillsPage.vue'
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
  { path: '/Overview', component: Overview,   meta: { requiresAuth: true } },
  { path: '/TeamBrowse', component: TeamBrowse },
  { path: '/Myproject1', component: Myproject1 },
  { path: '/AI_Mentor', component: AI_Mentor , meta: { requiresAuth: true }},
  { path: '/ChatAI', component: ChatAI },
  { path: '/browse-teams', name: 'BrowseTeamsPage', component: BrowseTeamsPage,   meta: { requiresAuth: true } },
  { path: '/browse-teams/:id', name: 'TeamDetailsPage', component: TeamDetailsPage, props: true },

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
    component: Dashboard,
      meta: { requiresAuth: true }
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
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true
  }
  /*----------------help center------------------------*/
    ,{ path: '/help-center', name: 'HelpCenter', component: HelpCenter },
  { path: '/faq', name: 'FAQ', component: FAQ },
  { path: '/guides', name: 'Guides', component: Guides },
  { path: '/support', name: 'Support', component: Support },
  { path: '/feedback', name: 'Feedback', component: Feedback },
  { path: '/terms', name: 'Terms', component: Terms },
  /*------------profile-------------*/
   {
    path: '',path: '/DashboardLayout',
    component: DashboardLayout,
    children: [
      { path: '/profile', name: 'Profile', component: ProfilePage },
      { path: '/personal-information', name: 'PersonalInformation', component: PersonalInformationPage },
      { path: '/skills', name: 'Skills', component: SkillsPage },
      { path: '/portfolio', name: 'Portfolio', component: PortfolioPage },
      { path: '/achievements', name: 'Achievements', component: AchievementsPage },
      { path: '/privacy-security', name: 'PrivacySecurity', component: PrivacySecurityPage },
    ],
  },
  // Standalone page — renders without Navbar or Sidebar.
  { path: '/account-deleted', name: 'AccountDeleted', component: AccountDeletedPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/register')
  } else {
    next()
  }
})
export default router