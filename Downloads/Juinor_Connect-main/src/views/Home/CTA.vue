<template>
  <section class="cta-section reveal" :class="{ 'reveal-visible': isVisible }">
    <div class="cta-background">
      <img 
        src="../../assets/images/marvin-meyer-SYTO3xs06fU-unsplash 1.png" 
        alt="Workspace background" 
        class="bg-image"
        @error="handleImageError"
      />
      <div class="gradient-overlay"></div>
    </div>

    <div class="cta-content">
      <h2 class="cta-heading">
        Your first project <br class="mobile-break" /> starts here
      </h2>

      <div class="wavy-line-container">
        <svg 
          width="240" 
          height="24" 
          viewBox="0 0 180 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          class="wavy-svg"
        >
          <path 
            d="M10 10Q30 2 50 10T90 10T130 10T170 10" 
            stroke="#f59e0b" 
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p class="cta-description">
        Free forever. No résumé needed. Just bring the curiosity, we'll bring the crew, 
        the events, the deadlines you actually want to hit.
      </p>

      <div class="button-wrapper">
        <!-- Left Arrow -->
        <div class="arrow arrow-left">
          <svg width="65" height="45" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 35 C 5 15, 35 5, 50 12" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>
            <path d="M38 4 L 50 12 L 45 23" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>

        <button class="cta-btn" @click="handleJoinClick">
          {{ buttonText }}
        </button>

        <div class="arrow arrow-right">
          <svg width="65" height="45" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55 5 C 55 25, 25 35, 10 28" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>
            <path d="M22 35 L 10 28 L 15 17" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>

        <div class="star star-button-right">★</div>
      </div>

      <div class="star star-left-mid">★</div>
      <div class="star star-title-right">★</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CTASection',
  data() {
    return {
      isVisible: false,
      backgroundImage: '../../assets/images/marvin-meyer-SYTO3xs06fU-unsplash 1.png',
      buttonText: 'Join Junior Connect'
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
    handleImageError(event) {

      event.target.src = 'https://placehold.co/1920x1080/1a1a2e/ffffff?text=Workspace+Background';
    },
    
    handleJoinClick() {
      this.$emit('join-click');
      console.log('Join Junior Connect button clicked');
      
      const button = event.currentTarget;
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
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
          { threshold: 0.2 }
        );
        observer.observe(this.$el);
      }
    }
  }
};
</script>

<style scoped>
.cta-section {
  position: relative;
  min-height: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #ffffff;
  padding: 80px 20px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1),
              transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.cta-section.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #ffffff 20%, #2563EB 30%, #00C0E8 50%, #8A38F5 100%);
  opacity: 0.8;
  mix-blend-mode: multiply;
}

.cta-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-heading {
  font-size: 4.2rem;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 5px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.mobile-break {
  display: none;
}

.wavy-line-container {
  margin: 10px 0 25px 0;
}

.wavy-svg {
  width: 260px;
}

.cta-description {
  font-size: 1.15rem;
  font-weight: 400;
  max-width: 580px;
  line-height: 1.5;
  margin: 0 0 45px 0;
  color: rgba(255, 255, 255, 0.95);
}

.button-wrapper {
  position: relative;
  display: inline-block;
  padding: 0 20px;
}

.cta-btn {
  background-color: #ffffff;
  color: #4f46e5;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 16px 42px;
  border: 3px solid rgba(165, 180, 252, 0.4);
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.cta-btn:hover {
  background-color: #f8fafc;
  transform: scale(1.02);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
}

.cta-btn:active {
  transform: scale(0.98);
}

.arrow {
  position: absolute;
  display: block;
  pointer-events: none;
  opacity: 0.85;
}

.arrow-left {
  left: -55px;
  top: -15px;
}

.arrow-right {
  right: -50px;
  bottom: -22px;
}

.star {
  position: absolute;
  color: #f59e0b;
  font-size: 1.4rem;
  user-select: none;
  opacity: 0.9;
  pointer-events: none;
}

.star-title-right {
  right: 21%;
  top: 15%;
  font-size: 1.1rem;
}

.star-left-mid {
  left: 12%;
  bottom: 25%;
  font-size: 1.3rem;
}

.star-button-right {
  right: -40px;
  bottom: -15px;
  font-size: 1.3rem;
}

/* --- Responsive Media Queries --- */
@media (max-width: 768px) {
  .cta-section {
    padding: 60px 20px;
    min-height: auto;
  }

  .cta-heading {
    font-size: 2.6rem;
  }
  
  .mobile-break {
    display: block;
  }

  .cta-description {
    font-size: 1rem;
    margin: 0 0 35px 0;
  }

  .cta-btn {
    padding: 12px 32px;
    font-size: 1rem;
  }

  .arrow,
  .star {
    display: none;
  }
}

@media (max-width: 480px) {
  .cta-heading {
    font-size: 2rem;
  }
  
  .cta-description {
    font-size: 0.9rem;
  }
  
  .cta-btn {
    padding: 10px 28px;
    font-size: 0.9rem;
  }
  
  .wavy-svg {
    width: 200px;
  }
}
</style>