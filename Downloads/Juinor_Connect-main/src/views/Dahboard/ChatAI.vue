<template>
     <DashboardLayout>
  <div class="fullscreen-chat-container">
    <div class="chat-container">
      
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="ai-avatar-box">
            <img src="../../assets/images/Icon.png" width="22px" height="22px" alt="AI Icon">
          </div>
          <div class="ai-status">
            <h3>Junior AI</h3>
            <p>Online · Context-aware</p>
          </div>
        </div>
       <div class="chat-header-actions">
  <router-link to="/AI_Mentor">
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
          <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
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

        <div class="message-wrapper ai">
          <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
          <div class="message">
            This silently refreshes 60s before expiry. No user interruption. 🚀
          </div>
        </div>

      </div>

      <div class="chat-input-area">
        <div class="input-wrapper">
          <span class="material-symbols-outlined icon-emoji" style="margin-right: 10px;">sentiment_satisfied</span>
          <input type="text" placeholder="Type your message...">
          <span class="material-symbols-outlined icon-attach">attach_file</span>
        </div>
        <button class="btn-send-box">
          <span class="material-symbols-outlined icon-send">send</span>
        </button>
      </div>

    </div>
  </div>
     </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 

export default {
  name: 'FullscreenAiMentor',
  components: {
    DashboardLayout
  },
}
</script>

<style scoped>
.fullscreen-chat-container {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.chat-container {
  border: 1px solid rgba(26, 27, 35, 0.05);
  border-radius: 16px;
  background: #E7F5FF;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.chat-header {
  padding: 18px 24px;
  border-bottom: 1px solid rgba(26, 27, 35, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #E7F5FF;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-avatar-box {
  width: 38px;
  height: 38px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.ai-status h3 {
  font-size: 16px;
  font-weight: 600;
  color: #4E61F6;
}

.ai-status p {
  font-size: 12px;
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
  gap: 16px;
}

.chat-header-actions a {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.chat-header-actions .icon {
  color:#4E61F6;
  cursor: pointer;
  font-size: 22px;
  transition: transform 0.2s ease;
}

.chat-header-actions .icon:hover {
  transform: scale(1.1);
}

/* --- Chat Messages Area --- */
.chat-messages {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background-color: #E7F5FF;
  overflow-y: auto;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 75%;
}

.message-wrapper.ai {
  align-self: flex-start;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chat-msg-avatar {
  width: 32px;
  height: 32px;
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
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.message-wrapper.ai .message {
  background-color: #0095FF;;
  color: white;
  border-top-left-radius: 2px;
}

.message-wrapper.user .message {
  background-color: #ffffff;
  color: #4E61F6;
  border-top-right-radius: 2px;
}

.chat-code-block {
  background-color: #E2E8F0;
  color: #131927;
  padding: 16px;
  border-radius: 12px;
  font-size: 13px;
  margin-top: 10px;
  white-space: pre-wrap;
  border: 1px solid rgba(0,0,0,0.05);
}

/* --- Input Area --- */
.chat-input-area {
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 16px;
  background-color:#E7F5FF;
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #E7F5FF;
  border: 1px solid #4E61F6;
  border-radius: 14px;
  padding: 0 16px;
}

.input-wrapper input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 14px 0;
  outline: none;
  font-size: 14px;
  color: #131927;
}

.input-wrapper .icon-emoji, 
.input-wrapper .icon-attach {
  color: #4E61F6;
  cursor: pointer;
  font-size: 22px;
}

.input-wrapper .icon-attach {
  transform: rotate(45deg);
}

.input-wrapper input::placeholder {
  color: #64748b;
}

.btn-send-box {
  background-color: #4E61F6;
  border: none;
  border-radius: 14px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-send-box .icon-send {
  color: white;
  font-size: 22px;
  transform: rotate(-25deg);
}

.btn-send-box:hover {
  background-color: #3b4ed1;
  transform: scale(1.02);
}
</style>