<template>
  <DashboardLayout>
    <div class="my-projects-container">
      
      <div class="page-banner">
        <span>MY PROJECTS</span>
        <h1>Manage Your Journey</h1>
        <p>Build your portfolio and track your progress.</p>
      </div>

      <div class="status-tabs">
        <button 
          :class="['tab-btn', currentTab === 'active' ? 'active' : 'inactive']"
          @click="currentTab = 'active'"
        >
          Active Projects
        </button>
        <button 
          :class="['tab-btn', currentTab === 'completed' ? 'active' : 'inactive']"
          @click="currentTab = 'completed'"
        >
          Completed
        </button>
      </div>

      <div class="projects-list">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="index" 
          :class="['project-card', project.colorClass]"
        >
          <div class="card-header">
            <div class="project-profile">
              <div class="project-avatar-box">
                <img :src="getImageUrl(project.avatar)" alt="project icon">
              </div>
              <div class="project-meta">
                <h2>{{ project.title }}</h2>
                <p>
                  <span class="project-span">{{ project.category }}</span> 
                  · {{ project.membersCount }} members
                </p>
              </div>
            </div>

            <div v-if="currentTab === 'active'" class="complete-score">
              <span class="score-num">{{ project.completionRate }}%</span>
              <span class="score-label">Complete</span>
            </div>
            <span v-else class="completed-badge">Completed</span>
          </div>

          <div class="project-desc">
            {{ project.description }}
          </div>

          <div class="project-tags">
            <span v-for="(tag, tIdx) in project.tags" :key="tIdx" class="project-tag">
              {{ tag }}
            </span>
          </div>

          <div v-if="currentTab === 'active'">
            <div class="progress-label">
              <span>Match Score</span> 
              <span>{{ project.matchScore }}%</span>
            </div>
            <div class="progress-bg">
              <div class="progress-fill" :style="{ width: project.matchScore + '%' }"></div>
            </div>

            <div class="tasks-container">
              <div class="task-card deadline">
                <div class="task-icon-box">
                  <span class="material-symbols-outlined">alarm</span>
                </div>
                <div class="task-meta">
                  <h4>Next Major Deadline</h4>
                  <p>{{ project.deadline }}</p>
                </div>
              </div>
              
              <div class="task-card ai">
                <div class="task-icon-box">
                  <span class="material-symbols-outlined">psychology</span>
                </div>
                <div class="task-meta">
                  <h4>AI Mentor Task</h4>
                  <p>{{ project.aiTask }}</p>
                </div>
              </div>
            </div>

            <hr class="card-divider">

            <div class="card-footer">
              <button class="btn-open" @click="openWorkspace(project)">
                <span class="material-symbols-outlined play-icon">play_arrow</span>
                Open Workspace
              </button>
              <a href="#" class="link-details" @click.prevent="viewDetails(project)">
                <span class="material-symbols-outlined">visibility</span>
                <span class="link-details-text">View Details</span>
              </a>
            </div>
          </div>

          <div v-else class="card-actions">
            <button class="btn-case-study" @click="viewCaseStudy(project)">
              <span class="material-symbols-outlined icon">visibility</span>
              View Case Study
            </button>
            <button class="btn-github" @click="openGithub(project)">
              <span class="material-symbols-outlined icon">code</span>
              GitHub Repo
            </button>
          </div>

        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 

export default {
  name: 'MyProjects',
  components: {
    DashboardLayout
  },
  data() {
    return {
      currentTab: 'active',
      // دمجنا كل البيانات (الأكتيف والكومبليتيد) في مصفوفة واحدة مع تحديد الـ status
      projects: [
        {
          title: 'Portfolio App Builder',
          category: 'Developer Tools',
          membersCount: 4,
          colorClass: 'purple', // غيرتها لـ purple عشان تتماشى مع الـ CSS بتاعك
          completionRate: 92,
          matchScore: 92,
          avatar: '../../assets/images/git-fork.png',
          description: 'A drag-and-drop portfolio generator for developers with live GitHub integration.',
          tags: ['TypeScript', 'Node.js', 'Tailwind', 'GitHub', 'API'],
          deadline: 'Jun 19, 2026',
          aiTask: 'Review component hierarchy and suggest code splitting strategies.',
          status: 'active'
        },
        {
          title: 'A.I. Mentor Platform',
          category: 'AI / EdTech',
          membersCount: 4,
          colorClass: 'yellow',
          completionRate: 65,
          matchScore: 65,
          avatar: '../../assets/images/git-fork.png',
          description: 'Build a smart peer-learning tool that matches junior devs with AI guidance and real team projects.',
          tags: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
          deadline: 'Jun 28, 2026',
          aiTask: 'Analyze project architecture for potential bottlenecks in the auth flow.',
          status: 'active'
        },
        {
          title: 'DevOps Dashboard',
          category: 'DevOps',
          membersCount: 5,
          colorClass: 'blue',
          avatar: '../../assets/images/git-fork.png',
          description: 'Real-time CI/CD pipeline monitor with Slack notifications and health metrics.',
          tags: ['React Dev', 'Docker', 'Kubernetes', 'Go'],
          status: 'completed'
        },
        {
          title: 'Open Source CMS',
          category: 'CMS',
          membersCount: 6,
          colorClass: 'purple',
          avatar: '../../assets/images/git-fork.png',
          description: 'Headless content management system with a plugin architecture.',
          tags: ['Vue.js', 'GraphQL', 'PostgreSQL'],
          status: 'completed'
        },
        {
          title: 'AI Recruitment Platform',
          category: 'HR Tech',
          membersCount: 4,
          colorClass: 'yellow',
          avatar: '../../assets/images/git-fork.png',
          description: 'AI-powered hiring platform with resume screening, candidate ranking, and interview scheduling.',
          tags: ['React', 'Node.js', 'MongoDB', 'OpenAI API'],
          status: 'completed'
        }
      ]
    };
  },
  computed: {
    // الفلترة بتتم تلقائياً أول ما تضغط على الـ Tab
    filteredProjects() {
      return this.projects.filter(project => project.status === this.currentTab);
    }
  },
  methods: {
    getImageUrl(path) {
      return new URL(path, import.meta.url).href;
    },
    openWorkspace(project) {
      console.log('Opening workspace for:', project.title);
    },
    viewDetails(project) {
      console.log('Viewing details for:', project.title);
    },
    viewCaseStudy(project) {
      console.log('Viewing Case Study for:', project.title);
    },
    openGithub(project) {
      console.log('Opening GitHub Repo for:', project.title);
    }
  }
}
</script>

<style scoped>
.my-projects-container {
  padding: 32px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}

/* --- Top Banner --- */
.page-banner {
  background-color: #ffffff;
  background-image: url('../../assets/images/Hero\ section.png');
  background-repeat: no-repeat;
  background-size: 85%;
  background-position: center right;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(26, 27, 35, 0.05);
}

.page-banner::before {
  content: '';
  position: absolute;
  top: -30px;
  left: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(37, 99, 235, 0.25);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.page-banner::after {
  content: '';
  position: absolute;
  bottom: -50px;
  right: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 170, 0, 0.3);
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.page-banner span, .page-banner h1, .page-banner p {
  position: relative;
  z-index: 1;
}

.page-banner span {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #64748b;
  font-weight: 600;
}

.page-banner h1 {
  font-size: 24px;
  color: #131927;
  margin: 8px 0;
  font-weight: 700;
}

.page-banner p {
  color: #64748b;
  font-size: 14px;
}

/* --- Project Status Tabs --- */
.status-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.tab-btn.active {
  background-color: #4E61F6;
  color: #ffffff;
  border: 1px solid #4E61F6;
}

.tab-btn.inactive {
  background-color: #ffffff;
  color: #4E61F6;
  border: 1px solid #4E61F6;
}

/* --- Project Card Styles --- */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-card {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid rgba(26, 27, 35, 0.03);
}

.project-card.blue { background-color: #E7F5FF; }
.project-card.purple { background-color: #F4F0FE; }
.project-card.yellow { background-color: #FFFAE5; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-profile {
  display: flex;
  gap: 16px;
  align-items: center;
}

.project-avatar-box {
  width: 48px;
  height: 48px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.project-avatar-box img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.project-meta h2 {
  font-size: 18px;
  color: #131927;
  font-weight: 600;
}

.project-meta p {
  font-size: 13px;
  color: #64748b;
  margin-top: 2px;
}

.project-span {
  background: #F2F3FF;
  border: 1px solid #4E61F6;
  color: #4E61F6;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  display: inline-block;
}

.complete-score {
  text-align: right;
}

.complete-score .score-num {
  font-size: 20px;
  font-weight: 700;
  color: #131927;
}

.complete-score .score-label {
  font-size: 11px;
  color: #131927;
  font-weight: 600;
  display: block;
  margin-top: 2px;
}

.completed-badge {
  background-color: rgba(67, 183, 93, 0.2);
  color: #43B75D;
  border: 1px solid #43B75D;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.project-desc {
  font-size: 14px;
  color: #131927;
  line-height: 1.5;
}

/* Tags */
.project-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.project-tag {
  background: #ffffff;
  border: 1px solid #4E61F6;
  color: #4E61F6;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* Progress Section (Active Only) */
.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #131927;
  margin-top: 14px;
  margin-bottom: 6px;
}

.progress-bg {
  background-color: #EDEFFE;
  height: 8px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
}

.progress-fill {
  background-color: #4E61F6;
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

/* Tasks & Deadline Internal Cards (Active Only) */
.tasks-container {
  display: flex;
  gap: 16px;
  margin-top: 14px;
  position: relative;
}

.task-card {
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  width: 50%;
  z-index: 1;
}

.task-card.deadline { background-color: #FFFAE5; }
.task-card.ai { background-color: #F4F0FE; }

.task-icon-box {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.task-icon-box span {
  font-size: 20px;
  color: #131927;
}

.task-meta h4 {
  font-size: 14px;
  color: #131927;
  font-weight: 600;
}

.task-meta p {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.card-divider {
  height: 1px;
  background-color: rgba(19, 25, 39, 0.1);
  margin-top: 14px;
  margin-bottom: 4px;
  border: none;
}

/* Card Actions Footer (Active) */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
}

.btn-open {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #4E61F6;
  color: #fff;
  border: none;
  transition: all 0.2s ease;
}

.btn-open:hover { background: #3b4ed1; }

.link-details {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #4E61F6;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.link-details-text { border-bottom: 1.5px solid #4E61F6; }

/* Actions Buttons (Completed Only) */
.card-actions {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

.btn-case-study {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #4E61F6;
  color: #fff;
  border: none;
  transition: all 0.2s ease;
}

.btn-case-study:hover { background: #3b4ed1; }

.btn-github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #ffffff;
  color: #4E61F6;
  border: 1px solid rgba(78, 97, 246, 0.2);
  transition: all 0.2s ease;
}

.btn-github:hover { background: #F2F3FF; }
</style>