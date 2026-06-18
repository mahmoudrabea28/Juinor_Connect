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

      <div class="card">
        <div class="ai-header">
          <span class="ai-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> AI-GENERATED PROFILE</span>
          <h2>Product-Minded Developer & CS Student building useful tools with React & TS</h2>
          <p class="description" style="color: #596475;">Intermediate CS student focused on the intersection of product engineering and designer-developer workflows. Proven ability to ship functional tools using React and Node.js with a keen eye for UI/UX via Figma and Tailwind.</p>
          <div class="tags">
            <span class="tag"><i class="fa-regular fa-star"></i> Full-stack prototyping</span>
            <span class="tag"><i class="fa-regular fa-star"></i> Rapid feature shipping</span>
            <span class="tag"><i class="fa-regular fa-star"></i> User-centric product design</span>
          </div>
        </div>

        <hr class="divider" style="color: #596475; margin: 20px 0;">

        <div class="recommendations-header">
          <h3>Teams we recommend for you</h3>
          <button class="regenerate-btn">
           <i class="fa-solid fa-arrows-rotate"></i>Regenerate
          </button>
        </div>
        <p class="subtitle" style="color: #596475;">Ranked by how well your skills, interests and availability fit.</p>

        <div class="recommendations-grid">
          <div v-for="team in teams" :key="team.name" class="team-card">
            <div class="team-top">
              <span class="team-name">{{ team.name }}</span>
              <span class="team-score">{{ team.score }}</span>
            </div>
            <p class="team-meta">{{ team.meta }}</p>
            <p class="team-desc">{{ team.desc }}</p>
            <div class="team-footer">
              <span class="role-badge">{{ team.role }}</span>
              <br>
              <span class="members"><i class="fa-regular fa-user"></i> {{ team.members }} members</span>
            </div>
            <button class="join-btn"><i class="fa-regular fa-comment" style="margin-right: 5px;"></i>join</button>
          </div>
        </div>

        <div class="footer-actions">
                <router-link to="/MatchwithAi"> <button class="back-btn">← Back</button></router-link> 
        <router-link to="/availability1">  <button class="finish-btn">Finish & explore</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: ['Personal info', 'Skills', 'Interests', 'Experience level', 'Availability', 'AI profile'],
      teams: [
        { name: 'GreenByte Analytics', score: '94%', meta: 'Climate Tech · Carbon Dashboard', desc: 'Direct overlap with your interest in Climate Tech and expert-level React/Tailwind skills for data visualization.', role: 'Frontend Developer', members: 3 },
        { name: 'PromptFlow', score: '89%', meta: 'AI & Agents · Workflow Automation', desc: 'Perfect match for a student interested in shipping small, useful AI tools using TypeScript and Node.js.', role: 'Fullstack Engineer', members: 4 },
        { name: 'DevDoc Express', score: '82%', meta: 'Developer Tools · Documentation CLI', desc: 'Aligns with your experience in building dev tools and fits your flexible weekend availability.', role: 'Product Engineer', members: 2 }
      ]
    };
  }
};
</script>

<style scoped>
/* Page & Background */
.page-wrapper { min-height: 100vh; background: linear-gradient(160deg, #E0E7FF 0%, #EFF6FF 55%, #FFFFFF 100%); display: flex; justify-content: center; align-items: center; padding: 40px 20px; position: relative; overflow: hidden; }
.page-wrapper::before { content: ''; position: absolute; top: -60px; left: -60px; width: 220px; height: 220px; border-radius: 50%; background: #C6D2FF; filter: blur(60px); opacity: 0.75; pointer-events: none; }
.page-wrapper::after { content: ''; position: absolute; bottom: -60px; right: -60px; width: 220px; height: 220px; border-radius: 50%; background: #8EC5FF; filter: blur(60px); opacity: 0.65; pointer-events: none; }
.solid-dot { position: fixed; width: 12px; height: 12px; background-color: #7C86FF; border-radius: 50%; pointer-events: none; }
.solid-dot--top-right { top: 50px; right: 50px; }
.solid-dot--bottom-left { bottom: 50px; left: 50px; }

/* Header & Progress */
.header { display: flex; justify-content: center; align-items: center; margin-bottom: 40px; width: 100%;}
.logo { height: 70px; display: block;}
.progress-bar { display: flex; justify-content: center; gap: 10px; margin-bottom: 40px; font-size: 12px; }
.step { display: flex; align-items: center; gap: 5px; color: #6b7280; opacity: 0; animation: fadeIn 0.5s ease forwards; }
.step-number { width: 22px; height: 22px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
.step.active .step-number { background: #2071F3; }
.step.completed .step-number { background: #7C86FF; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Main Card */
.card { background: white; padding: 40px; border-radius: 20px; max-width: 800px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.ai-badge { color: #2563EB; font-size: 16px; padding: 4px 10px; border-radius: 6px; }
.tags { display: flex; gap: 10px; margin-top: 20px; }
.tag { border: 1px solid #2071F3; padding: 6px 12px; border-radius: 20px; font-size: 12px; background: #DFF0FF; color:#2071F3;}

/* Recommendations */
.recommendations-header { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
.regenerate-btn { background: none; border: none; color: #2563EB; cursor: pointer; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
.recommendations-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; align-items: stretch; }
.team-card { border: 1px solid #e5e7eb; padding: 20px; border-radius: 16px; display: flex; flex-direction: column; transition: all 0.3s ease; }
.team-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: #2563EB; }


.team-top { display: flex; justify-content: space-between; align-items: center; font-weight: bold; gap: 10px; }

.team-score { 
    color: #2563EB; 
    background: #E0E7FF; 
    padding: 4px 10px; 
    border-radius: 8px; 
    font-size: 12px; 
    font-weight: 700;
    flex-shrink: 0; 
    text-align: center;
    min-width: 45px;
}

.role-badge {
    display: inline-block;
    padding: 10px 10px;
    border: 1px solid #6b7280;
    border-radius: 20px;
    font-size: 14px;
    color: #091123;
    margin-bottom: 8px;
    width: fit-content;
}

.team-desc { flex-grow: 1; font-size: 13px; color: #6b7280; margin: 10px 0; }
.join-btn { width: 100%; padding: 8px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; background: white; transition: 0.2s; }
.join-btn:hover { background: #f8fafc; }

/* Footer */
.footer-actions { display: flex; justify-content: space-between; margin-top: 40px; }
.finish-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; color: #f2f4fb; font-weight: 600; font-size: 14px; padding: 12px 16px; background: linear-gradient(90deg, #4F39F6, #2B7FFF); border-radius: 12px; box-shadow: 0 10px 22px -10px rgba(79, 57, 246, 0.6); transition: 0.25s; }
.finish-btn:hover{ transform: translateY(-2px); box-shadow: 0 16px 30px -10px rgba(43, 127, 255, 0.65); }
.back-btn { background: none; border: none; color: #6b7280; cursor: pointer; }
</style>