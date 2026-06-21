<template>
  <div class="tc">
    <span class="tc-chip" v-if="project.categories?.length">{{ project.categories[0] }}</span>
    <div class="tc-title-row">
      <h3 class="tc-name">{{ project.title }}</h3>
      <div class="tc-match" v-if="project.matchScore!=null">
        <span>{{ project.matchScore }}%</span>
        <span class="tc-match-label">MATCH</span>
      </div>
    </div>
    <p class="tc-desc">{{ trunc(project.description, 85) }}</p>
    <div class="tc-skills">
      <span class="tc-chip" v-for="s in (project.requiredSkills||[]).slice(0,3)" :key="s">{{ s }}</span>
    </div>
    <div class="tc-footer">
      <div class="tc-meta">
        <div class="tc-avatars">
          <div class="tc-av" v-for="(m,i) in (project.members||[]).slice(0,3)" :key="i">{{ (m?.user?.name||'?')[0]?.toUpperCase() }}</div>
        </div>
        <span class="tc-open">{{ 4-(project.members?.length||0) }} open</span>
      </div>
      <router-link :to="'/browse-teams/'+project._id" class="tc-btn">View team →</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({ project: Object })
function trunc(s,n){ return !s?'':s.length>n?s.slice(0,n)+'...':s }
</script>

<style scoped>
.tc{background:#fff;border-radius:12px;box-shadow:0 6px 14px -6px rgba(19,25,39,.12),0 10px 32px -4px rgba(19,25,39,.1);padding:24px;display:flex;flex-direction:column;gap:16px;transition:transform .2s}
.tc:hover{transform:translateY(-4px)}
.tc-chip{display:inline-flex;align-items:center;height:32px;padding:8px 20px;border-radius:8px;background:#EDEFFE;border:1.5px solid #4E61F6;color:#4E61F6;font-size:12px;font-weight:600;text-transform:uppercase}
.tc-title-row{display:flex;justify-content:space-between;align-items:flex-start}
.tc-name{font-size:18px;font-weight:600;line-height:28px;flex:1;margin:0}
.tc-match{text-align:right;font-size:18px;font-weight:600;color:#131927;flex-shrink:0;width:72px}
.tc-match-label{display:block;font-size:14px;font-weight:600}
.tc-desc{font-size:14px;color:#6D717F;line-height:20px;flex-grow:1}
.tc-skills{display:flex;gap:12px;flex-wrap:wrap}
.tc-footer{display:flex;justify-content:space-between;align-items:center}
.tc-meta{display:flex;align-items:center;gap:12px}
.tc-avatars{display:flex}
.tc-av{width:24px;height:24px;border-radius:50%;background:#4E61F6;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
.tc-av+.tc-av{margin-left:-8px}
.tc-open{font-size:14px;color:#9EA2AE}
.tc-btn{display:inline-flex;align-items:center;height:32px;padding:8px 20px;border-radius:8px;background:linear-gradient(to right,#4F39F6,#2B7FFF);color:#fff;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap}
.tc-btn:hover{opacity:.9}
</style>
