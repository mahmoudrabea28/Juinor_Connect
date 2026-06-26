<script setup>
const items = [
  'build your first résumé project',
  'find your people',
  'code · ship · repeat',
]
</script>

<template>
  <section class="hero">
    <div class="hero__glow hero__glow--top-left" aria-hidden="true"></div>
    <div class="hero__glow hero__glow--bottom-right" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__content">
        <div class="hero__badges">
          <span class="badge badge--yellow">LIVE · AI Hackathon weekend</span>
          <span class="badge badge--cyan">+1,200 juniors connected this week</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__line">Where</span>
          <span class="hero__line hero__line--nowrap"
            >juniors
            <span class="hero__create">
              <span class="hero__create-text">create</span>
              <svg
                class="hero__squiggle"
                viewBox="0 0 240 10"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7 Q 16 1, 32 6 T 62 6 T 92 6 T 122 6 T 152 6 T 182 6 T 212 6 T 238 5"
                  stroke="#FFB800"
                  stroke-width="3.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </span>
          <span class="hero__line">impact</span>
        </h1>

        <p class="hero__subtitle">
          A community of student devs, builders and dreamers. Find your
          teammates, ship your first project, win your first hackathon and turn
          late night code into a real career.
        </p>

        <div class="hero__actions">
          <button class="btn btn--primary" type="button">
            <span>Explore Hackathons</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="btn btn--outline" type="button">View Projects</button>
        </div>

        <div class="hero__social-proof">
          <div class="hero__avatars">
            <div class="avatar-container">
              <span class="avatar" style="background: #630ed4"></span>
              <span class="avatar-tooltip">#630ED4</span>
            </div>
            <div class="avatar-container">
              <span class="avatar" style="background: #ffdc3a"></span>
              <span class="avatar-tooltip">#FFDC3A</span>
            </div>
            <div class="avatar-container">
              <span class="avatar" style="background: #cb8c8c"></span>
              <span class="avatar-tooltip">#CB8C8C</span>
            </div>
          </div>
          <p class="hero__social-text">
            <strong>25,000+</strong> juniors from <strong>95</strong>
            universities already inside.
          </p>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__collage">
          <img
            src="../../assets/images/Hero section (1).png"
            alt="Students collaborating during a hackathon"
          />
        </div>

        <div class="float-card float-card--publish" aria-hidden="true">
          <div class="float-card__head">
            <span class="float-card__icon">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#004AC6"
                  stroke-width="1.6"
                />
                <path
                  d="M5 6l3 2.5L5 11M10 11h5"
                  stroke="#004AC6"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="float-card__title">New Project Published! 🚀</span>
          </div>
          <div class="float-card__progress">
            <div class="float-card__progress-fill"></div>
          </div>
          <p class="float-card__caption">Deploying to production...</p>
        </div>

        <div class="float-card float-card--code" aria-hidden="true">
          <pre><code><span class="tk-cyan">const</span> <span class="tk-purple">builder</span><span class="tk-white"> = {</span>
<span class="tk-white">  level: </span><span class="tk-cyan">'legendary'</span><span class="tk-white">,</span>
<span class="tk-white">  vision: </span><span class="tk-cyan">'unlimited'</span>
<span class="tk-white">};</span>
<span class="tk-blue">builder.buildFuture();</span></code></pre>
        </div>
      </div>
    </div>
  </section>

  <div class="strip" role="presentation">
    <div class="strip__track">
      <div class="strip__marquee">
        <template v-for="item in items" :key="item">
          <span class="strip__star" aria-hidden="true">★</span>
          <span class="strip__item">{{ item }}</span>
        </template>
        <span class="strip__star" aria-hidden="true">★</span>
      </div>
      <div class="strip__marquee" aria-hidden="true">
        <template v-for="item in items" :key="`dup-${item}`">
          <span class="strip__star" aria-hidden="true">★</span>
          <span class="strip__item">{{ item }}</span>
        </template>
        <span class="strip__star" aria-hidden="true">★</span>
      </div>
      <div class="strip__marquee" aria-hidden="true">
        <template v-for="item in items" :key="`dup2-${item}`">
          <span class="strip__star" aria-hidden="true">★</span>
          <span class="strip__item">{{ item }}</span>
        </template>
        <span class="strip__star" aria-hidden="true">★</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
  Hero
   ========================================================================== */
.hero {
  position: relative;
  padding: 24px 0 80px;
  overflow: hidden; 
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px); 
  pointer-events: none; 
  z-index: 0;
}

.hero__glow--top-left {
  top: -80px;
  left: -80px;
  width: 350px;
  height: 350px;
  background: rgba(37, 99, 235, 0.3); 
}

.hero__glow--bottom-right {
  bottom: -60px;
  right: -60px;
  width: 400px;
  height: 400px;
  background: rgba(255, 170, 0, 0.3);
}

.hero__inner {
  position: relative;
  z-index: 1; 
  width: min(1218px, 100% - 48px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  max-width: 594px;
  flex: 1 1 50%;
}

/* Badges */
.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #000;
  border-radius: 50px;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
}

.badge--yellow {
  background: var(--yellow);
}

.badge--cyan {
  background: var(--light-cyan);
}

/* Headline */
.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(44px, 6.9vw, 100px);
  line-height: 1.24;
  color: #000;
}

.hero__line {
  display: block;
}

.hero__line--nowrap {
  white-space: nowrap;
}

.hero__create {
  position: relative;
  display: inline-block;
}

.hero__create-text {
  background: linear-gradient(
    90deg,
    var(--blue-main) 0%,
    var(--accent-cyan) 69%,
    var(--accent-purple) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__squiggle {
  position: absolute;
  left: 6%;
  bottom: 0.08em;
  width: 88%;
  height: 10px;
}

/* Subtitle */
.hero__subtitle {
  margin: 0;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--text-secondary);
  max-width: 592px;
}

/* CTAs */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  white-space: nowrap;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:focus-visible {
  outline: 2px solid var(--deep-blue);
  outline-offset: 2px;
}

.btn--primary {
  background: var(--primary-500);
  color: var(--text-white);
  min-width: 288px;
}

.btn--primary:hover {
  filter: brightness(1.07);
}

.btn--outline {
  border: 1.5px solid var(--primary-500);
  color: var(--primary-500);
  min-width: 187px;
  background: transparent;
}

.btn--outline:hover {
  background: rgba(78, 97, 246, 0.06);
}

/* Social proof pill */
.hero__social-proof {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-card);
}

.hero__avatars {
  display: flex;
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container + .avatar-container {
  margin-left: -12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border: 2px solid var(--blue-main);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.avatar-container:hover .avatar-tooltip {
  opacity: 1;
}

.hero__social-text {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--blue-main);
}

.hero__social-text strong {
  font-weight: 700;
}

/* Right visual */
.hero__visual {
  position: relative;
  flex: 1 1 50%;
  min-width: 0;
  padding-top: 120px;
}

.hero__collage {
  width: 100%;
}

.hero__collage img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.18));
}

.float-card {
  position: absolute;
  background: #fff;
  border-radius: 24px;
  box-shadow: var(--shadow-card);
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
  will-change: transform;
}

.float-card--publish {
  top: 0;
  left: 10%;
  width: 280px;
  padding: 25px;
  border: 1px solid rgba(0, 74, 198, 0.2);
  transform: rotate(-17deg);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.float-card--publish:hover {
  transform: rotate(-17deg) translate(-28px, -30px);
}

.float-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 8px;
}

.float-card__icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: rgba(0, 74, 198, 0.1);
  display: grid;
  place-items: center;
}

.float-card__title {
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.7px;
  color: var(--deep-blue);
  text-align: center;
}

.float-card__progress {
  height: 12px;
  width: 100%;
  border-radius: 9999px;
  background: #ededf9;
  overflow: hidden;
}

.float-card__progress-fill {
  height: 100%;
  width: 85%;
  background: var(--deep-blue);
}

.float-card__caption {
  margin: 0;
  align-self: center;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 15px;
  color: #434655;
}

/* Floating code card */
.float-card--code {
  bottom: -6%;
  right: -2%;
  background: var(--code-bg);
  padding: 24px;
  z-index: 2;
}

.float-card--code:hover {
  transform: translate(28px, 30px);
}

.float-card--code pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 20px;
}

.tk-cyan {
  color: #acedff;
}
.tk-purple {
  color: #ddb7ff;
}
.tk-white {
  color: #faf8ff;
}
.tk-blue {
  color: #dbe1ff;
}

/* Responsive for Hero */
@media (max-width: 1100px) {
  .hero__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 72px;
  }

  .hero__visual {
    width: 100%;
    max-width: 640px;
    margin-inline: auto;
  }
}

@media (max-width: 560px) {
  .hero {
    padding-top: 32px;
  }
  .hero__glow--top-left {
    width: 180px;
    height: 180px;
  }
  
  .hero__glow--bottom-right {
    width: 200px;
    height: 200px;
  }

  .hero__content {
    gap: 28px;
  }

  .badge {
    font-size: 13px;
    line-height: 20px;
  }

  .btn--primary,
  .btn--outline {
    min-width: 0;
    width: 100%;
  }

  .hero__actions {
    width: 100%;
  }

  .hero__social-proof {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
  }

  .hero__visual {
    padding-top: 90px;
  }

  .float-card--publish {
    width: 220px;
    padding: 18px;
    left: 0;
  }

  .float-card--code {
    padding: 16px;
  }

  .float-card--code pre {
    font-size: 11px;
    line-height: 16px;
  }
  
  .avatar-tooltip {
    font-size: 9px;
    padding: 3px 6px;
    bottom: -26px;
  }
}

/* ==========================================================================
   Styles for the Strip component (the animated marquee)
   ========================================================================== */
.strip {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: var(--background);
  overflow: hidden;
  width: 100%;
}

.strip__track {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
  min-height: 52px;
  font-family: var(--font-display);
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
}

@keyframes scrollInfinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.strip:hover .strip__track {
  animation-play-state: paused;
}

/* Responsive for Strip */
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

@media (max-width: 600px) {
  .strip__track {
    animation: scrollInfinite 18s linear infinite;
  }
}
</style>