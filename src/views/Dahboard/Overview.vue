<template>
  <DashboardLayout>
    <div class="dashboard-content">
      <div class="welcome-banner">
        <div class="welcome-text">
          <span class="date-tag">{{ todayDate }}</span>
          <h1>Welcome back, {{ user.name }}</h1>
          <p>
            Here's what's happening today in 
            <strong class="brand-text">Junior Connect</strong>. 
            You have {{ activeProjects.length }} active projects and {{ incomingDeadlinesCount }} upcoming deadlines.
          </p>
          <button class="ai-btn" @click="viewAIInsights">
            <img src="../../assets/images/magic-wand.png" alt="magic wand" width="20px" height="20px"> 
            View AI Insights 
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        
        <div class="ai-avatar-status">
          <div class="ai-badge-circle">
            <img src="../../assets/images/Icon.png" alt="AI Icon" width="120px">
          </div>
          <span class="ai-status-tag">AI Active</span>
        </div>
      </div>

      <div class="stats-grid">
        <div v-for="(stat, index) in stats" :key="index" :class="['stat-card', stat.colorClass]">
          <div class="stat-info">
            <h3>{{ stat.title }}</h3>
            <div class="number">{{ stat.value }}</div>
            <div class="subtext">{{ stat.subtext }}</div>
          </div>
          <img :src="stat.iconPath" :alt="stat.title" width="40px" height="40px">
        </div>
      </div>

      <div class="projects-section">
        <div class="section-title">
          <h2>My Active Projects</h2>
          <span class="badge">{{ activeProjects.length }} ongoing</span>
        </div>
        <div class="projects-container">
          <div v-for="(project, index) in activeProjects" :key="index" class="project-card">
            <div class="project-header">
              <span class="project-title">{{ project.title }}</span>
              <span class="project-percentage">{{ project.progress }}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: project.progress + '%' }"></div>
            </div>
            <div class="project-footer">
              <div class="tags">
                <span v-for="(tag, tIdx) in project.tags" :key="tIdx" class="tag">{{ tag }}</span>
              </div>
              <span class="project-date">
                <img src="../../assets/images/dashboard-dots.png" alt="dots"> {{ project.dueDate }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="deadlines-container">
        <div class="section-title">
          <h2>Upcoming Deadlines</h2>
          <button class="create-btn" @click="createNewProject">+ Create New Project</button>
        </div>
        <div class="deadline-list">
          <div 
            v-for="(deadline, index) in deadlines" 
            :key="index" 
            :class="['deadline-item', deadline.priority.toLowerCase()]"
          >
            <div class="deadline-info">
              <h4>{{ deadline.task }}</h4>
              <p>{{ deadline.projectName }}</p>
            </div>
            <div class="deadline-meta">
              <span class="deadline-date">
                <img src="../../assets/images/dashboard-dots.png" alt="dots"> {{ deadline.date }}
              </span>
              <span class="priority-badge">{{ deadline.priority }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 
import { toast } from "../../state/toastStore";
import Navbar from '../../components/Navbar.vue';
export default {
  name: 'DashboardContent',
  components: {
    DashboardLayout,
    Navbar
  },
  data() {
    return {
      todayDate: 'Friday, Jun 12',
      user: {
        name: 'Ahmed'
      },
    stats: [
  { 
    title: 'Active Projects', 
    value: 2, 
    subtext: '+1 this month', 
    colorClass: 'blue', 
    iconPath: new URL('../../assets/images/Frame 1984078491.png', import.meta.url).href 
  },
  { 
    title: 'Team Matches', 
    value: 8, 
    subtext: 'AI-curated', 
    colorClass: 'yellow', 
    iconPath: new URL('../../assets/images/mage_robot-wink.png', import.meta.url).href 
  },
  { 
    title: 'Tasks Due Soon', 
    value: 3, 
    subtext: 'Next 7 days', 
    colorClass: 'purple', 
    iconPath: new URL('../../assets/images/Frame 1984078490.png', import.meta.url).href 
  },
  { 
    title: 'Skill Score', 
    value: 75, 
    subtext: '+5 pts this week', 
    colorClass: 'orange', 
    iconPath: new URL('../../assets/images/Frame 1984078492.png', import.meta.url).href 
  }
],
      activeProjects: [
        { title: 'Portfolio App Builder', progress: 92, tags: ['Node.js', 'TypeScript'], dueDate: 'Jun 19, 2026' },
        { title: 'A.I. Mentor Platform', progress: 66, tags: ['React', 'Node.js'], dueDate: 'Jun 28, 2026' }
      ],
      deadlines: [
        { task: 'Complete auth flow refactor', projectName: 'A.I. Mentor Platform', date: 'Jun 16', priority: 'High' },
        { task: 'Finalize portfolio export', projectName: 'Portfolio App Builder', date: 'Jun 18', priority: 'Medium' },
        { task: 'Write API documentation', projectName: 'A.I. Mentor Platform', date: 'Jun 22', priority: 'Low' },
        { task: 'Deploy staging environment', projectName: 'Portfolio App Builder', date: 'Jun 19', priority: 'High' }
      ]
    };
  },
  computed: {
    incomingDeadlinesCount() {
      return this.deadlines.length;
    }
  },
  methods: {
    viewAIInsights() {
      toast.info('AI Insights feature coming soon');
    },
    createNewProject() {
      console.log('Redirecting to create a new project...');
    }
  }
}
</script>

<style scoped>
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* --- Welcome Banner Styles --- */
.welcome-banner {
  background-image: url('../../assets/images/Hero\ section.png');
  background-repeat: no-repeat;
  background-size: 35%;
  background-position: center right;
  background-color: #ffffff;
  border: 1px solid rgba(26, 27, 35, 0.05);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.welcome-banner::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(37, 99, 235, 0.3);
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.welcome-banner::after {
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

.welcome-text, .ai-avatar-status {
  position: relative;
  z-index: 1;
}

.welcome-text .date-tag {
  font-size: 12px;
  color: #4E61F6;
  background-color: #F2F3FF;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid #4E61F6;
}

.welcome-text h1 {
  font-size: 24px;
  color: #131927;
  margin: 12px 0 6px 0;
}

.welcome-text p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 16px;
  max-width: 65%;
}

.brand-text {
  color: #4E61F6;
}

.ai-btn {
  background-color: #4E61F6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
  width: 230px;
  text-align: center;
}

.ai-btn:hover {
  background-color: #3b4ed1;
}

.ai-avatar-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.ai-badge-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: #F2F3FF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.ai-badge-circle::after {
  content: '';
  position: absolute;
  top: 12px; 
  right: 12px; 
  width: 22px; 
  height: 22px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1); 
  background-image: radial-gradient(circle, #43B75D 40%, transparent 45%);
}

.ai-status-tag {
  background-color: rgba(67, 183, 93, 0.2);
  border: 1px solid #43B75D;
  color: #43B75D;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 15px;
  font-weight: 600;
  text-align: center;
  margin-top: -12px;
}

/* --- Stats Grid Styles --- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr; 
  }
}

.stat-card {
  padding: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-card.blue { background-color: #E7F5FF; }
.stat-card.yellow { background-color: #FFFAE5; }
.stat-card.purple { background-color: #F4F0FE; }
.stat-card.orange { background-color: #FEF4EA; }

.stat-info h3 {
  font-size: 14px;
  color: #131927;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-info .number {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
}

.stat-info .subtext {
  font-size: 12px;
  margin-top: 4px;
  font-weight: 600;
  color: #4E61F6;
  text-decoration: underline;
}

/* --- Section Layout Titles --- */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #0f172a;
  margin-bottom: 16px;
  font-weight: 600;
}

.section-title h2 {
  font-size: 18px;
}

.section-title span.badge {
  font-size: 12px;
  background-color: #F2F3FF;
  color: #4E61F6;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid #4E61F6;
}

/* --- Projects Section Styles --- */
.projects-container {
  background-color: #E7F5FF;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-title {
  font-weight: 600;
  color: #131927;
  font-size: 16px;
}

.project-percentage {
  font-weight: 700;
  color: #131927;
}

.progress-bar-bg {
  background-color: #EDEFFE;
  height: 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
  overflow: hidden;
}

.progress-bar-fill {
  background-color: #4E61F6;
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  border: 1px solid #4E61F6;
  background-color: #F2F3FF;
  color: #4E61F6;
  padding: 4px 10px;
  border-radius: 20px;
}

.project-date {
  font-size: 12px;
  color: #4E61F6;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* --- Deadlines Section Styles --- */
.deadlines-container {
  background-color: #F4F0FE;
  border-radius: 16px;
  padding: 20px;
}

.deadline-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.deadline-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.deadline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
}

.deadline-item.high::before { background-color: #ef4444; }
.deadline-item.medium::before { background-color: #f59e0b; }
.deadline-item.low::before { background-color: #10b981; }

.deadline-info h4 {
  font-size: 15px;
  color: #131927;
  font-weight: 600;
  margin-bottom: 4px;
}

.deadline-info p {
  font-size: 12px;
  color: #64748b;
}

.deadline-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.deadline-date {
  font-size: 12px;
  color: #010307;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}

.priority-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.high .priority-badge { background-color: #F2F3FF; color: #EE443F; border: 1px solid #EE443F; }
.medium .priority-badge { background-color: #F2F3FF; color: #FFAA00; border: 1px solid #FFAA00; }
.low .priority-badge { background-color: #F2F3FF; color: #43B75D; border: 1px solid #43B75D; }

.create-btn {
  font-size: 13px;
  color: #4E61F6;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
</style>