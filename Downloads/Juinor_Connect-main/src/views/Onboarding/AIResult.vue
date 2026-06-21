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
             :class="['step', { active: index === 5, completed: index < 5 }]"
             :style="{ animationDelay: `${index * 0.15}s` }">
          <span class="step-number">
             <span v-if="index < 5">✓</span>
             <span v-else>6</span>
          </span>
          <span class="step-text">{{ step }}</span>
          <span v-if="index < steps.length - 1" class="separator">—</span>
        </div>
      </div>

      <div v-if="pageLoading" class="card" style="text-align:center;padding:60px">
        <div class="page-spinner"></div>
        <p style="margin-top:16px;color:#6b7280">Loading your AI results...</p>
      </div>

      <div v-else class="card">
        <div class="ai-header">
          <span class="ai-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> AI-GENERATED PROFILE</span>
          <h2>{{ profile?.headline || 'Your AI Profile' }}</h2>
          <p class="description" style="color: #596475;">{{ profile?.bio || '' }}</p>
          <div class="tags" v-if="profile?.highlights?.length">
            <span class="tag" v-for="h in profile.highlights" :key="h">
              <i class="fa-regular fa-star"></i> {{ h }}
            </span>
          </div>
        </div>

        <hr class="divider" style="color: #596475; margin: 20px 0;">

        <div class="recommendations-header">
          <h3>Teams we recommend for you</h3>
          <button class="regenerate-btn" @click="handleRegenerate" :disabled="regenerating">
            <i class="fa-solid fa-arrows-rotate" :class="{ spinning: regenerating }"></i>
            {{ regenerating ? 'Regenerating...' : 'Regenerate' }}
          </button>
        </div>
        <p class="subtitle" style="color: #596475;">Ranked by how well your skills, interests and availability fit.</p>

        <div class="recommendations-grid">
          <div v-for="team in teams" :key="team._id || team.title" class="team-card">
            <div class="team-top">
              <span class="team-name">{{ team.title }}</span>
              <span class="team-score">{{ team.matchScore != null ? team.matchScore + '%' : '' }}</span>
            </div>
            <p class="team-meta">{{ (team.categories || []).join(' · ') }}</p>
            <p class="team-desc">{{ team.description || team.matchReason || '' }}</p>
            <div class="team-footer">
              <span class="role-badge" v-for="s in (team.requiredSkills || []).slice(0, 2)" :key="s">{{ s }}</span>
              <br>
              <span class="members"><i class="fa-regular fa-user"></i> {{ team.members?.length || 0 }} members</span>
            </div>
            <button class="join-btn" @click="handleJoin(team)" :disabled="team.joined">
              <template v-if="team.joined"><i class="fa-solid fa-check" style="margin-right:5px;color:#16a34a"></i> Joined</template>
              <template v-else><i class="fa-regular fa-comment" style="margin-right:5px;"></i> join</template>
            </button>
          </div>
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <div class="footer-actions">
          <router-link to="/MatchwithAi"><button class="back-btn">← Back</button></router-link>
          <router-link to="/browse-teams"><button class="finish-btn">Finish & explore</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLatestProfile, getLatestIdeas, regenerateIdeas, joinProject } from '../../services/api';

export default {
  data() {
    return {
      steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
      profile: null, teams: [], pageLoading: true, regenerating: false, errorMsg: '',
    };
  },
  async mounted() { await this.loadData(); },
  methods: {
    async loadData() {
      this.pageLoading = true; this.errorMsg = '';
      try {
        const [profileData, ideasData] = await Promise.all([
          getLatestProfile().catch(() => null), getLatestIdeas().catch(() => null),
        ]);
        this.profile = profileData || null;
        this.teams = (ideasData?.ideas || []).map(t => ({ ...t, joined: false }));
      } catch (e) { this.errorMsg = e.message; }
      finally { this.pageLoading = false; }
    },
    async handleRegenerate() {
      this.regenerating = true; this.errorMsg = '';
      try {
        const ideasData = await regenerateIdeas();
        this.teams = (ideasData?.ideas || []).map(t => ({ ...t, joined: false }));
      } catch (e) { this.errorMsg = e.message || 'Failed to regenerate'; }
      finally { this.regenerating = false; }
    },
    async handleJoin(team) {
      try {
        await joinProject({ title: team.title, description: team.description, requiredSkills: team.requiredSkills, categories: team.categories, difficulty: team.difficulty, estimatedTime: team.estimatedTime });
        team.joined = true;
      } catch (e) { alert(e.message || 'Could not join'); }
    },
  },
};
</script>

<style scoped>
.page-wrapper{min-height:100vh;background:linear-gradient(160deg,#E0E7FF 0%,#EFF6FF 55%,#FFF 100%);display:flex;justify-content:center;align-items:center;padding:40px 20px;position:relative;overflow:hidden}
.page-wrapper::before{content:'';position:absolute;top:-60px;left:-60px;width:220px;height:220px;border-radius:50%;background:#C6D2FF;filter:blur(60px);opacity:.75;pointer-events:none}
.page-wrapper::after{content:'';position:absolute;bottom:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:#8EC5FF;filter:blur(60px);opacity:.65;pointer-events:none}
.solid-dot{position:fixed;width:12px;height:12px;background-color:#7C86FF;border-radius:50%;pointer-events:none}
.solid-dot--top-right{top:50px;right:50px}.solid-dot--bottom-left{bottom:50px;left:50px}

.header{display:flex;justify-content:center;margin-bottom:40px;width:100%}.logo{height:70px}
.progress-bar{display:flex;justify-content:center;gap:10px;margin-bottom:40px;font-size:12px}
.step{display:flex;align-items:center;gap:5px;color:#6b7280;opacity:0;animation:fadeIn .5s ease forwards}
.step-number{width:22px;height:22px;background:#e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff}
.step.active .step-number{background:#2071F3}.step.completed .step-number{background:#7C86FF}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

.card{background:#fff;padding:40px;border-radius:20px;max-width:800px;width:100%;box-shadow:0 10px 25px rgba(0,0,0,.05)}
.ai-badge{color:#2563EB;font-size:16px;padding:4px 10px;border-radius:6px}
.tags{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.tag{border:1px solid #2071F3;padding:6px 12px;border-radius:20px;font-size:12px;background:#DFF0FF;color:#2071F3}

.recommendations-header{display:flex;justify-content:space-between;align-items:center;margin-top:20px}
.regenerate-btn{background:none;border:none;color:#2563EB;cursor:pointer;font-size:14px;font-weight:500;display:flex;align-items:center;gap:6px}
.regenerate-btn:disabled{opacity:.5;cursor:not-allowed}
.spinning{animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.recommendations-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:20px}
.team-card{border:1px solid #e5e7eb;padding:20px;border-radius:16px;display:flex;flex-direction:column;transition:all .3s ease}
.team-card:hover{transform:translateY(-6px);box-shadow:0 15px 30px rgba(0,0,0,.1);border-color:#2563EB}
.team-top{display:flex;justify-content:space-between;align-items:center;font-weight:bold;gap:10px}
.team-score{color:#2563EB;background:#E0E7FF;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700;flex-shrink:0;min-width:45px;text-align:center}
.team-meta{font-size:12px;color:#9ea2ae;margin-top:4px}
.role-badge{display:inline-block;padding:6px 10px;border:1px solid #6b7280;border-radius:20px;font-size:12px;color:#091123;margin-bottom:8px;margin-right:4px}
.team-desc{flex-grow:1;font-size:13px;color:#6b7280;margin:10px 0}
.join-btn{width:100%;padding:8px;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer;background:#fff;transition:.2s;margin-top:5px;font-size:13px}
.join-btn:hover{background:#f8fafc}
.join-btn:disabled{background:#f0fdf4;border-color:#86efac;cursor:default;color:#16a34a;font-weight:600}

.footer-actions{display:flex;justify-content:space-between;margin-top:40px}
.finish-btn{display:inline-flex;align-items:center;gap:8px;border:0;cursor:pointer;color:#f2f4fb;font-weight:600;font-size:14px;padding:12px 16px;background:linear-gradient(90deg,#4F39F6,#2B7FFF);border-radius:12px;box-shadow:0 10px 22px -10px rgba(79,57,246,.6);transition:.25s}
.finish-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -10px rgba(43,127,255,.65)}
.back-btn{background:none;border:none;color:#6b7280;cursor:pointer}

.page-spinner{width:40px;height:40px;border:4px solid #E0E7FF;border-top-color:#4F39F6;border-radius:50%;animation:spin .7s linear infinite;margin:0 auto}
.error-text{color:#ef4444;margin-top:12px;font-size:14px;text-align:center}

@media(max-width:768px){.recommendations-grid{grid-template-columns:1fr}.tags{flex-direction:column;align-items:flex-start}}
</style>
