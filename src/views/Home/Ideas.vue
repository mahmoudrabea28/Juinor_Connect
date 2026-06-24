<template>
  <div 
    class="movement-section-container reveal right" 
    :class="{ 'reveal-right': isVisible }"
  >
    <div class="section-content">
      <h2 class="movement-title">
        A movement, measured in 
        <span>Ideas & Impact</span>
      </h2>

      <div class="badges-wrapper">
        <button 
          v-for="stat in stats" 
          :key="stat.label"
          class="stat-badge-btn" 
          :class="stat.badgeClass"
          @click="handleBadgeClick(stat)"
        >
          {{ stat.number }} <span>{{ stat.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovementSection',
  data() {
    return {
      isVisible: false,
      stats: [
        { number: '25K', label: 'Builders', badgeClass: 'badge-cyan' },
        { number: '8K', label: 'Projects', badgeClass: 'badge-yellow' },
        { number: '300', label: 'Hackathons', badgeClass: 'badge-purple' },
        { number: '95', label: 'Universities', badgeClass: 'badge-orange' },
        { number: '15', label: 'Countries', badgeClass: 'badge-white' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
    });
  },
  methods: {
    handleBadgeClick(stat) {
      this.$emit('badge-clicked', stat);
      console.log(`Clicked: ${stat.number} ${stat.label}`);
      const btn = event?.target?.closest?.('.stat-badge-btn');
      if (btn) {
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      }
    }
  }
}
</script>

<style scoped>
.movement-section-container {
  width: 100%;
  background-image: url('../../assets/images/movement bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #eaf5ff;
  text-align: center;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), 
              transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.movement-section-container.reveal-right {
  opacity: 1;
  transform: translateX(0);
}

.section-content {
  padding: 3rem 2rem;
}

.movement-title {
  font-size: 3.5rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.1;
  margin-bottom: 40px;
}

.movement-title span {
  display: block;
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

.badges-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.stat-badge-btn {
  background-color: #ffffff;
  border: 1px solid #1a1a1a;
  border-radius: 50px;
  padding: 12px 28px;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a1a1a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 3px 3px 0px #000000;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.25s ease;
}

.stat-badge-btn span {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  opacity: 0.8;
  text-transform: uppercase;
}
.badge-cyan { 
  background-color: #A9EBF4; 
}

.badge-yellow { 
  background-color: #FFDC3A; 
}

.badge-purple { 
  background-color: #E3D7FB; 
}

.badge-orange { 
  background-color: #FF932A; 
}

.badge-white { 
  background-color: #ffffff; 
}

.stat-badge-btn:hover {
  transform: translateY(-4px);
  box-shadow: 5px 5px 0px #000000;
}

.stat-badge-btn:active {
  transform: translateY(1px);
  box-shadow: 2px 2px 0px #000000;
  transition: all 0.05s ease;
}

/* Responsive styles */
@media (max-width: 860px) {
  .section-content {
    padding: 2rem 1.5rem;
  }
  
  .movement-title {
    font-size: 2.5rem;
  }
  
  .stat-badge-btn {
    padding: 8px 20px;
    font-size: 1.2rem;
  }
  
  .stat-badge-btn span {
    font-size: 0.65rem;
  }
  
  .badges-wrapper {
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .movement-title {
    font-size: 2rem;
  }
  
  .stat-badge-btn {
    padding: 6px 16px;
    font-size: 1rem;
  }
  
  .badges-wrapper {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .section-content {
    padding: 1.5rem 1rem;
  }
  
  .movement-title {
    font-size: 1.75rem;
    margin-bottom: 24px;
  }
  
  .stat-badge-btn {
    padding: 5px 14px;
    font-size: 0.9rem;
    gap: 5px;
  }
  
  .stat-badge-btn span {
    font-size: 0.6rem;
  }
}
</style>