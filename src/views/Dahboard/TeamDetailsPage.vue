<template>
  <div>
    <Navbar />
    <LoadingScreen :visible="loading" />
    <div v-if="loading" style="display:none"></div>
    <div v-else-if="error" class="td-state td-err">{{ error }}</div>

    <div v-else-if="project" class="td-page">
      <div class="td-left">
        <div class="td-tags">
          <span class="td-chip" v-for="c in project.categories" :key="c">{{ c }}</span>
          <span class="td-chip td-chip-grey" v-if="project.estimatedTime">{{ project.estimatedTime }}</span>
        </div>
        <h1 class="td-title">{{ project.title }}</h1>
        <p class="td-desc">{{ project.description }}</p>
        <div v-if="project.requiredSkills?.length" class="td-stack">
          <h3>Required Stack</h3>
          <div class="td-chips"><span class="td-chip" v-for="s in project.requiredSkills" :key="s">{{ s }}</span></div>
        </div>
      </div>

      <div class="td-right">
        <h2 class="td-rh">Vibe check</h2>
        <div class="td-vibes">
          <div class="td-vibe" v-for="v in vibes" :key="v.t">
            <strong>{{ v.t }}</strong><span>{{ v.d }}</span>
          </div>
        </div>

        <div class="td-roster-head">
          <h2 class="td-rh">The Roster</h2>
          <span class="td-roster-badge">{{ project.members?.length||0 }}/4</span>
        </div>
        <div class="td-roster">
          <div class="td-member" v-for="m in project.members" :key="m._id">
            <div class="td-mav">{{ (m.user?.name||'?')[0]?.toUpperCase() }}</div>
            <strong>{{ m.user?.name||'Member' }}</strong>
            <span>{{ m.role||'Team member' }}</span>
          </div>
          <div class="td-member td-open" v-for="i in openSlots" :key="'o'+i">
            <div class="td-mav td-mav-empty">+</div>
            <strong>Open Role</strong>
            <span>Waiting for you</span>
          </div>
        </div>

        <hr style="border:none;border-top:1px solid #E5E7EA;margin:12px 0">

        <button v-if="!isMember&&!project.isFull" class="td-join" :disabled="joining" @click="handleJoin">
          {{ joining?'Joining...':'Join Team →' }}
        </button>
        <button v-else-if="isMember" class="td-leave" :disabled="leaving" @click="handleLeave">
          {{ leaving?'Leaving...':'Leave team' }}
        </button>
        <p v-else class="td-full">Team is full (4/4)</p>

        <router-link to="/browse-teams" class="td-back">← Back to teams</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById, joinProject, leaveProject, checkStatus } from '../../services/api'
import Navbar from '../../components/Navbar.vue'
import LoadingScreen from '../../components/LoadingScreen.vue'

const route = useRoute()
const router = useRouter()
const project = ref(null)
const currentUserId = ref(null)
const loading = ref(true)
const error = ref(null)
const joining = ref(false)
const leaving = ref(false)

const vibes = [
  { t:'Voice Chat History', d:'Conversations come as a must.' },
  { t:'Late Nights', d:'Core hours: 10PM – 4AM EST.' },
  { t:'Move Fast', d:'Ship first, refactor later.' },
]

const openSlots = computed(() => Math.max(0, 4-(project.value?.members?.length||0)))
const isMember = computed(() => {
  if (!currentUserId.value||!project.value?.members) return false
  return project.value.members.some(m => String(m.user?._id||m.user)===String(currentUserId.value))
})

onMounted(async () => {
  try {
    const [p, a] = await Promise.all([getProjectById(route.params.id), checkStatus()])
    project.value = p
    currentUserId.value = a.user?._id||a.user?.id
  } catch(e){ error.value = e.message }
  finally { loading.value = false }
})

async function handleJoin(){
  joining.value = true
  try {
    const d = await joinProject({ title:project.value.title, description:project.value.description, requiredSkills:project.value.requiredSkills, categories:project.value.categories, difficulty:project.value.difficulty, estimatedTime:project.value.estimatedTime })
    project.value = d.project
  } catch(e){ alert(e.message) }
  finally { joining.value = false }
}

async function handleLeave(){
  if (!confirm('Leave this team?')) return
  leaving.value = true
  try { await leaveProject(project.value._id); router.push('/browse-teams') }
  catch(e){ alert(e.message) }
  finally { leaving.value = false }
}
</script>

<style scoped>
.td-page{display:flex;min-height:calc(100vh - 80px)}
.td-left{flex:1;padding:40px 60px}
.td-right{width:420px;flex-shrink:0;background:#FAFBFF;padding:32px;display:flex;flex-direction:column;gap:14px}

.td-tags{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.td-title{font-size:36px;font-weight:700;line-height:44px;margin:0 0 12px}
.td-desc{font-size:15px;color:#6D717F;line-height:24px;margin-bottom:24px}
.td-stack h3{font-size:18px;font-weight:600;margin:0 0 12px}
.td-chips{display:flex;gap:12px;flex-wrap:wrap}

.td-chip{display:inline-flex;align-items:center;height:32px;padding:8px 20px;border-radius:8px;background:#EDEFFE;border:1.5px solid #4E61F6;color:#4E61F6;font-size:12px;font-weight:600;text-transform:uppercase}
.td-chip-grey{background:#f1f5f9;border-color:#E5E7EA;color:#6D717F;text-transform:none}

.td-rh{font-size:24px;font-weight:700;margin:0}
.td-vibes{display:flex;flex-direction:column;gap:12px}
.td-vibe{background:#fff;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.04);display:flex;flex-direction:column;gap:4px}
.td-vibe strong{font-size:15px}
.td-vibe span{font-size:13px;color:#6D717F}

.td-roster-head{display:flex;align-items:center;justify-content:space-between;margin-top:8px}
.td-roster-badge{font-size:12px;color:#4E61F6;background:#EDEFFE;border:1px solid #4E61F6;padding:2px 10px;border-radius:12px}
.td-roster{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.td-member{display:flex;flex-direction:column;align-items:center;gap:6px;padding:18px;border-radius:12px;background:#fff;border:1.5px solid #E5E7EA;text-align:center}
.td-member strong{font-size:13px}
.td-member span{font-size:12px;color:#9EA2AE}
.td-mav{width:48px;height:48px;border-radius:50%;background:#4E61F6;color:#fff;font-size:18px;font-weight:600;display:flex;align-items:center;justify-content:center}
.td-mav-empty{background:#EDEFFE;color:#4E61F6;border:2px dashed #4E61F6}

.td-join{width:100%;height:50px;border-radius:12px;border:none;background:linear-gradient(to right,#4F39F6,#2B7FFF);color:#fff;font-size:15px;font-weight:600;cursor:pointer;transition:.2s}
.td-join:hover{opacity:.9}.td-join:disabled{opacity:.6;cursor:not-allowed}
.td-leave{width:100%;height:50px;border-radius:12px;border:none;background:#FEE2E2;color:#DC2626;font-size:15px;font-weight:600;cursor:pointer}
.td-leave:hover{background:#FECACA}
.td-full{text-align:center;color:#9EA2AE;font-size:14px}
.td-back{display:block;text-align:center;color:#4E61F6;font-size:14px;font-weight:500;text-decoration:none;margin-top:4px}
.td-back:hover{text-decoration:underline}

.td-state{text-align:center;padding:80px 0;font-size:15px;color:#9EA2AE}
.td-err{color:#ef4444}

@media(max-width:900px){.td-page{flex-direction:column}.td-right{width:100%}.td-left{padding:24px 16px}}
</style>