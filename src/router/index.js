// import { createRouter, createWebHistory } from 'vue-router'
// import register from '../views/auth/register.vue'
// import forgot_password from '../views/auth/forgot_password.vue'
// import OTP from '../views/auth/OTP.vue'
// import resetpassword from '../views/auth/reset_password.vue'
// import congrate from '../views/auth/congrate.vue'
// import Dashboard from '../views/projectManagment/Dashboard.vue'
// import AllProjects from '../views/projectManagment/AllProjects.vue' 
// const routes = [
//   // {
//   //   path: '/',
//   //   redirect: '/register'
//   // },
//   // {
//   //   path: '/register',
//   //   name: 'register',
//   //   component: register
//   // },
//   // {
//   //   path: '/forgot_password',
//   //   name: 'forgetPassword',
//   //   component: forgot_password
//   // },
//   // {
//   //   path: '/otp',
//   //   name: 'otp',
//   //   component: OTP
//   // },
//   // {
//   //   path: '/reset_password',
//   //   name: 'resetPassword',
//   //   component: resetpassword
//   // },
//   // {
//   //   path: '/congrate',
//   //   name: 'congrate',
//   //   component: congrate
//   // }
//   {
//       path: '/',
//       name: 'dashboard',
//       component: Dashboard
//     },
//     {
//       path: '/projects/:status?', 
//       name: 'all-projects',
//       component: AllProjects,
//       props: true 
//     }
//     ,
//      {
//     // /projects/in-progress  →  filters to in-progress tab
//     // /projects/completed    →  filters to completed tab
//     path: '/projects/:status',
//     name: 'ProjectsByStatus',
//     component: AllProjects,
//     // Optional: guard against unknown status values
//     beforeEnter(to, from, next) {
//       const allowed = ['in-progress', 'completed']
//       if (!allowed.includes(to.params.status)) {
//         next({ name: 'AllProjects' })
//       } else {
//         next()
//       }
//     },
//   },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router






// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/projectManagment/Dashboard.vue'
import AllProjects from '../views/projectManagment/AllProjects.vue'
import ProjectDetails from '../views/projectManagment/Projectdetails.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/projects',
    name: 'AllProjects',
    component: AllProjects,
  },
  {
    path: '/projects/:status(in-progress|completed)',
    name: 'ProjectsByStatus',
    component: AllProjects,
  },
  {
    path: '/projects/:id(\\d+)',
    name: 'project-details',
    component: ProjectDetails,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router










