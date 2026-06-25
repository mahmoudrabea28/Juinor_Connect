<template>
  <footer class="main-footer reveal" :class="{ 'reveal-visible': isVisible }">
    <div class="footer-container">
      <div class="footer-col footer-brand">
        <div class="logo-wrapper">
          <img 
            src="../assets/images/Logo.png"
            alt="Junior Connect Logo" 
            class="footer-logo"
            @error="handleLogoError"
          />
        </div>
        <p class="brand-text">
          Digital playground for ambitious students. Built by juniors, for juniors.
        </p>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">Build</h3>
        <ul class="footer-links">
          <li v-for="link in buildLinks" :key="link.text">
            <a href="#" @click.prevent="handleLinkClick(link)">{{ link.text }}</a>
                    </li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">Learn</h3>
        <ul class="footer-links">
          <li v-for="link in learnLinks" :key="link.text">
            <a href="#" @click.prevent="handleLinkClick(link)">{{ link.text }}</a>
                    </li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">Help center</h3>
        <ul class="footer-links">
          <li v-for="link in helpLinks" :key="link.text">
            <a href="#" @click.prevent="handleLinkClick(link)">{{ link.text }}</a>
                    </li>
        </ul>
      </div>

      <div class="footer-col footer-illustration">
        <img 
          src="../assets/images/footer bg.png"
          alt="Junior Connect Characters" 
          class="characters-img"
          @error="handleIllustrationError"
        />
      </div>
    </div>

    <div class="footer-copyright">
      &copy; Copyright Junior Connect 2026. All rights reserved
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      isVisible: false,
      logoImage: '../assets/images/Logo.png',
      illustrationImage: '../assets/images/fotter img.png',
      buildLinks: [
        { text: 'Projects', route: '/projects' },
        { text: 'Open source', route: '/open-source' },
        { text: 'Teammate finder', route: '/teammate-finder' }
      ],
      learnLinks: [
        { text: 'Workshops', route: '/workshops' },
        { text: 'Mentors', route: '/mentors' },
        { text: 'Study circles', route: '/study-circles' },
        { text: 'Newsletter', route: '/newsletter' }
      ],
      helpLinks: [
        { text: 'FAQ', route: '/faq' },
        { text: 'Guides', route: '/guides' },
        { text: 'Support', route: '/support' },
        { text: 'Feedback', route: '/feedback' },
        { text: 'Terms & Policies', route: '/terms' }
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
    handleLogoError(event) {
      event.target.src = 'https://placehold.co/200x50/2563EB/ffffff?text=Junior+Connect';
    },
    
    handleIllustrationError(event) {
      event.target.src = 'https://placehold.co/300x250/f3f4f6/9ca3af?text=Illustration';
    },
    
    handleLinkClick(link) {
      this.$emit('link-click', link);
      console.log(`Footer link clicked: ${link.text} -> ${link.route}`);
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
.main-footer {
  position: relative;
  width: 100%;
  padding: 40px 40px 15px 40px; 
  box-sizing: border-box;
  background-image: url('../assets/images/footer\ bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fdfbf7;
  border-top: 1px solid #e5e7eb;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1),
              transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.main-footer.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Container Grid/Flex Layout */
.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px; 
}

/* Columns Base Styling */
.footer-col {
  flex: 1;
  min-width: 140px;
}

.footer-col.footer-brand {
  flex: 2;
  min-width: 280px;
}

.logo-wrapper {
  margin-bottom: 12px; 
}

.footer-logo {
  height: 60px; 
  object-fit: contain;
}

.brand-text {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.5;
  max-width: 280px;
  margin: 0;
}

/* Navigation Headings */
.footer-heading {
  font-size: 1.3rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 15px 0; 
}

/* Navigation Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px; 
}

.footer-links a {
  font-size: 0.95rem;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #2563eb;
  transform: translateX(4px);
}

.footer-col.footer-illustration {
  flex: 2;
  min-width: 220px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.characters-img {
  max-width: 100%;
  height: auto;
  max-height: 260px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.characters-img:hover {
  transform: scale(1.02);
}

.footer-copyright {
  width: 100%;
  text-align: center;
  font-size: 0.85rem;
  color: #9ca3af;
  margin-top: 30px; 
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

/* --- Responsive Media Queries --- */
@media (max-width: 1024px) {
  .footer-col.footer-illustration {
    justify-content: center;
    width: 100%;
    flex: none;
    margin-top: 15px;
  }
  
  .footer-container {
    gap: 30px 20px;
  }
}

@media (max-width: 768px) {
  .main-footer {
    padding: 30px 20px 15px 20px;
  }

  .footer-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 20px;
  }

  .footer-col.footer-brand {
    grid-column: span 2;
  }

  .footer-col.footer-illustration {
    grid-column: span 2;
    justify-content: center;
  }
  
  .footer-heading {
    font-size: 1.15rem;
    margin-bottom: 12px;
  }
  
  .footer-links li {
    margin-bottom: 8px;
  }
  
  .footer-links a {
    font-size: 0.85rem;
  }
  
  .brand-text {
    font-size: 0.85rem;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .main-footer {
    padding: 25px 16px 15px 16px;
  }
  
  .footer-container {
    gap: 25px 16px;
  }
  
  .footer-heading {
    font-size: 1.1rem;
  }
  
  .footer-copyright {
    font-size: 0.75rem;
    margin-top: 20px;
    padding-top: 12px;
  }
  
  .characters-img {
    max-height: 150px;
  }
}
</style>