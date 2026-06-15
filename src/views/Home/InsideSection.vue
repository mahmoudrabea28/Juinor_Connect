<template>
  <div
    class="inside-section-container reveal"
    :class="{ 'reveal-visible': isVisible }"
  >
    <!-- Curved dotted line SVG background -->
    <svg
      class="bg-curved-line"
      viewBox="0 0 1440 1200"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 0 
           C 300 20, 10 10, 350 40
           C 1000 -60, 1400 120, 1490 280 
           C 1300 480, 800 320, 600 520 
           C 300 820, 100 400, -80 750 
           C 150 1000, 400 600, 700 1120 
           C 950 1250, 1000 1000, 1500 1140"
        stroke="#FFE57F"
        stroke-width="3"
        stroke-dasharray="12 12"
        stroke-linecap="round"
      />
    </svg>

    <div class="section-content">
      <h2 class="serif-title inside-main-title">
        What you actually <span>get </span>inside
      </h2>

      <div class="features-column">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-row"
          :class="{ 'animate-in': animatedFeatures[index] }"
        >
          <div class="feature-image-block">
            <img
              :src="feature.imageSrc"
              :alt="feature.imageAlt"
              class="feature-img"
              @error="handleImageError($event, index)"
            />
            <div class="step-counter">{{ feature.step }}</div>
          </div>
          <div class="feature-text-block">
            <h3 class="serif-title feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <a
              href="#"
              class="inside-action-btn"
              @click.prevent="handleActionClick(feature)"
            >
              {{ feature.buttonText }} <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsideSection",
  data() {
    return {
      isVisible: false,
      animatedFeatures: [false, false, false],
      features: [
        {
          step: "1 / 3",
          imageSrc: new URL(
            "../../assets/images/Find your hackathon.png",
            import.meta.url,
          ).href,
          imageAlt: "Find your crew",
          title: "Find your hackathon crew in 1 day",
          description:
            "Skill-matched teammate finder, plus async dorm rooms for every event. No more solo entries.",
          buttonText: "Try teammate finder",
          buttonAction: "teammate-finder",
        },
        {
          step: "2 / 3",
          imageSrc: new URL(
            "../../assets/images/watch us cook.png",
            import.meta.url,
          ).href,
          imageAlt: "Ship things like real work",
          title: "Ship things that look like real work",
          description:
            "Mentors review your PRs. Designers help your portfolio. Recruiters watch the demos.",
          buttonText: "Open the launchpad",
          buttonAction: "launchpad",
        },
        {
          step: "3 / 3",
          imageSrc: new URL(
            "../../assets/images/Learn the messy.png",
            import.meta.url,
          ).href,
          imageAlt: "Learn the messy stuff",
          title: "Learn the messy stuff school skips",
          description:
            "Git fights, code reviews, deploying on a Friday. Workshops by people who just learned it too.",
          buttonText: "Browse workshops",
          buttonAction: "workshops",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
      this.features.forEach((_, index) => {
        setTimeout(
          () => {
            this.animatedFeatures[index] = true;
          },
          200 + index * 150,
        );
      });
    });

    this.setupIntersectionObserver();
  },
  methods: {
    handleImageError(event, index) {
      const fallbacks = [
        "https://placehold.co/600x400/2563EB/ffffff?text=Find+Your+Crew",
        "https://placehold.co/600x400/00C0E8/ffffff?text=Ship+Like+Pro",
        "https://placehold.co/600x400/8A38F5/ffffff?text=Learn+Messy",
      ];
      event.target.src =
        fallbacks[index] ||
        "https://placehold.co/600x400/cccccc/666666?text=Image";
    },

    handleActionClick(feature) {
      // Emit event for parent components
      this.$emit("action-click", {
        action: feature.buttonAction,
        title: feature.title,
      });
      console.log(`Action clicked: ${feature.buttonAction} - ${feature.title}`);
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
          { threshold: 0.2 },
        );
        observer.observe(this.$el);
      }
    },
  },
};
</script>

<style scoped>
.inside-section-container {
  width: 100%;
  background-color: #ffffff;
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1),
    transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.inside-section-container.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.bg-curved-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.section-content {
  position: relative;
  z-index: 2;
  padding: 3rem 2.5rem;
}

.inside-main-title {
  font-size: 3.2rem;
  margin-bottom: 60px;
  text-align: left;
  position: relative;
  z-index: 2;
  font-weight: 400;
  color: #1a1a1a;
}

.inside-main-title span {
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

.features-column {
  display: flex;
  flex-direction: column;
  gap: 80px;
  position: relative;
  z-index: 2;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 60px;
  width: 100%;
  opacity: 0;
  transform: translateX(-20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.feature-row.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.feature-row:nth-child(even) {
  flex-direction: row-reverse;
}

.feature-row:nth-child(even).animate-in {
  transform: translateX(0);
}

.feature-row:nth-child(even) {
  transform: translateX(20px);
}

.feature-image-block {
  flex: 1;
  position: relative;
  max-width: 50%;
}

.feature-img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  display: block;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-img:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.step-counter {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #1a1a1a;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #1a1a1a;
  box-shadow: 2px 2px 0px #000000;
  backdrop-filter: blur(2px);
}

.feature-row:nth-child(1) .step-counter {
  background-color: #ffdc3a;
}

.feature-row:nth-child(2) .step-counter {
  background-color: #a9ebf4;
}

.feature-row:nth-child(3) .step-counter {
  background-color: #ff932a;
}

.feature-text-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-title {
  font-size: 2.5rem;
  color: #1a1a1a;
  max-width: 480px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
}

.feature-desc {
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.6;
  max-width: 450px;
  margin: 0;
}

.inside-action-btn {
  width: max-content;
  background-color: transparent;
  color: #4e61f6;
  border: 1px solid #4e61f6;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.25s,
    color 0.25s,
    transform 0.25s;
}

.inside-action-btn:hover {
  background-color: #4e61f6;
  color: #ffffff;
  transform: translateX(4px);
}

.inside-action-btn:active {
  transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 968px) {
  .section-content {
    padding: 2rem 1.5rem;
  }

  .inside-main-title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .features-column {
    gap: 50px;
  }

  .feature-row,
  .feature-row:nth-child(even) {
    flex-direction: column;
    gap: 30px;
  }

  .feature-image-block {
    max-width: 100%;
    width: 100%;
  }

  .feature-text-block {
    width: 100%;
    text-align: center;
    align-items: center;
  }

  .feature-title {
    font-size: 2rem;
    max-width: 100%;
    text-align: center;
  }

  .feature-desc {
    max-width: 100%;
    text-align: center;
  }

  .inside-action-btn {
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .section-content {
    padding: 1.5rem 1rem;
  }

  .inside-main-title {
    font-size: 2rem;
    margin-bottom: 30px;
    text-align: center;
  }

  .features-column {
    gap: 40px;
  }

  .feature-title {
    font-size: 1.6rem;
  }

  .feature-desc {
    font-size: 0.85rem;
  }

  .step-counter {
    bottom: 12px;
    left: 12px;
    padding: 4px 10px;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .inside-main-title {
    font-size: 1.6rem;
  }

  .feature-title {
    font-size: 1.4rem;
  }

  .inside-action-btn {
    padding: 8px 16px;
    font-size: 0.75rem;
  }
}
</style>
