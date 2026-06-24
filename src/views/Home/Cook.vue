<template>
  <div class="cook-section-container reveal left" :class="{ 'reveal-left': isVisible }">
    <div class="section-content">
      <section class="cook-section">
        <div class="cook-image-wrapper">
          <img 
            src="../../assets/images/watch us cook.png" 
            alt="Students coding" 
            class="cook-img"
            @error="handleImageError"
          />
        </div>
        
        <div class="cook-content">
          <span class="sub-tag">-watch us cook -</span>
          <h2 class="cook-title">
            48 hours <span class="gradient-text">Countless ideas</span>
          </h2>
          
          <p class="cook-description">
            A weekend of coding, collaboration, and creativity. 
            Watch ambitious students turn bold ideas into real projects, 
            solve challenges together, and build something worth sharing. 
            Because the best stories don't start in classrooms — 
            they start with a team and a single idea.
          </p>
          
          <div class="info-badge">
            48h · 12 teams · 1 winner
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchUsCook',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    // Trigger reveal animation after mount
    this.$nextTick(() => {
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
    });
  },
  methods: {
    handleImageError(e) {
      // Fallback image in case the original path doesn't exist
      e.target.src = 'https://placehold.co/600x400/1a1a2e/ffffff?text=Coding+Weekend';
    }
  }
}
</script>

<style scoped>
/* Smooth scoped styles — matches original design perfectly */
.cook-section-container {
  width: 100%;
  background-color: #ffffff;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), 
              transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.cook-section-container.reveal-left {
  opacity: 1;
  transform: translateX(0);
}

.section-content {
  padding: 2.5rem 2.8rem;
}

.cook-section {
  display: flex;
  align-items: center;
  gap: 45px;
  width: 100%;
}

.cook-image-wrapper {
  flex: 1;
  max-width: 50%;
}

.cook-img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  display: block;
  object-fit: cover;
  box-shadow: 0 10px 22px -8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.cook-img:hover {
  transform: scale(1.01);
}

.cook-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sub-tag {
  color: #2563EB;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: #eff6ff;
  display: inline-block;
  width: fit-content;
  padding: 0.2rem 0.8rem;
  border-radius: 40px;
}

.cook-title {
  font-size: 3.4rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
}

.gradient-text {
    background: linear-gradient(
    90deg,
    var(--blue-main) 0%,
    var(--accent-cyan) 69%,
    var(--accent-purple) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 500;
}

.cook-description {
  font-size: 0.98rem;
  color: #2c2f36;
  line-height: 1.55;
  font-weight: 400;
  max-width: 520px;
  margin: 0;
}

.info-badge {
  width: max-content;
  background-color: #FFDC3A;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 10px;
  box-shadow: 4px 4px 0px #000000;
  transition: all 0.15s linear;
  letter-spacing: -0.2px;
}

.info-badge:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0px #000000;
}

/* Responsive styles */
@media (max-width: 860px) {
  .section-content {
    padding: 1.8rem;
  }
  .cook-section {
    gap: 30px;
    flex-direction: column;
  }
  .cook-image-wrapper {
    max-width: 100%;
    width: 100%;
  }
  .cook-content {
    width: 100%;
  }
  .cook-title {
    font-size: 2.5rem;
  }
  .cook-description {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .section-content {
    padding: 1.2rem;
  }
  .cook-title {
    font-size: 2rem;
  }
  .sub-tag {
    font-size: 0.75rem;
  }
  .info-badge {
    font-size: 0.75rem;
    padding: 6px 14px;
  }
}
</style>