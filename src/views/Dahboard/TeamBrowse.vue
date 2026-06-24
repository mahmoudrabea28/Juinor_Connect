<template>
   <DashboardLayout>
  <div class="browse-teams-container">
    
    <div class="page-banner">
      <span>Browse Teams</span>
      <h1>Find Your Perfect Team</h1>
      <p>Browse and filter teams looking for your skills.</p>
    </div>

    <div class="ai-matching-banner">
      <div class="ai-icon-box">
        <img src="../../assets/images/magic-wand1.png" alt="magic wand" style="color: #131927;">
      </div>
      <div class="ai-matching-text">
        <strong>AI Smart Matching Active —</strong> Showing teams that need your Python <br>skills. Updated 4 min ago.
      </div>
      <div class="ai-tags-inline">
        <span class="ai-tag-sm">Node.js</span>
        <span class="ai-tag-sm">TypeScript</span>
      </div>
    </div>

    <div class="teams-grid">
      
      <div class="teams-list">
        <div 
          v-for="(team, index) in filteredTeams" 
          :key="index" 
          :class="['team-card', team.colorClass]"
        >
          <div class="card-header">
            <div class="team-profile">
              <div class="team-avatar-box">
                <span class="material-symbols-outlined">person_add</span>
              </div>
              <div class="team-meta">
                <h2>{{ team.name }}</h2>
                <p>{{ team.metaText }}</p>
              </div>
            </div>
            <div class="match-score-badge">
              <span class="score-num">{{ team.matchScore }}%</span>
              <span class="score-label">AI Match</span>
            </div>
          </div>
          
          <div class="team-desc">
            {{ team.description }}
          </div>
          
          <div class="match-progress-container">
            <div class="match-progress-label">
              <span>Match Score</span>
              <span>{{ team.matchScore }}%</span>
            </div>
            <div class="match-progress-bg">
              <div class="match-progress-fill" :style="{ width: team.matchScore + '%' }"></div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="team-tags">
              <span 
                v-for="(tag, tIdx) in team.tags" 
                :key="tIdx" 
                :class="['team-tag', { 'level-tag': tag.isLevel }]"
              >
                {{ tag.text }}
              </span>
            </div>
            <div class="card-actions">
              <button class="btn-open" @click="openProject(team)">Open Project</button>
              <button class="btn-join" @click="joinTeam(team)">Join Team</button>
            </div>
          </div>
        </div>
      </div>

      <aside class="filters-sidebar">
        <div class="filters-header">
          <h3>Filters</h3>
          <button class="btn-reset" @click="resetFilters">Reset</button>
        </div>

        <div class="filter-section">
          <h4>Skill Needed</h4>
          <div class="checkbox-group">
            <label v-for="skill in availableSkills" :key="skill" class="checkbox-label">
              <input type="checkbox" :value="skill" v-model="selectedSkills"> {{ skill }}
            </label>
          </div>
        </div>

        <div class="filter-section">
          <h4>Project Category</h4>
          <select class="filter-select" v-model="selectedCategory">
            <option value="All">All</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Apps">Mobile Apps</option>
          </select>
        </div>

        <div class="filter-section">
          <h4>Team Size</h4>
          <select class="filter-select" v-model="selectedSize">
            <option value="Any">Any</option>
            <option value="1-3 Members">1-3 Members</option>
            <option value="3-5 Members">3-5 Members</option>
            <option value="5+ Members">5+ Members</option>
          </select>
        </div>

        <div class="filter-section">
          <h4>Difficulty Level</h4>
          <select class="filter-select" v-model="selectedLevel">
            <option value="All Levels">All Levels</option>
            <option value="Beginner-Friendly">Beginner-Friendly</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div class="filter-section">
          <div class="slider-meta">
            <h4>Team Capacity (%)</h4>
            <span>92%</span>
          </div>
          <div class="match-progress-bg" style="margin-top: 6px;">
            <div class="match-progress-fill" style="width: 92%;"></div>
          </div>
        </div>

        <div class="filter-section">
          <h4>Trending Skills</h4>
          <div class="trending-tags">
            <span class="trending-tag">React Dev</span>
            <span class="trending-tag">Backend Eng</span>
            <span class="trending-tag">DevOps</span>
            <span class="trending-tag level-tag">Intermediate</span>
          </div>
        </div>
      </aside>

    </div>
  </div>
   </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 

export default {
  name: 'BrowseTeams',
   components: {
    DashboardLayout
  },
  data() {
    return {
      availableSkills: ['React', 'Python', 'NodeJS', 'Typescript', 'Aws'],
      selectedSkills: [],
      selectedCategory: 'All',
      selectedSize: 'Any',
      selectedLevel: 'All Levels',
      
      teams: [
        {
          name: 'Cloud Masters',
          metaText: 'Browse and filter teams looking for your skills.',
          colorClass: 'blue',
          matchScore: 92,
          description: 'Building a serverless SaaS app with AWS Lambda and real-time analytics dashboard.',
          tags: [
            { text: 'React Dev', isLevel: false },
            { text: 'Backend Eng', isLevel: false },
            { text: 'DevOps', isLevel: false },
            { text: 'Intermediate', isLevel: true }
          ]
        },
        {
          name: 'Portfolio Builders',
          metaText: 'Open Source · 3/5 members',
          colorClass: 'yellow',
          matchScore: 72,
          description: 'Creating a suite of open-source developer portfolio tools used by 1k+ devs.',
          tags: [
            { text: 'React Dev', isLevel: false },
            { text: 'UI/UX Designer', isLevel: false },
            { text: 'Beginner-Friendly', isLevel: true }
          ]
        },
        {
          name: 'PyData Collective',
          metaText: 'Data Science · 5/8 members',
          colorClass: 'purple',
          matchScore: 65,
          description: 'Open dataset exploration platform with machine learning pipelines and visualizations.',
          tags: [
            { text: 'Python Dev', isLevel: false },
            { text: 'Data Engineer', isLevel: false },
            { text: 'ML Engineer', isLevel: false },
            { text: 'Advanced', isLevel: true }
          ]
        },
        {
          name: 'MobileFirst Crew',
          metaText: 'Mobile · 2/4 members',
          colorClass: 'orange',
          matchScore: 58,
          description: 'Cross-platform React Native app for local event discovery with AR features.',
          tags: [
            { text: 'React Native', isLevel: false },
            { text: 'Backend Dev', isLevel: false },
            { text: 'Intermediate', isLevel: true }
          ]
        }
      ]
    };
  },
  computed: {
    filteredTeams() {
      // هنا يمكنك إضافة منطق الفلترة الفعلي بناءً على الـ Data المرتبطة بالـ inputs
      return this.teams;
    }
  },
  methods: {
    resetFilters() {
      this.selectedSkills = [];
      this.selectedCategory = 'All';
      this.selectedSize = 'Any';
      this.selectedLevel = 'All Levels';
    },
    openProject(team) {
      console.log('Opening project for:', team.name);
    },
    joinTeam(team) {
      alert(`Request sent to join ${team.name}!`);
    }
  }
}
</script>

<style scoped>
.browse-teams-container {
  padding: 32px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}

/* --- Top Banner Styles --- */
.page-banner {
  position: relative; 
  overflow: hidden;   
  background-color: #ffffff;
  background-image: url('../../assets/images/Hero\ section.png');
  background-repeat: no-repeat;
  background-size: 85%;
  background-position: center right;
  border: 1px solid rgba(26, 27, 35, 0.05);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
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
  bottom: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 170, 0, 0.25);
  border-radius: 50%;
  filter: blur(40px);
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

/* --- AI Smart Matching Banner --- */
.ai-matching-banner {
  background-color: #F2F3FF;
  border: 1px solid rgba(78, 97, 246, 0.15);
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.ai-icon-box {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(78, 97, 246, 0.1);
}

.ai-matching-text {
  font-size: 15px;
  color: #131927;
  flex: 1;
}

.ai-matching-text strong {
  color: #4E61F6;
}

.ai-tags-inline {
  display: flex;
  gap: 8px;
}

.ai-tag-sm {
  background: #F2F3FF;
  border: 1px solid #4E61F6;
  color: #4E61F6;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* --- Main Grid Layout --- */
.teams-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  align-items: start;
}

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* --- Team Card Styles --- */
.team-card {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid rgba(26, 27, 35, 0.03);
}

.team-card.blue { background-color: #E7F5FF;}
.team-card.yellow { background-color: #FFFAE5;}
.team-card.purple { background-color: #F4F0FE }
.team-card.orange { background-color: #FEF4EA; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.team-profile {
  display: flex;
  gap: 16px;
  align-items: center;
}

.team-avatar-box {
  width: 48px;
  height: 48px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.team-avatar-box span {
  font-size: 24px;
  color: #131927;
}

.team-meta h2 {
  font-size: 18px;
  color: #131927;
  font-weight: 600;
}

.team-meta p {
  font-size: 13px;
  color: #64748b;
  margin-top: 2px;
}

.match-score-badge {
  text-align: right;
}

.match-score-badge .score-num {
  font-size: 20px;
  font-weight: 700;
  color: #131927;
}

.match-score-badge .score-label {
  font-size: 11px;
  color: #131927;
  font-weight: 600;
  display: block;
  margin-top: 2px;
}

.team-desc {
  font-size: 14px;
  color: #131927;
  line-height: 1.5;
}

/* Progress Bar */
.match-progress-container {
  margin: 4px 0;
}

.match-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #131927;
  margin-bottom: 6px;
}

.match-progress-bg {
  background-color: #EDEFFE;
  height: 8px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
}

.match-progress-fill {
  background-color: #4E61F6;
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

/* Card Footer & Actions */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.team-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.team-tag {
  background: #F2F3FF;
  border: 1px solid #4E61F6;
  color: #4E61F6;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.team-tag.level-tag {
  background-color: #F2F3FF; 
  color: #6D717F; 
  border: 1px solid #6D717F;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.btn-open, .btn-join {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-open {
  background: #ffffff;
  color: #4E61F6;
  border: 1px solid #4E61F6;
}

.btn-open:hover {
  background: #F2F3FF;
}

.btn-join {
  background: #4E61F6;
  color: #ffffff;
  width: 110px;
}

.btn-join:hover {
  background: #3b4ed1;
}

/* --- Filters Sidebar Styles --- */
.filters-sidebar {
  background: #F2F3FF;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters-header h3 {
  font-size: 18px;
  color: #131927;
  font-weight: 600;
}

.btn-reset {
  background: none;
  border: none;
  color: #4E61F6;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-section h4 {
  font-size: 12px;
  color: #131927;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
}

/* Custom Checkboxes */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #131927;
  cursor: pointer;
}

.checkbox-label input {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #4E61F6;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  position: relative;
}

.checkbox-label input:checked {
  background-color: #4E61F6;
  border-color: #4E61F6;
}

.checkbox-label input:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Select Dropdowns */
.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  color: #131927;
  background-color: #ffffff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.filter-select:focus {
  border-color: #4E61F6;
  box-shadow: 0 0 0 5px rgba(78, 97, 246, 0.1);
}

/* Range Slider Meta */
.slider-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #131927;
  font-weight: 600;
}

/* Trending Skills Badges */
.trending-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.trending-tag {
  background: #F2F3FF;
  border: 1px solid #4E61F6;
  color: #4E61F6;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.trending-tag.level-tag {
  background-color: #F2F3FF; 
  color: #6D717F; 
  border: 1px solid #6D717F;
}
</style>