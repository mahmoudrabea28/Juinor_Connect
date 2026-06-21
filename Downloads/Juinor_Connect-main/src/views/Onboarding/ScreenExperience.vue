<template>
  <div class="page-wrapper">
    <div class="solid-dot solid-dot--top-right"></div>
    <div class="solid-dot solid-dot--bottom-left"></div>

    <div class="content-wrapper">
      <div class="header">
         <img src="../../assets/images/Logo.png" class="logo">
      </div>

      <div class="progress-bar">
        <div v-for="(step, index) in steps" :key="step" 
             :class="['step', { active: index === 3, completed: index < 3 }]">
          <span class="step-number">
             <span v-if="index < 3">✓</span>
             <span v-else>{{ index + 1 }}</span>
          </span>
          <span class="step-text">{{ step }}</span>
          <span v-if="index < steps.length - 1" class="separator">—</span>
        </div>
      </div>

      <div class="card">
        <h2>What are your experience level as developer?</h2>
        <p class="subtitle">Choose the option that best describes you.</p>

<div class="experience-options">
  <div 
    v-for="option in experienceOptions" 
    :key="option.value"
    :class="['exp-card', { selected: selectedExp === option.value }]"
    @click="selectedExp = option.value"
  >
    <h3>{{ option.title }}</h3>
    <p>{{ option.desc }}</p>
  </div>
</div>



        <div class="footer-actions">
            <router-link to="/ScreenInterests"><button class="back-btn">← Back</button></router-link> 
        <button class="continue-btn" @click="saveExperience" :disabled="loading">
  {{ loading ? "Saving..." : "Continue →" }}
</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateExperience, getOnboardingProfile } from "../../services/api";

export default {
 data() {
  return {
    steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
    selectedExp: null, 
    experienceOptions: [
      { 
        title: 'Beginner', 
        value: 'beginner', 
        desc: 'I’m just starting my coding journey and learning the basics' 
      },
      { 
        title: 'Intermediate', 
        value: 'intermediate', 
        desc: 'I have some experience and have built a few projects' 
      },
      { 
        title: 'Advanced', 
        value: 'advanced', 
        desc: 'I’m comfortable building complex applications and solving problems' 
      }
    ],
    loading: false
  };
},
  async created() {
    try {
      const data = await getOnboardingProfile();
      if (data?.profile?.experienceLevel) {
        this.selectedExp = data.profile.experienceLevel;
      }
    } catch (err) {
      console.error("Error loading experience level:", err);
    }
  },
  methods: {
    async saveExperience() {
      if (!this.selectedExp) {
        alert("Please select an experience level");
        return;
      }

      this.loading = true;
      try {
        await updateExperience(this.selectedExp);
        this.$router.push("/ScreenAvailability");
      } catch (err) {
        alert(err.message || "Failed to save");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>

.page-wrapper { min-height: 100vh; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden; }
.page-wrapper::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.page-wrapper::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.experience-options { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
.exp-card { 
  padding: 20px; border-radius: 16px; border: 1px solid #e5e7eb; 
  background: white; cursor: pointer; transition: 0.3s; 
}
.exp-card:hover h3 { 
  color: #2563EB; 
}


.exp-card h3 { 
  margin: 0 0 5px 0; 
  color: #111827; 
  transition: color 0.3s;
}
.exp-card:hover { border-color: #2563EB; }
.exp-card p { margin: 0; color: #6b7280; font-size: 14px; }
.exp-card.selected { 
  border: 2px solid #2563EB; 
  background: #2563EB; 
}
.exp-card.selected h3, 
.exp-card.selected p { 
  color: #EFF6FF; 
}

.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }
.content-wrapper { width: 100%; max-width: 768px; z-index: 1;}
.card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 40px; }
.logo { height: 70px; }
.progress-bar { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 40px; color: #6b7280; font-size: 12px; }
.step { display: flex; align-items: center; gap: 5px; }
.step-number { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.step.active .step-number { background: #2071F3; color: white; }
.step.completed .step-number { background: #7C86FF; color: white; }
.step.active .step-text { color: #111827; font-weight: bold; }
.separator { margin: 0 5px; color: #2563EB; }
.footer-actions { display: flex; justify-content: space-between; margin-top: 30px; }
.continue-btn { 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  cursor: pointer;
  color: #f2f4fb;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #4F39F6, #2B7FFF);
  background-size: 180% 100%;
  background-position: 0% 0;
  border-radius: 12px;
  box-shadow: 0 10px 22px -10px rgba(79, 57, 246, 0.6);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s,
    background-position 0.5s;
  white-space: nowrap;
}
.continue-btn:hover{
    transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65);
}
.back-btn { background: none; border: none; color: #6b7280; cursor: pointer; font-weight: 500; }
</style>