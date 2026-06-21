<template>
  <div class="main-layout reveal" :class="{ 'reveal-visible': isVisible }">
    <header class="header-area">
      <div class="heading-group">
        <div class="sub-heading">- Everything you need -</div>
        <h1 class="main-title">
          Build together, <span>Not alone</span>
        </h1>
      </div>
      <p class="center-desc-text">
        From finding the right teammates to shipping real products, Junior Connect gives you everything in one place
      </p>
    </header>

    <section class="workspace-container">
      <div class="sketch-annotation anno-workspace">
        your<br>&nbsp;&nbsp;project<br>&nbsp;&nbsp;&nbsp;&nbsp;workspace
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M5 35 Q 15 12, 35 5"
            fill="none"
            stroke="#3562FF"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M35 5 L18 8 M35 5 L32 13"
            fill="none"
            stroke="#3562FF"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div class="sketch-annotation anno-ask-ai">
        <svg width="60" height="80" viewBox="0 0 60 80">
          <path
            d="M45 5
               Q 15 20, 25 50
               Q 30 60, 20 58
               Q 10 55, 18 48
               Q 28 40, 15 75"
            fill="none"
            stroke="#8A56FF"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 75 L8 68 M15 75 L22 68"
            fill="none"
            stroke="#8A56FF"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
        <span class="ask-ai-text" style=" position: relative;
    top: 30px;">need<br>help?<br>ask AI</span>
      </div>

      <div class="dashboard-image">
        <img 
          src="../../assets/images/Dashboard.png"
          alt="Dashboard Mockup" 
          class="dashboard-img"
          @error="handleDashboardError"
        />
      </div>
    </section>

    <section class="features-container">
      <div class="sketch-annotation anno-get-help">
        <svg width="70" height="70" viewBox="0 0 70 70">
          <path
            d="M10 60 C 10 25, 45 25, 55 10"
            fill="none"
            stroke="#E2B042"
            stroke-width="2"
            stroke-dasharray="5 4"
            stroke-linecap="round"
          />
          <path
            d="M55 10 L48 12 M55 10 L52 18"
            fill="none"
            stroke="#E2B042"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        get AI help<br>when stuck
      </div>

      <div class="sketch-annotation anno-track-progress">
        <svg width="40" height="30" viewBox="0 0 40 30">
          <path
            d="M5 5 C 12 25, 25 22, 35 25"
            fill="none"
            stroke="#E67E22"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M35 25 L15 25 M35 25 L33 17"
            fill="none"
            stroke="#E67E22"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
        track<br>progress,<br>ship on time
      </div>

      <a 
        v-for="feature in features" 
        :key="feature.id"
        href="#" 
        class="feature-item-card" 
        :class="feature.cardClass"
        @click.prevent="handleFeatureClick(feature)"
      >
        <div>
          <div class="feature-icon-circle" v-html="feature.iconSvg"></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc" v-html="feature.description"></p>
        </div>
        <span class="feature-action-link">Learn more &rarr;</span>
      </a>
    </section>

    <footer class="partner-strip-wrapper">
      <div class="partner-title-tag">- Powered by -</div>
      <div class="strip" role="presentation">
        <div class="strip__track">
          <div class="strip__marquee">
            <template v-for="partner in partners" :key="partner">
              <span class="strip__star" aria-hidden="true">★</span>
              <span class="strip__item">{{ partner }}</span>
            </template>
            <span class="strip__star" aria-hidden="true">★</span>
          </div>
          <div class="strip__marquee" aria-hidden="true">
            <template v-for="partner in partners" :key="`dup-${partner}`">
              <span class="strip__star" aria-hidden="true">★</span>
              <span class="strip__item">{{ partner }}</span>
            </template>
            <span class="strip__star" aria-hidden="true">★</span>
          </div>
          <div class="strip__marquee" aria-hidden="true">
            <template v-for="partner in partners" :key="`dup2-${partner}`">
              <span class="strip__star" aria-hidden="true">★</span>
              <span class="strip__item">{{ partner }}</span>
            </template>
            <span class="strip__star" aria-hidden="true">★</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      isVisible: false,
      dashboardImage: '../../assets/images/image/Dashboard.png',
      partners: ['GitHub', 'Figma', 'Notion', 'Cloud', 'Discord'],
      features: [
        {
          id: 'portfolio',
          title: 'Your Portfolio',
          description: 'Showcase your projects,<br>skills and achievements',
          cardClass: 'card-portfolio',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
        },
        {
          id: 'mentor',
          title: 'AI Mentor',
          description: 'Get instant guidance<br>and smart suggestions',
          cardClass: 'card-mentor',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>'
        },
        {
          id: 'chat',
          title: 'Team Chat',
          description: 'Stay in sync with your<br>teammates in real time',
          cardClass: 'card-chat',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
        },
        {
          id: 'tasks',
          title: 'Task Board',
          description: 'Organize tasks, track<br>progress, ship on time',
          cardClass: 'card-tasks',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>'
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
    });
    
    this.setupIntersectionObserver();
  },
  methods: {
    handleDashboardError(event) {
      event.target.src = 'https://placehold.co/800x600/3562FF/ffffff?text=Dashboard+Mockup';
    },
    
    handleFeatureClick(feature) {
      this.$emit('feature-click', feature);
      console.log(`Feature clicked: ${feature.title}`);
    },
    
    setupIntersectionObserver() {
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.isVisible = true;
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(this.$el);
      }
    }
  }
};
</script>

<style scoped>
/* --- LAYOUT CONTAINER --- */
.main-layout {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  column-gap: 60px;
  row-gap: 40px;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1),
              transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.main-layout.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- HEADER SECTION --- */
.header-area {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.heading-group {
  display: flex;
  flex-direction: column;
}

.sub-heading {
  color: #3562FF;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.main-title {
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  color: #111111;
}

.main-title span {
  color: #3562FF;
  display: block;
  margin-top: 4px;
}

.center-desc-text {
  max-width: 440px;
  font-size: 14px;
  line-height: 1.6;
  color: #666666;
  margin-top: 50px;
  margin-right: 180px;
}

/* --- WORKSPACE CONTAINER --- */
.workspace-container {
  position: relative;
  margin-top: -20px;
}

.dashboard-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-image img {
  width: 100%;
  max-width: 1200px; 
  height: auto;
  border-radius: 20px; 
  object-fit: cover;
}

/* --- FEATURES GRID --- */
.features-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  position: relative;
  align-content: start;
}

.feature-item-card {
  border: 2px solid #111111;
  border-radius: 14px;
  padding: 24px;
  min-height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  transition: all 0.45s cubic-bezier(.2,.8,.2,1);
  position: relative;
  overflow: hidden;
}

.feature-item-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,.7),
    transparent
  );
  transform: translateX(-120%);
  transition: transform .7s ease;
}

.feature-item-card:hover {
  transform: translateY(-12px) rotate(-1deg);
  box-shadow: 0 18px 35px rgba(0,0,0,.12);
}

.feature-item-card:hover::before {
  transform: translateX(120%);
}

.feature-item-card:hover .feature-icon-circle {
  transform: scale(1.15) rotate(10deg);
}

.feature-item-card:hover .feature-action-link {
  transform: translateX(8px);
}

.feature-icon-circle,
.feature-action-link {
  transition: all .4s ease;
}

.card-portfolio { background-color: #E7F5FF !important; }
.card-mentor    { background-color: #FFFAE5 !important; }
.card-chat      { background-color: #F4F0FE !important; }
.card-tasks     { background-color: #FEF4EA !important; }

.feature-icon-circle {
  width: 34px;
  height: 34px;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.feature-icon-circle svg {
  width: 16px;
  height: 16px;
}

.card-portfolio svg { color: #3562FF; }
.card-mentor svg    { color: #F5B041; }
.card-chat svg      { color: #9B5DE5; }
.card-tasks svg     { color: #E67E22; }

.feature-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 13px;
  line-height: 1.45;
  color: #666666;
  font-weight: 400;
  margin-bottom: 14px;
}

.feature-action-link {
  font-size: 13px;
  font-weight: 600;
  color: #3562FF;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
}

/* --- HAND-DRAWN SVG ANNOTATIONS --- */
.sketch-annotation {
  position: absolute;
  z-index: 100;
  pointer-events: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
}

.anno-workspace {
  top: -45px;
  left: 175px;
  color: #3562FF;
}
.anno-workspace svg {
  position: absolute;
  top: 24px;
  left: -35px;
}

.anno-ask-ai {
  bottom: -70px;
  left: 250px;
  color: #8A56FF;
  text-align: center;
}
.anno-ask-ai svg {
  position: absolute;
  top: -50px;
  left: 20px;
}

.anno-get-help {
  top: -55px;
  right: 45px;
  color: #E2B042;
}
.anno-get-help svg {
  position: absolute;
  top: 24px;
  left: -32px;
}

.anno-track-progress {
  bottom: -45px;
  right: 40px;
  color: #E67E22;
}
.anno-track-progress svg {
  position: absolute;
  top: -24px;
  left: -38px;
}

.partner-strip-wrapper {
  grid-column: 1 / -1;
  margin-top: 80px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.partner-title-tag {
  color: #3562FF;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.strip {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: #FAFAFA;
  overflow: hidden;
  width: 100%;
}

.strip__track {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
  min-height: 52px;
  font-size: 24px;
  color: #000;
  white-space: nowrap;
  width: fit-content;
  animation: scrollInfinite 25s linear infinite;
}

.strip__marquee {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.strip__star {
  font-size: 20px;
  flex-shrink: 0;
}

.strip__item {
  flex-shrink: 0;
  font-weight: 400;
}

.strip:hover .strip__track {
  animation-play-state: paused;
}

@keyframes scrollInfinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

/* --- RESPONSIVE --- */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    row-gap: 60px;
  }
  
  .header-area {
    flex-direction: column;
    gap: 20px;
  }
  
  .center-desc-text {
    margin-top: 0;
    margin-right: 0;
    max-width: 100%;
  }
  
  .sketch-annotation {
    display: none;
  }
  
  .partner-title-tag {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 900px) {
  .strip__track {
    font-size: 18px;
    gap: 16px;
    animation: scrollInfinite 20s linear infinite;
  }
  
  .strip__marquee {
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .main-layout {
    padding: 0 16px;
  }
  
  .main-title {
    font-size: 32px;
  }
  
  .features-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .feature-item-card {
    min-height: auto;
    padding: 18px;
  }
  
  .feature-title {
    font-size: 18px;
  }
  
  .strip__track {
    font-size: 16px;
    gap: 12px;
    animation: scrollInfinite 18s linear infinite;
    padding: 8px 0;
    min-height: 44px;
  }
  
  .strip__marquee {
    gap: 12px;
  }
  
  .strip__star {
    font-size: 14px;
  }
  
  .partner-title-tag {
    padding: 0 16px;
  }
}
</style>