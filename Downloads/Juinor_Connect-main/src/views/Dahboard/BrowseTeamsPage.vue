<template>
  <div>
    <Navbar />
    <div class="bt-page">
      <!-- Header -->
      <div class="bt-header">
        <div class="bt-left">
          <h1 class="bt-title">We analyzed your profile and found <span class="bt-accent">the best teams</span> for you</h1>
          <p class="bt-sub">Recommendations are ranked by compatibility across your skills, availability, experience, and how you like to collaborate.</p>
        </div>
        <div class="bt-right">
          <div class="bt-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#9EA2AE" stroke-width="2"/><path d="M16 16l4.5 4.5" stroke="#9EA2AE" stroke-width="2" stroke-linecap="round"/></svg>
            <input v-model="search" placeholder="Search" />
          </div>
          <div class="bt-search-meta">
            <span>{{ filteredProjects.length }} Results Found</span>
            <span>Sort by: <strong>Relevance</strong> ▾</span>
          </div>
        </div>
      </div>

      <!-- Snapshot -->
      <ProfileSnapshot :profile="profile" />

      <LoadingScreen :visible="loading" />
      <div v-if="loading" style="display:none"></div>
      <div v-else-if="error" class="bt-state bt-err">{{ error }}</div>

      <template v-else-if="filteredProjects.length">
        <!-- Top Recommendation -->
        <section v-if="topProject" class="bt-section">
          <h2 class="bt-sec-title">Top recommendation</h2>
          <div class="bt-top">
            <div class="bt-top-left">
              <span class="bt-chip" v-if="topProject.categories?.length">{{ topProject.categories[0] }}</span>
              <h3 class="bt-top-name">{{ topProject.title }}</h3>
              <div class="bt-why" v-if="topProject.matchReason || topProject.description">
                <div class="bt-why-head"><span style="color:#4E61F6;font-size:20px">✦</span> <strong>Why this team</strong></div>
                <p>{{ topProject.matchReason || topProject.description }}</p>
              </div>
              <div class="bt-chips">
                <span class="bt-chip" v-for="s in (topProject.requiredSkills||[]).slice(0,3)" :key="s">{{ s }}</span>
              </div>
              <div class="bt-top-footer">
                <div class="bt-meta">
                  <div class="bt-avs">
                    <div class="bt-av" v-for="(m,i) in (topProject.members||[]).slice(0,3)" :key="i">{{ (m?.user?.name||'?')[0]?.toUpperCase() }}</div>
                  </div>
                  <span class="bt-open">{{ 4-(topProject.members?.length||0) }} open</span>
                </div>
                <router-link :to="'/browse-teams/'+topProject._id" class="bt-view-btn">View team →</router-link>
              </div>
            </div>
            <div class="bt-top-right">
              <MatchBreakdown :score="topProject.matchScore||0" />
            </div>
          </div>
        </section>

        <!-- Others -->
        <section v-if="otherProjects.length" class="bt-section">
          <h2 class="bt-sec-title">Other matching teams</h2>
          <div class="bt-grid">
            <TeamCard v-for="p in otherProjects" :key="p._id" :project="p" />
          </div>
        </section>
      </template>
      <div v-else class="bt-state">No matching teams found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { discoverProjects, getOnboardingProfile } from '../../services/api'
import Navbar from '../../components/Navbar.vue'
import ProfileSnapshot from '../../components/teams/ProfileSnapshot.vue'
import TeamCard from '../../components/teams/TeamCard.vue'
import MatchBreakdown from '../../components/teams/MatchBreakdown.vue'
import LoadingScreen from '../../components/LoadingScreen.vue'

const projects = ref([])
const profile = ref(null)
const search = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const [pj, pr] = await Promise.all([discoverProjects(), getOnboardingProfile()])
    projects.value = pj.projects || []
    profile.value = pr.profile || null
  } catch (e) { error.value = e.message }
  finally { loading.value = false }
})

const filteredProjects = computed(() => {
  if (!search.value.trim()) return projects.value
  const q = search.value.toLowerCase()
  return projects.value.filter(p =>
    p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) ||
    (p.requiredSkills||[]).some(s=>s.toLowerCase().includes(q)) ||
    (p.categories||[]).some(c=>c.toLowerCase().includes(q))
  )
})
const topProject = computed(() => filteredProjects.value[0] || null)
const otherProjects = computed(() => filteredProjects.value.slice(1))
</script>

<style scoped>
.bt-page{max-width:1200px;margin:0 auto;padding:32px 40px 60px}

.bt-header{display:flex;gap:24px;margin-bottom:24px;flex-wrap:wrap}
.bt-left{flex:0 0 480px}
.bt-right{flex:1;min-width:280px}
.bt-title{font-family:'Montaga',serif;font-size:28px;line-height:36px;color:#131927}
.bt-accent{color:#4E61F6}
.bt-sub{margin-top:8px;font-size:15px;color:#6D717F;line-height:22px}

.bt-search{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1.5px solid #E5E7EA;border-radius:12px;background:#fff}
.bt-search input{flex:1;border:none;outline:none;font-size:16px;font-family:inherit}
.bt-search input::placeholder{color:#9EA2AE}
.bt-search-meta{display:flex;justify-content:space-between;margin-top:8px;font-size:13px;color:#9EA2AE}
.bt-search-meta strong{color:#131927}

.bt-sec-title{font-family:'Montaga',serif;font-size:22px;margin-bottom:16px;color:#131927}
.bt-section{margin-top:24px}

/* Top card */
.bt-top{display:flex;border-radius:12px;overflow:hidden;background:#F2F3FF;box-shadow:0 6px 14px -6px rgba(19,25,39,.12),0 10px 32px -4px rgba(19,25,39,.1)}
.bt-top-left{flex:1;padding:24px;display:flex;flex-direction:column;gap:16px}
.bt-top-right{width:440px;flex-shrink:0;padding:16px}
.bt-top-name{font-size:18px;font-weight:600;line-height:28px;margin:0}
.bt-why{background:#EDEFFE;border:1.5px solid #4E61F6;border-radius:12px;padding:16px}
.bt-why-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.bt-why p{font-size:14px;color:#131927;line-height:20px;margin:0}
.bt-chip{display:inline-flex;align-items:center;height:32px;padding:8px 20px;border-radius:8px;background:#EDEFFE;border:1.5px solid #4E61F6;color:#4E61F6;font-size:12px;font-weight:600;text-transform:uppercase}
.bt-chips{display:flex;gap:12px;flex-wrap:wrap}
.bt-top-footer{display:flex;justify-content:space-between;align-items:center}
.bt-meta{display:flex;align-items:center;gap:12px}
.bt-avs{display:flex}
.bt-av{width:24px;height:24px;border-radius:50%;background:#4E61F6;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
.bt-av+.bt-av{margin-left:-8px}
.bt-open{font-size:14px;color:#9EA2AE}
.bt-view-btn{display:inline-flex;align-items:center;height:32px;padding:8px 20px;border-radius:8px;background:linear-gradient(to right,#4F39F6,#2B7FFF);color:#fff;font-size:12px;font-weight:600;text-decoration:none}

/* Grid */
.bt-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;padding-bottom:32px}

.bt-state{text-align:center;padding:60px 0;font-size:15px;color:#9EA2AE}
.bt-err{color:#ef4444}

@media(max-width:900px){
  .bt-header{flex-direction:column}.bt-left{flex:none}
  .bt-top{flex-direction:column}.bt-top-right{width:100%}
  .bt-grid{grid-template-columns:1fr}
  .bt-page{padding:16px}
}
</style>