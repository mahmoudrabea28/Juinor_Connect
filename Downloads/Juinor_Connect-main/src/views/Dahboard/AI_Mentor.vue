<template>
  <DashboardLayout>
    <div class="mentor-page-wrapper">
      <div class="content-container">
        
        <div class="page-banner">
          <span>AI MENTOR</span>
          <h1>Your Personal Guide to Success</h1>
          <p>Powered by contextual AI — knows your projects and goals.</p>
        </div>

        <div class="mentor-grid">
          
          <div class="left-column">
            
            <div class="mentor-card">
              <div class="card-header-title">
                <img src="../../assets/images/magic-wand2.png" alt="magic wand">
                <h2>Top Suggestions</h2>
              </div>
              <div class="suggestion-list">
                <div class="suggestion-item">
                  <div class="suggestion-content">
                    <span class="material-symbols-outlined icon">bolt</span>
                    <p>Optimize authentication flow in A.I. Mentor Platform</p>
                  </div>
                  <span class="badge high">High</span>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-content">
                    <span class="material-symbols-outlined icon">code</span>
                    <p>Implement lazy loading for Portfolio Builder routes</p>
                  </div>
                  <span class="badge medium">Medium</span>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-content">
                    <span class="material-symbols-outlined icon">draw</span>
                    <p>Add unit tests for the user service module</p>
                  </div>
                  <span class="badge medium">Medium</span>
                </div>
              </div>
            </div>

            <div class="mentor-card">
              <div class="card-header-title">
                <img src="../../assets/images/magic-wand2.png" alt="magic wand">
                <h2>Top Suggestions</h2>
              </div>
              <div class="progress-list">
                <div class="progress-item-container">
                  <div class="progress-info">
                    <span>Master Python for Backend</span>
                    <span>60%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: 60%;"></div>
                  </div>
                </div>
                <div class="progress-item-container">
                  <div class="progress-info">
                    <span>Advanced React Patterns</span>
                    <span>78%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: 78%; background-color: #4E61F6;"></div>
                  </div>
                </div>
                <div class="progress-item-container">
                  <div class="progress-info">
                    <span>System Design Fundamentals</span>
                    <span>43%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: 43%; background-color: #FF932A;"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="chat-container">
            <div class="chat-header">
              <div class="chat-header-left">
                <div class="ai-header-avatar">
                  <img src="../../assets/images/Icon.png" width="20px" height="20px" alt="AI Icon">
                </div>
                <div class="ai-status">
                  <h3>Junior AI</h3>
                  <p>Online · Context-aware</p>
                </div>
              </div>
              <div class="chat-header-actions">
  <router-link to="/chatAI">
    <span class="material-symbols-outlined icon">open_in_full</span>
  </router-link>
  <span class="material-symbols-outlined icon">sync</span>
</div>
            </div>
            
            <div class="chat-messages">
              <div class="message-wrapper ai">
                <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
                <div class="message">
                  Hey Ahmed! 👋 I've reviewed your A.I. Mentor Platform project. I noticed a potential bottleneck in your JWT refresh flow — want me to walk you through an optimized solution?
                </div>
              </div>
              
              <div class="message-wrapper user">
                <img src="../../assets/images/Avatar.png" alt="User" class="chat-msg-avatar user-img">
                <div class="message">
                  Yes! I've been stuck on that for a while. The token expiry issue keeps logging users out mid-session.
                </div>
              </div>
              
              <div class="message-wrapper ai">
                <img src="../../assets//images/Icon.png" alt="AI" class="chat-msg-avatar">
                <div class="message">
                  Classic silent expiry problem. The fix is a silent refresh pattern: before each request, check if the token expires within &lt;60s. If so, call your /auth/refresh endpoint transparently. Pair it with an Axios interceptor so every component stays clean. Want me to generate the interceptor code?
                </div>
              </div>
              
              <div class="message-wrapper user">
                <img src="../../assets/images/Avatar.png" alt="User" class="chat-msg-avatar user-img">
                <div class="message">
                  That would be amazing, please!
                </div>
              </div>
              
              <div class="message-wrapper ai">
                <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
                <div class="message">
                  Here is a production-ready Axios interceptor with token refresh:
                  <div class="chat-code-block">axios.interceptors.request.use(async (config) => {
  const exp = getTokenExpiry();
  if (exp - Date.now() &lt; 60000) {
    await refreshToken();
  }
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});</div>
                </div>
              </div>
            </div>

            <div class="chat-input-area">
              <div class="input-wrapper">
                <span class="material-symbols-outlined icon-emoji">sentiment_satisfied</span>
                <input type="text" placeholder="Type your message...">
                <span class="material-symbols-outlined icon-attach">attach_file</span>
              </div>
              <button class="btn-send-box">
                <span class="material-symbols-outlined icon-send">send</span>
              </button>
            </div>
          </div>

        </div>

        <div class="mentor-card">
          <div class="card-header-title">
            <span class="material-symbols-outlined" style="color: #4E61F6;">code</span>
            <h2>Code Review Queue</h2>
          </div>
          <div class="queue-list">
            <div class="queue-item">
              <div class="queue-left">
                <div class="status-indicator pending"></div>
                <div class="queue-meta">
                  <h3>Auth Flow PR #42</h3>
                  <p>A.I. Mentor Platform</p>
                </div>
              </div>
              <span class="badge-status pending">pending</span>
            </div>
            <div class="queue-item">
              <div class="queue-left">
                <div class="status-indicator approved"></div>
                <div class="queue-meta">
                  <h3>Component Refactor PR #38</h3>
                  <p>Portfolio App</p>
                </div>
              </div>
              <span class="badge-status approved">approved</span>
            </div>
            <div class="queue-item">
              <div class="queue-left">
                <div class="status-indicator pending"></div>
                <div class="queue-meta">
                  <h3>API Schema PR #55</h3>
                  <p>A.I. Mentor Platform</p>
                </div>
              </div>
              <span class="badge-status pending">pending</span>
            </div>
          </div>
        </div>

        <div>
          <div class="card-header-title">
            <span class="material-symbols-outlined icon" style="color:#4E61F6;">collections_bookmark</span>
            <h2>AI Skill Recommendations</h2>
          </div>
          <div class="recommendations-grid">
            <div class="rec-card blue">
              <div class="rec-icon-box"><span class="material-symbols-outlined">language</span></div>
              <div class="rec-details">
                <h3>PWA Mastery</h3>
                <p>Frontend Masters</p>
                <span class="badge-rec blue">Recommended</span>
              </div>
            </div>
            <div class="rec-card yellow">
              <div class="rec-icon-box"><span class="material-symbols-outlined" style="color: #FFAA00;">code</span></div>
              <div class="rec-details">
                <h3>Python Backend APIs</h3>
                <p>Real Python</p>
                <span class="badge-rec yellow">Trending</span>
              </div>
            </div>
            <div class="rec-card purple">
              <div class="rec-icon-box"><span class="material-symbols-outlined">layers</span></div>
              <div class="rec-details">
                <h3>React Architecture</h3>
                <p>Egghead.io</p>
                <span class="badge-rec purple">For You</span>
              </div>
            </div>
            <div class="rec-card gray">
              <div class="rec-icon-box"><span class="material-symbols-outlined">menu_book</span></div>
              <div class="rec-details">
                <h3>System Design 101</h3>
                <p>Byte-By-Byte</p>
                <span class="badge-rec blue">Popular</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 

export default {
  name: 'AiMentor',
  components: {
    DashboardLayout
  },
}
</script>

<style scoped>
.mentor-page-wrapper {
  --primary-color: #4E61F6;
  --primary-hover: #3b4ed1;
  --bg-main: #f8fafc;
  --text-main: #131927;
  --text-muted: #64748b;
  --border-color: rgba(26, 27, 35, 0.05);
  
  --bg-card-light: #F2F3FF;
  --tag-high-bg: #FFEBEB;
  --tag-high-text: #FF4D4D;
  --tag-medium-bg: #FFF3D1;
  --tag-medium-text: #FFAA00;
  --chat-user-bg: #E1E6FF;
  --chat-ai-bg: #007BFF;
  
  --rec-blue: #E7F5FF;
  --rec-yellow: #FFFAE5;
  --rec-purple: #F4F0FE;
  --rec-gray: #EAEDF6;

  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-main);
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
}

.content-container {
  padding: 32px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Top Banner */
.page-banner {
  background-color: #ffffff;
  background-image: url(../../assets/images/Hero\ section.png);
  background-repeat: no-repeat;
  background-size: 85%;
  background-position: center right;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.page-banner::before {
  content: '';
  position: absolute;
  top: -30px;
  left: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(37, 99, 235, 0.25);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}
.page-banner::after {
  content: '';
  position: absolute;
  bottom: -50px;
  right: -30px;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 170, 0, 0.3);
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.page-banner span {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #131927;
  font-weight: 600;
}

.page-banner h1 {
  font-size: 24px;
  color: #131927;
  margin: 8px 0;
  font-weight: 700;
}

.page-banner p {
  color: #131927;
  font-size: 14px;
}

/* Mentor Grid Layout */
.mentor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .mentor-grid {
    grid-template-columns: 1fr;
  }
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Mentor Card Styles */
.mentor-card {
  background: #E7F5FF;
  border: 1px solid rgba(26, 27, 35, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.01);
}

.card-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.card-header-title .icon {
  color: #4E61F6 !important;
  font-size: 22px;
}

.card-header-title h2 {
  font-size: 18px;
  font-weight: 600;
  color: #131927;
}

/* Suggestions List */
.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px 20px;
}

.suggestion-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.suggestion-content .icon {
  color: #4E61F6;
  font-size: 20px;
}

.suggestion-content p {
  font-size: 14px;
  font-weight: 500;
  color: #131927;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.high {
  background-color: var(--tag-high-bg);
  color: var(--tag-high-text);
  border: 1px solid var(--tag-high-text);
}

.badge.medium {
  background-color: var(--tag-medium-bg);
  color: var(--tag-medium-text);
  border: 1px solid var(--tag-medium-text);
}

/* Skill Progress Bars */
.progress-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.progress-item-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}

.progress-bar-bg {
  height: 8px;
  background-color: #EDEFFE;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color:#0095FF;
  border-radius: 4px;
}

/* Chat Interface Styles */
.chat-container {
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: #E7F5FF;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-header-avatar {
  width: 36px;
  height: 36px;
  background-color:#fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.ai-status h3 {
  font-size: 15px;
  font-weight: 600;
  color: #4E61F6;
}

.ai-status p {
  font-size: 11px;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 4px;
}

.ai-status p::before {
  content: '';
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
}

.chat-header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.chat-header-actions a {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.chat-header-actions .icon {
  color: var(--primary-color);
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.2s ease;
}

.chat-header-actions .icon:hover {
  transform: scale(1.1);
}

.chat-messages {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #E7F5FF;
  max-height: 410px;
  overflow-y: auto;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 85%;
}

.message-wrapper.ai {
  align-self: flex-start;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chat-msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #fff;
  padding: 4px;
  border: 1px solid rgba(0,0,0,0.05);
}

.chat-msg-avatar.user-img {
  padding: 0;
}

.message {
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.message-wrapper.ai .message {
  background-color: #0095FF;
  color: white;
  border-top-left-radius: 2px;
}

.message-wrapper.user .message {
  background-color: #fff;
  color: #4E61F6;
  border-top-right-radius: 2px;
}

.chat-code-block {
  background-color: #E2E8F0;
  color: #131927;
  font-family: monospace;
  padding: 14px;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 8px;
  white-space: pre-wrap;
}

.chat-input-area {
  padding: 16px;
  border-top: 1px solid #fff;
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 15px;
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #E7F5FF;
  border: 1px solid #4E61F6;
  border-radius: 12px;
  padding: 0 14px;
}

.input-wrapper input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 0;
  outline: none;
  font-size: 14px;
}

.input-wrapper .icon-attach {
  color: #4E61F6;
  cursor: pointer;
  transform: rotate(45deg);
  display: inline-block;
}

.input-wrapper .icon-emoji {
  color: #4E61F6;
  margin-right: 8px;
}

.btn-send-box {
  background-color: var(--primary-color);
  border: none;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn-send-box .icon-send {
  color: white;
  font-size: 20px;
  transform: rotate(-25deg);
  display: inline-block;
}

.btn-send-box:hover {
  background-color: var(--primary-hover);
}

/* Code Review Queue */
.queue-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px 20px;
  background-color: #fff;
}

.queue-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicator {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.status-indicator.pending { background-color: #FFAA00; }
.status-indicator.approved { background-color: #22C55E; }

.queue-meta h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

.queue-meta p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.badge-status {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-status.pending {
  background-color: #FFF3D1;
  color: #FFAA00;
  border: 1px solid #FFAA00;
}

.badge-status.approved {
  background-color: #DCFCE7;
  color: #22C55E;
  border: 1px solid #22C55E;
}

/* Recommendations Grid -*/
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  margin-top: 16px;
}

@media (max-width: 576px) {
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
}

.rec-card {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid rgba(0,0,0,0.01);
}

.rec-card.blue { background-color: var(--rec-blue); }
.rec-card.yellow { background-color: var(--rec-yellow); }
.rec-card.purple { background-color: var(--rec-purple); }
.rec-card.gray { background-color: #E2E8F0; }

.rec-icon-box {
  width: 44px;
  height: 44px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  border: 1px solid rgba(0,0,0,0.05);
}

.rec-details h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
}

.rec-details p {
  font-size: 13px;
  color: var(--text-muted);
  margin: 4px 0 12px 0;
}

.badge-rec {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
}
.badge-rec.blue { background-color: #DDE4FF; color: var(--primary-color); border: 1px solid var(--primary-color); }
.badge-rec.yellow { background-color: rgba(255, 170, 0, 0.2); color: #FFAA00; border: 1px solid #FFAA00; }
.badge-rec.purple { background-color: #ECDFFF; color: #CB30E0; border: 1px solid #CB30E0; }
</style>