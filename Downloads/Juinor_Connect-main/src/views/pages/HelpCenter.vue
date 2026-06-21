<template>
<Header />
  <div class="page-container">
    <router-link to="/help-center" class="back-link">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 3L5 8L9.5 13" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </router-link>

    <div class="hero">
      <h1>How can we help you today?</h1>
      <p>Find answers, guides, and support to make the most of Junior Connect.</p>
    </div>

    <div class="search-wrapper">
      <SearchInput v-model="searchQuery" placeholder="Search for articles, guides,FAQs..." />
    </div>

    <h2 class="section-title">Browse by Category</h2>
    <div class="category-grid">
      <CategoryCard
        v-for="cat in categories"
        :key="cat.title"
        :title="cat.title"
        :description="cat.description"
        :link="cat.link"
      >
        <template #icon>
          <component :is="cat.icon" />
        </template>
      </CategoryCard>
    </div>

    <h2 class="section-title">Popular Articles</h2>
    <ArticleAccordion :items="filteredArticles" />

    <GradientBanner
      title="Still need help?"
      description="Our support team is here to assist you. Get personalized help with your questions and issues."
      button-text="Contact Support"
      @action="goToSupport"
    />
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import SearchInput from '../../components/help center/SearchInput.vue'
import CategoryCard from '../../components/help center/CategoryCard.vue'
import ArticleAccordion from '../../components/help center/ArticleAccordion.vue'
import GradientBanner from '../../components/help center/GradientBanner.vue'
import Header from '../../components/help center/Header.vue'
import Footer from '../../components/help center/Footer.vue'
const router = useRouter()
const searchQuery = ref('')

function goToSupport() {
  router.push('/support')
}

// Inline icon render functions
const IconFAQ = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', 'stroke-width': 1  }),
    h('path', { d: 'M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.7-.9 1.4v.6', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
    h('circle', { cx: 12, cy: 17, r: 0.9, fill: 'currentColor' }),
  ])

const IconGuides = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('rect', { x: 3, y: 4, width: 18, height: 13, rx: 2, stroke: 'currentColor', 'stroke-width': 1 }),
    h('circle', { cx: 9, cy: 10.5, r: 1.5, fill: 'currentColor' }),
    h('path', { d: 'M3 17l5-4 4 3 6-5 3 3', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const IconSupport = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('path', { d: 'M12 3a8 8 0 0 0-8 8v4a2 2 0 0 0 2 2h2v-6H6v-0a6 6 0 1 1 12 0v0h-2v6h2a2 2 0 0 0 2-2v-4a8 8 0 0 0-8-8z', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linejoin': 'round' }),
  ])

const IconFeedback = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('rect', { x: 3, y: 4, width: 18, height: 13, rx: 2, stroke: 'currentColor', 'stroke-width': 1 }),
    h('path', { d: 'M7 21l3-4h4l3 4', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])

const IconTerms = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('path', { d: 'M14 2.5l5.5 5.5V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V4A1.5 1.5 0 0 1 6 2.5h8z', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linejoin': 'round' }),
    h('path', { d: 'M14 2.5V8h5.5', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linejoin': 'round' }),
    h('path', { d: 'M8 12h8M8 16h8', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linecap': 'round' }),
  ])

const categories = [
  {
    title: 'FAQ',
    description: 'Quick answers to the most common questions.',
    link: '/faq',
    icon: IconFAQ,
  },
  {
    title: 'Guides',
    description: 'Step-by-step tutorials for using Junior Connect.',
    link: '/guides',
    icon: IconGuides,
  },
  {
    title: 'Support',
    description: 'Get help from our support team.',
    link: '/support',
    icon: IconSupport,
  },
  {
    title: 'Feedback',
    description: 'Share ideas, suggestions, and report issues.',
    link: '/feedback',
    icon: IconFeedback,
  },
  {
    title: 'Terms & Policies',
    description: 'Understand platform rules and privacy policies.',
    link: '/terms',
    icon: IconTerms,
  },
]

const popularArticles = [
  {
    title: 'Getting Started with Junior Connect',
    content:
      'Learn how to set up your account, complete your profile, and start exploring the project marketplace to find your first team.',
  },
  {
    title: 'How Team Matching Works',
    content:
      'Our matching system pairs you with projects based on your listed skills, interests, and availability for the best fit.',
  },
  {
    title: 'Creating Your First Project',
    content:
      'Step-by-step instructions for launching a project, defining roles, and attracting the right team members.',
  },
  {
    title: 'Joining an Existing Team',
    content:
      'Browse the marketplace, filter by role and skill, and submit applications to join projects that interest you.',
  },
  {
    title: 'Building a Strong Portfolio',
    content:
      'Pin your best projects, add detailed descriptions, and link external repositories to showcase your work effectively.',
  },
  {
    title: 'Communicating with Team Members',
    content:
      'Use the in-app messaging system to coordinate with your team, share updates, and stay aligned on project goals.',
  },
  {
    title: 'Reporting a Problem',
    content:
      'If you encounter inappropriate behavior or technical issues, use the report option or contact our support team directly.',
  },
  {
    title: 'Project Collaboration Best Practices',
    content:
      'Set clear expectations, communicate regularly, meet deadlines, and be transparent about your availability with your team.',
  },
]

const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) return popularArticles
  const q = searchQuery.value.toLowerCase()
  return popularArticles.filter(
    (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.hero {
  text-align: center;
  margin: 32px 0 28px;
}

.hero h1 {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 8px;
  color: var(--color-text);
}

.hero p {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.search-wrapper {
  max-width: 600px;
  margin: 0 auto 36px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--color-text);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
