<template>
  <div>
    <!-- Page header -->
    <h1 class="text-2xl font-serif text-gray-900">Privacy & Security</h1>
    <p class="text-sm text-gray-400 mt-1 mb-6">Control who can see your profile and keep your account secure.</p>

    <div class="space-y-4">
      <VisibilityCard />
      <AccountSecurityCard />
      <DataAccountCard @request-export="handleExport" />
    </div>

    <!-- Change Password modal -->
    <ChangePasswordModal v-if="privacyStore.showChangePassword" />

    <!-- Sessions modal -->
    <SessionsModal v-if="privacyStore.showSessions" />

    <!-- Delete Account confirmation modal -->
    <DeleteAccountModal
      v-if="privacyStore.showDeleteConfirm"
      @confirm-delete="handleDeleteAccount"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { privacyStore } from '../../state/privacyStore.js'
import { profileStore } from '../../state/profileStore.js'
import { skillsStore } from '../../state/skillsStore.js'
import { portfolioStore } from '../../state/portfolioStore.js'
import { achievementsStore } from '../../state/achievementsStore.js'

import VisibilityCard from '../../components/profile/VisibilityCard.vue'
import AccountSecurityCard from '../../components/profile/AccountSecurityCard.vue'
import DataAccountCard from '../../components/profile/DataAccountCard.vue'
import ChangePasswordModal from '../../components/profile/ChangePasswordModal.vue'
import SessionsModal from '../../components/profile/SessionsModal.vue'
import DeleteAccountModal from '../../components/profile/DeleteAccountModal.vue'

const router = useRouter()

// ── Request Export ─────────────────────────────────────────────────
function handleExport() {
  const data = {
    profile: { ...profileStore.profile },
    personalInfo: { ...profileStore.personalInfo },
    skills: [...skillsStore.selectedSkills],
    portfolio: portfolioStore.projects.map((p) => ({
      id: p.id,
      title: p.title,
      role: p.role,
      description: p.description,
      tech: [...p.tech],
      liveDemo: p.liveDemo,
      github: p.github,
    })),
    achievements: {
      earned: [...achievementsStore.earnedBadges],
      milestones: [...achievementsStore.milestones],
    },
  }
  privacyStore.requestExport(data)
}

// ── Delete Account ─────────────────────────────────────────────────
// Resets every store back to its initial state, then redirects to /login.
// There is no real login page in this project, so we redirect to /profile
// (which represents a fresh "logged out" state for demo purposes).
function handleDeleteAccount() {
  privacyStore.closeDeleteConfirm()

  // Reset profile store
  const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=47'
  Object.assign(profileStore.profile, {
    name: 'Emily Davis',
    headline: 'Frontend Developer · Student',
    bio: 'Passionate about building real products and learning through collaboration. Currently exploring React ecosystems and UX patterns.',
    avatar: DEFAULT_AVATAR,
  })
  profileStore.skills = [
    { label: 'Figma', gradient: true },
    { label: 'HTML', gradient: false },
    { label: 'CSS', gradient: false },
  ]
  Object.assign(profileStore.personalInfo, {
    fullName: '', role: '', bio: '', github: '', linkedin: '', location: '',
  })

  // Reset skills store
  skillsStore.selectedSkills = [
    { id: 'react', name: 'React', level: 'Intermediate' },
    { id: 'figma', name: 'Figma', level: 'Advanced' },
    { id: 'python', name: 'Python', level: 'Beginner' },
    { id: 'nodejs', name: 'Node.js', level: 'Intermediate' },
  ]
  skillsStore.closeModal()

  // Reset portfolio store
  portfolioStore.projects = []
  portfolioStore.closeModal()

  // Reset achievements store
  achievementsStore.earnedBadges = [
    { id: 1, title: 'First Project Joined', type: 'PIONEER', earnedDate: 'Earned June 2025', icon: 'rocket' },
    { id: 2, title: 'Skill Master', type: 'MASTER', earnedDate: 'Earned June 2025', icon: 'star' },
  ]
  achievementsStore.lockedBadges = [
    { id: 10, title: 'Team Leader', requirement: 'Complete 3 projects to unlock', icon: 'team', progressLabel: 'Projects', current: 2, goal: 3 },
    { id: 11, title: 'Community Pillar', requirement: 'Receive 5 endorsements', icon: 'community', progressLabel: 'Endorsements', current: 1, goal: 5 },
    { id: 12, title: 'Continuous Learner', requirement: 'Finish 5 skill assessments', icon: 'learner', progressLabel: 'Assessments', current: 4, goal: 5 },
    { id: 13, title: 'Super Contributor', requirement: 'Commit to 10 repositories', icon: 'contributor', progressLabel: 'Repos', current: 4, goal: 10 },
  ]

  // Reset privacy store
  privacyStore.resetSelf()

  // Redirect to the account-deleted success screen instead of /profile.
  router.push('/account-deleted')
}
</script>
