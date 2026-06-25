<template>
  <div class="page-wrapper">
    <div class="solid-dot solid-dot--top-right"></div>
    <div class="solid-dot solid-dot--bottom-left"></div>

    <div class="content-wrapper">
      <div class="header">
        <img src="../../assets/images/Logo.png" class="logo">
      </div>

      <div class="progress-bar">
        <div v-for="(step, index) in steps" :key="step" :class="['step', { active: index === 0 }]">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-text">{{ step }}</span>
          <span v-if="index < steps.length - 1" class="separator">—</span>
        </div>
      </div>

      <div class="card">
        <h2>Tell us about you</h2>
        <p class="subtitle">This helps teammates get to know you.</p>

        <div class="form-row">
          <div class="input-group">
            <label>Full name</label>
            <input v-model="formData.fullName" type="text" placeholder="Enter Full name" :class="{'input-error': errors.fullName}" />
            <span v-if="errors.fullName" class="error-text">{{ errors.fullName }}</span>
          </div>
          <div class="input-group">
            <label>Current role</label>
            <input v-model="formData.currentRole" type="text" placeholder="Student / Graduated" :class="{'input-error': errors.currentRole}" />
            <span v-if="errors.currentRole" class="error-text">{{ errors.currentRole }}</span>
          </div>
        </div>

        <div class="input-group">
          <label>Short bio</label>
          <textarea v-model="formData.shortBio" placeholder="Write about you" rows="4" :class="{'input-error': errors.shortBio}"></textarea>
          <span v-if="errors.shortBio" class="error-text">{{ errors.shortBio }}</span>
        </div>

        <div class="footer-actions">
          <router-link to="/register" class="back-btn">← Back</router-link> 
          <button class="continue-btn" @click="handleContinue" :disabled="loading">
            {{ loading ? "Saving..." : "Continue →" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updatePersonalInfo, getOnboardingProfile } from "../../services/api";
import { toast } from "../../state/toastStore";

export default {
  data() {
    return {
      steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
      formData: { fullName: "", currentRole: "", shortBio: "" },
      errors: { fullName: "", currentRole: "", shortBio: "" },
      loading: false
    };
  },
  async created() {
    try {
      const data = await getOnboardingProfile();
      if (data && data.profile) {
        this.formData.fullName = data.profile.fullName || "";
        this.formData.currentRole = data.profile.currentRole || "";
        // النبذة بقت محفوظة في حقل bio الموحّد (مع دعم القديم shortBio).
        this.formData.shortBio = data.profile.bio || data.profile.shortBio || "";
      }
    } catch (err) { console.error("Error loading profile:", err); }
  },
  methods: {
    async handleContinue() {
      this.errors = { fullName: "", currentRole: "", shortBio: "" };
      let isValid = true;
      if (!this.formData.fullName.trim()) { this.errors.fullName = "Required"; isValid = false; }
      if (!this.formData.currentRole.trim()) { this.errors.currentRole = "Required"; isValid = false; }
      if (!this.formData.shortBio.trim()) { this.errors.shortBio = "Required"; isValid = false; }
      if (!isValid) return;

      this.loading = true;
      try {
        await updatePersonalInfo(this.formData);
        this.$router.push("/ScreenSkills");
      } catch (err) { toast.error(err.message); } finally { this.loading = false; }
    }
  }
};
</script>

<style scoped>
/* التنسيق الأصلي كما هو */
.page-wrapper { min-height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); }
.content-wrapper { width: 100%; max-width: 768px; z-index: 1; }
.page-wrapper::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.page-wrapper::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }
.header { display: flex; align-items: center; justify-content: center; margin-bottom: 40px; }
.logo { height: 70px; }
.progress-bar { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 40px; color: #6b7280; font-size: 12px; flex-wrap: wrap; }
.step { display: flex; align-items: center; gap: 5px; }
.step-number { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
.step.active .step-number { background: #2071F3; color: white; }
.step.active .step-text { color: #111827; font-weight: bold; }
.separator { margin: 0 5px; color: #2563EB; }
.card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
h2 { font-family: serif; font-size: 32px; margin: 0 0 10px 0; }
.subtitle { color: #6b7280; margin-bottom: 30px; }
.form-row { display: flex; gap: 20px; margin-bottom: 20px; }
.input-group { display: flex; flex-direction: column; gap: 8px; flex: 1; text-align: left; }
input, textarea { padding: 15px; border-radius: 12px; border: 1px solid #e5e7eb; background: #f9fafb; outline: none; width: 100%; box-sizing: border-box; }
input:focus, textarea:focus { border-color: #2563EB; }
.footer-actions { display: flex; justify-content: space-between; margin-top: 30px; }
.back-btn { background: none; border: none; color: #6b7280; cursor: pointer; font-weight: 500; text-decoration: none; }
.continue-btn {  display: inline-flex;
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
  white-space: nowrap; }
.continue-btn:hover { transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65); }
.continue-btn:disabled { background: #cbd5e1; cursor: not-allowed; }

/* إضافات رسائل الخطأ */
.error-text { color: #dc2626; font-size: 11px; margin-top: -5px; }
.input-error { border-color: #dc2626 !important; }
</style>