<template>
  <div class="wall-section-container reveal">
    <div class="section-content">
      <!-- Header Section -->
      <header class="header-section">
        <h1 class="main-title">
          Posters on the <span class="gradient-text">community wall</span>
        </h1>
        <a href="#" class="all-events-btn">
          All events <span class="all-events-arrow">→</span>
        </a>
      </header>

      <!-- Cards Grid -->
      <main class="cards-grid">
        <div 
          v-for="(event, index) in events" 
          :key="index" 
          :class="['card', event.bgClass]"
        >
          <!-- Tape Image -->
          <img 
            src="../../assets/images/ScotchTape-04.png" 
            alt="tape" 
            class="tape-img"
          >
          
          <!-- Card Header -->
          <div class="card-header">
            <span class="category">{{ event.category }}</span>
            <span class="star-header">★</span>
          </div>
          
          <!-- Card Title -->
          <h2 class="card-title">{{ event.title }}</h2>
          
          <!-- Card Footer -->
          <div class="card-footer">
            <div class="date">{{ event.date }}</div>
            <div class="location">{{ event.location }}</div>
            <button class="action-btn" @click="handleCountMeIn(event)">
              Count Me In <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data array to manage the cards dynamically
const events = ref([
  {
    category: 'FLAGSHIP',
    title: 'AI Hackathon 06',
    date: 'Mar 22–24',
    location: 'Remote · 48h',
    bgClass: 'card-blue'
  },
  {
    category: 'COMMUNITY',
    title: 'Climate Build',
    date: 'Apr 12',
    location: 'Berlin',
    bgClass: 'card-yellow'
  },
  {
    category: 'WORKSHOP',
    title: 'First-PR Friday',
    date: 'Every Friday',
    location: 'Discord Stage',
    bgClass: 'card-purple'
  },
  {
    category: 'SHOWCASE',
    title: 'Demo Day · Vol. 12',
    date: 'May 03',
    location: 'Hybrid · Cairo',
    bgClass: 'card-orange'
  }
])

// Interactive handler for the button click (example logic)
const handleCountMeIn = (event) => {
  console.log(`Registered for event: ${event.title}`)
}
</script>

<style scoped>
/* Scoped to prevent styles from clashing with the rest of the project */

.section-content {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 80px 20px;
}

.serif-title {
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.1;
}

.wall-section-container {
  width: 100%;
  background-image: url('../../assets/images/Home2 (1).png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fafafa;
}

.header-section {
  display: flex;
  justify-content: space-between;
 align-items: center;
  margin-bottom: 45px;
  padding-right: 10px;
}

.main-title {
  font-size: 3.2rem;
  font-weight: 400;
  color: #1a1a1a;
  letter-spacing: -0.5px;
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
}

.all-events-btn {
  color: #4E61F6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #4E61F6;
  padding-bottom: 1px;
  transition: opacity 0.2s;
}

.all-events-btn:hover { 
  opacity: 0.8; 
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  border-radius: 12px;
  border: 1px solid #1a1a1a;
  padding: 24px 20px 20px 20px;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  will-change: transform;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.tape-img {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 115px;
  height: auto;
  object-fit: contain;
  z-index: 10;
  pointer-events: none;
}

/* Dynamic background classes */
.card-blue { background-color: #2563EB; color: #1a1a1a; }
.card-yellow { background-color: #FFDC3A; color: #1a1a1a; }
.card-purple { background-color: #E3D7FB; color: #1a1a1a; }
.card-orange { background-color: #FF932A; color: #1a1a1a; }

.card-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.category { 
  font-size: 0.7rem; 
  font-weight: 700; 
  letter-spacing: 0.5px; 
  opacity: 0.8; 
}

.star-header { 
  font-size: 0.85rem; 
  opacity: 0.8; 
}

.card-title {
  font-size: 2.3rem;
  font-weight: 400;
  line-height: 1.05;
  margin-top: 15px;
  margin-bottom: auto;
}

.card-footer { 
  margin-top: 40px; 
}

.date { 
  font-size: 0.95rem; 
  font-weight: 600; 
  margin-bottom: 2px; 
}

.location { 
  font-size: 0.72rem; 
  opacity: 0.6; 
  margin-bottom: 12px; 
}

.action-btn {
  width: max-content;
  background: transparent;
  border: 1px solid currentColor;
  color: inherit;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.all-events-arrow { 
  font-size: 0.85rem; 
}

.action-btn:hover { 
  background-color: rgba(0, 0, 0, 0.05); 
}

.card-blue .action-btn:hover { 
  background-color: rgba(255, 255, 255, 0.12); 
}
</style>