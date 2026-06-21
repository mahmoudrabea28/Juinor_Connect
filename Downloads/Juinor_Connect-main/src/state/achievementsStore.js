import { reactive } from 'vue'

let _nextEarnedId = 100

export const achievementsStore = reactive({
  // ── Earned badges ────────────────────────────────────────────────
  earnedBadges: [
    {
      id: 1,
      title: 'First Project Joined',
      type: 'PIONEER',
      earnedDate: 'Earned June 2025',
      icon: 'rocket',
    },
    {
      id: 2,
      title: 'Skill Master',
      type: 'MASTER',
      earnedDate: 'Earned June 2025',
      icon: 'star',
    },
  ],

  // ── Locked badges ────────────────────────────────────────────────
  lockedBadges: [
    {
      id: 10,
      title: 'Team Leader',
      requirement: 'Complete 3 projects to unlock',
      icon: 'team',
      progressLabel: 'Projects',
      current: 2,
      goal: 3,
    },
    {
      id: 11,
      title: 'Community Pillar',
      requirement: 'Receive 5 endorsements',
      icon: 'community',
      progressLabel: 'Endorsements',
      current: 1,
      goal: 5,
    },
    {
      id: 12,
      title: 'Continuous Learner',
      requirement: 'Finish 5 skill assessments',
      icon: 'learner',
      progressLabel: 'Assessments',
      current: 4,
      goal: 5,
    },
    {
      id: 13,
      title: 'Super Contributor',
      requirement: 'Commit to 10 repositories',
      icon: 'contributor',
      progressLabel: 'Repos',
      current: 4,
      goal: 10,
    },
  ],

  // ── Milestones timeline ──────────────────────────────────────────
  milestones: [
    {
      id: 1,
      title: 'Profile Completed',
      date: 'June 1, 2025',
      note: "You've unlocked the full potential of JuniorConnect by sharing your story.",
      locked: false,
    },
    {
      id: 2,
      title: 'First Team Joined',
      date: 'June 5, 2025',
      note: 'Collaboration is the heart of engineering. Welcome to the team!',
      locked: false,
    },
    {
      id: 3,
      title: 'First Project Launched',
      date: null,
      note: null,
      locked: true,
    },
    {
      id: 4,
      title: 'Mentor Rating Received',
      date: null,
      note: null,
      locked: true,
    },
  ],

  // ── Computed helpers ─────────────────────────────────────────────
  calculatePercentage(current, goal) {
    if (!goal) return 0
    return Math.min(100, Math.round((current / goal) * 100))
  },

  // ── Progress mutations ───────────────────────────────────────────
  increaseProgress(id) {
    const badge = this.lockedBadges.find((b) => b.id === id)
    if (!badge) return
    if (badge.current < badge.goal) {
      badge.current++
    }
    if (badge.current >= badge.goal) {
      this.unlockBadge(id)
    }
  },

  decreaseProgress(id) {
    const badge = this.lockedBadges.find((b) => b.id === id)
    if (!badge) return
    if (badge.current > 0) badge.current--
  },

  // ── Badge unlock ─────────────────────────────────────────────────
  unlockBadge(id) {
    const index = this.lockedBadges.findIndex((b) => b.id === id)
    if (index === -1) return
    const badge = this.lockedBadges[index]
    this.lockedBadges.splice(index, 1)
    this.addEarnedBadge({
      title: badge.title,
      type: badge.progressLabel.toUpperCase(),
      earnedDate: `Earned ${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}`,
      icon: badge.icon,
    })
  },

  addEarnedBadge({ title, type, earnedDate, icon }) {
    this.earnedBadges.push({
      id: _nextEarnedId++,
      title,
      type,
      earnedDate,
      icon,
    })
  },

  // ── Milestone mutations ──────────────────────────────────────────
  completeMilestone(id) {
    const milestone = this.milestones.find((m) => m.id === id)
    if (milestone) {
      milestone.locked = false
      milestone.date = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
  },

  lockMilestone(id) {
    const milestone = this.milestones.find((m) => m.id === id)
    if (milestone) {
      milestone.locked = true
      milestone.date = null
      milestone.note = null
    }
  },
})
