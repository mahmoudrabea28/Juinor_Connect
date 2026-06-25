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
             :class="['step', { active: index === 4, completed: index < 4 }]">
          <span class="step-number">
             <span v-if="index < 4">✓</span>
             <span v-else>{{ index + 1 }}</span>
          </span>
          <span class="step-text">{{ step }}</span>
          <span v-if="index < steps.length - 1" class="separator">—</span>
        </div>
      </div>

      <div class="card">
        <h2>What's your availability?</h2>
        <p class="subtitle">Let us know when you're usually available to work on projects.</p>

        <label class="section-label">1. Time commitment</label>
        <p class="small-hint">How many hours can you dedicate per week?</p>
        <div class="grid-options">
  <div v-for="time in timeOptions" :key="time.value" 
       :class="['option-box', { selected: selectedTime === time.value }]"
       @click="selectedTime = time.value">
    <span class="icon">🕒</span>
    <span>{{ time.label }}</span>
  </div>
</div>

        <label class="section-label mt-20">2. Preferred days</label>
        <p class="small-hint">Select the days you're usually available.</p>
        <div class="days-grid">
          <div v-for="day in days" :key="day" 
               :class="['day-box', { selected: selectedDays.includes(day) }]"
               @click="toggleDay(day)">
            <span>{{ day }}</span>
            <span v-if="selectedDays.includes(day)" class="check">✓</span>
          </div>
        </div>

        <div class="footer-actions">
            <router-link to="/ScreenExperience"><button class="back-btn">← Back</button></router-link> 
        <button 
    class="continue-btn" 
    @click="saveAvailability" 
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
import { updateAvailability, getOnboardingProfile } from "../../services/api";
import { toast } from "../../state/toastStore";

export default {
  data() {
    return {
      steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
      timeOptions: [
        { label: 'Less than 5 hours', value: 'less_than_5' },
        { label: '5-10 hours', value: '5-10' },
        { label: '10-20 hours', value: '10-20' },
        { label: 'More than 20 hours', value: 'more_than_20' }
      ],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selectedTime: null, 
      selectedDays: [],
      loading: false
    };
  },
  async created() {
    try {
      const data = await getOnboardingProfile();
      if (data?.profile) {
        this.selectedTime = data.profile.timeCommitment;
        this.selectedDays = data.profile.preferredDays || [];
      }
    } catch (err) { console.error(err); }
  },
  methods: {
    toggleDay(day) {
      if (this.selectedDays.includes(day)) {
        this.selectedDays = this.selectedDays.filter(d => d !== day);
      } else {
        this.selectedDays.push(day);
      }
    },
    async saveAvailability() {
      if (!this.selectedTime || this.selectedDays.length === 0) {
        return toast.error("Please select time and days");
      }
      this.loading = true;
      try {
        await updateAvailability({
          timeCommitment: this.selectedTime, 
          preferredDays: this.selectedDays
        });
        this.$router.push("/Availability");
      } catch (err) { toast.error(err.message); }
      finally { this.loading = false; }
    }
  }
};
</script>
<style scoped>
.page-wrapper { min-height: 100vh; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden; }
.page-wrapper::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.page-wrapper::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }
.section-label { font-weight: 600; display: block; margin-top: 20px; }
.small-hint { color: #6b7280; font-size: 14px; margin-bottom: 15px; }

.grid-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.option-box { 
  padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 10px; transition: 0.3s;
}
.option-box.selected { border: 2px solid #2563EB; background: #f0f7ff; color: #2563EB; }
.check {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid;
  border-radius: 50%;
  border-color: #6b7280;
  text-align: center;
  margin-left: 23px;
}
.days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
.day-box { 
  padding: 15px 5px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer;
  text-align: center; display: flex; flex-direction: column; gap: 5px;
}
.day-box.selected { border: 2px solid #2563EB; background: #f0f7ff; color: #2563EB; }
.logo { height: 70px; }
.content-wrapper { width: 100%; max-width: 768px; }
.card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.header { display: flex; justify-content: center; margin-bottom: 40px; }
.progress-bar { display: flex; justify-content: center; gap: 10px; margin-bottom: 40px; font-size: 12px; }
.step { display: flex; align-items: center; gap: 5px; color: #6b7280; }
.step-number { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.step.active .step-number { background: #2071F3; color: white; }
.step.completed .step-number { background: #7C86FF; color: white; }
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
.footer-actions { display: flex; justify-content: space-between; margin-top: 30px; }

</style>