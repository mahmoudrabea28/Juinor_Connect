<template>
  <div class="page-wrapper">
    <div class="solid-dot solid-dot--top-right"></div>
    <div class="solid-dot solid-dot--bottom-left"></div>

    <div class="content-wrapper">
      <div class="header">
       <img src="../../assets/images/Logo.png" class="logo">
      </div>

      <div class="progress-bar">
        <div v-for="(step, index) in steps" :key="step" :class="['step', { active: index === 1, completed: index < 1 }]">
          <span class="step-number">
             <span v-if="index < 1">✓</span>
             <span v-else>{{ index + 1 }}</span>
          </span>
          <span class="step-text">{{ step }}</span>
          <span v-if="index < steps.length - 1" class="separator">—</span>
        </div>
      </div>

      <div class="card">
        <h2>What are your skills?</h2>
        <p class="subtitle">Pick everything you are comfortable with — you can update this later.</p>

        <div class="skills-grid">
          <button 
            v-for="skill in skills" 
            :key="skill" 
            :class="['skill-tag', { selected: selectedSkills.includes(skill) }]"
            @click="toggleSkill(skill)"
          >
            {{ skill }}
          </button>
        </div>

        <div class="footer-actions">
          <router-link to="/ScreenPersonalInfo"><button class="back-btn">← Back</button></router-link> 
      <button 
  class="continue-btn" 
  @click="saveSkills" 
  :disabled="loading"
>
  {{ loading ? "Saving..." : "Continue →" }}
</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateSkills, getOnboardingProfile } from "../../services/api";
import { toast } from "../../state/toastStore";

export default {
  data() {
    return {
      steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
      // Skills are listed here directly
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Figma', 'Next.js', 'PostgreSQL', 'Machine Learning', 'Product Management', 'Tailwind CSS', 'GraphQL', 'DevOps', 'Branding'],
      selectedSkills: [],
      loading: false
    };
  },
  async created() {
    try {
      // Only fetch the skills previously selected from the server
      const data = await getOnboardingProfile();
      if (data && data.profile && data.profile.skills) {
        this.selectedSkills = data.profile.skills;
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  },
  methods: {
    toggleSkill(skill) {
      if (this.selectedSkills.includes(skill)) {
        this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
      } else {
        this.selectedSkills.push(skill);
      }
    },
    async saveSkills() {
      if (this.selectedSkills.length < 3) {
        toast.error("Please select at least 3 skills");
        return;
      }

      this.loading = true;
      try {
        // Send the skills to the server to be stored
        await updateSkills(this.selectedSkills);
        this.$router.push("/ScreenInterests");
      } catch (err) {
        toast.error(err.message || "Failed to save");
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
.skills-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; }
.skill-tag { 
  padding: 10px 20px; border-radius: 50px; border: 1px solid #e5e7eb; 
  background: white; cursor: pointer; transition: 0.3s; 
}
.skill-tag:hover{ background: #FFFFFF ; color: #2563EB; border-color: #2563EB; }
.skill-tag.selected { background: #2563EB; color: white; border-color: #2563EB; }



.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF ; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }
.content-wrapper { width: 100%; max-width: 768px; z-index: 1;}
.card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 40px; }
.logo {
    height: 70px;
    display: flex;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    flex-shrink: 0;

}
h1 span { color: #2563eb ; }
.progress-bar { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 40px; color: #6b7280; font-size: 12px; }
.step { display: flex; align-items: center; gap: 5px; }
.step-number { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.step.active .step-number { background: #2071F3; color: white; }
.step.completed .step-number { background: #7C86FF ; color: white; } 
.footer-actions { display: flex; justify-content: space-between; margin-top: 30px; }
.separator { margin: 0 5px; color: #2563EB; }
.step.active .step-text { color: #111827; font-weight: bold; }
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
.back-btn { background: none; border: none; color: #6b7280; cursor: pointer; font-weight: 500;  }
</style>