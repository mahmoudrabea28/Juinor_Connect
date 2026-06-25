<template>
  <Navbar/>
    <LoadingScreen :visible="pageLoading" />
    <div class="mentor-page-wrapper" v-show="!pageLoading">
      <div class="content-container">
        
        <div class="page-banner">
          <span>AI MENTOR</span>
          <h1>Your Personal Guide to Success</h1>
          <p>Powered by contextual AI — knows your projects and goals.</p>
        </div>

        <div class="mentor-grid">
          
          <div class="left-column">
            
            <!-- Project Selector + Tasks -->
            <div class="mentor-card">
              <div class="card-header-title">
                <span class="material-symbols-outlined" style="color: #4E61F6;">folder_open</span>
                <h2>Your Projects</h2>
              </div>
              <select v-model="selectedProjectId" @change="onProjectChange" class="project-select">
                <option value="">-- Choose a project --</option>
                <option v-for="p in projects" :key="p._id" :value="p._id">{{ p.title }}</option>
              </select>
              <button v-if="selectedProjectId && !tasks.length" @click="generateProjectTasks" :disabled="loadingTasks" class="btn-generate">
                <span class="material-symbols-outlined">bolt</span>
                {{ loadingTasks ? 'Generating...' : 'Generate Tasks' }}
              </button>
              
              <!-- Task list -->
              <div v-if="tasks.length" class="task-list">
                <div 
                  v-for="(task, idx) in tasks" :key="task._id"
                  class="task-item" 
                  :class="{ active: selectedTaskId === task._id }"
                  @click="selectTask(idx)"
                >
                  <div class="task-header">
                    <span class="task-status-icon">{{ getTaskStatus(task) }}</span>
                    <span class="task-title">{{ task.title }}</span>
                    <span class="badge" :class="task.difficulty">{{ task.difficulty }}</span>
                  </div>
                  <p class="task-desc" :class="{ 'task-desc-collapsed': !task._descExpanded }" @click.stop>
                    {{ task._descExpanded ? task.description : (task.description || '').slice(0, 80) }}{{ !task._descExpanded && task.description?.length > 80 ? '...' : '' }}
                  </p>
                  <button v-if="task.description?.length > 80" class="btn-task-expand" @click.stop="toggleTaskDesc(task)">
                    <span class="material-symbols-outlined" style="font-size:16px">{{ task._descExpanded ? 'expand_less' : 'expand_more' }}</span>
                    {{ task._descExpanded ? 'Less' : 'More' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Top Suggestions (Skills Progress) -->
            <div class="mentor-card">
              <div class="card-header-title">
                <img src="../../assets/images/magic-wand2.png" alt="magic wand">
                <h2>Top Suggestions</h2>
              </div>
              <div v-if="loadingSuggestions" class="loading-text">Loading suggestions...</div>
              <div v-else-if="suggestions.length" class="progress-list">
                <div v-for="(s, i) in suggestions" :key="s.skill" class="progress-item-container">
                  <div class="progress-info">
                    <span>{{ s.skill }}</span>
                    <span>{{ s.progress }}%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: s.progress + '%', backgroundColor: progressColors[i % progressColors.length] }"></div>
                  </div>
                </div>
              </div>
              <div v-else class="loading-text">Complete your profile to see suggestions.</div>
            </div>
          </div>

          <!-- Chat -->
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
                <span class="material-symbols-outlined icon" @click="clearChatHistory" title="Clear chat history">restart_alt</span>
              </div>
            </div>
            
            <div class="chat-messages" ref="chatMessages">
              <!-- Empty state -->
              <div v-if="!selectedTaskId && !chatMessages.length" class="chat-empty">
                <p>Select a project & task to start chatting with AI</p>
              </div>

              <!-- Messages -->
              <div v-for="msg in chatMessages" :key="msg._id || msg.timestamp" class="message-wrapper" :class="msg.role === 'user' ? 'user' : 'ai'">
                <img v-if="msg.role === 'ai'" src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
                <img v-else src="../../assets/images/Avatar.png" alt="User" class="chat-msg-avatar user-img">
              <div class="message">
                  <!-- Image attachment -->
                  <img v-if="msg.attachment && msg.attachment.type === 'image' && msg.attachment.url" 
                    :src="msg.attachment.url" class="chat-img-preview" alt="attachment">
                  <!-- File attachment -->
                  <a v-if="msg.attachment && msg.attachment.type === 'file' && msg.attachment.url" 
                    :href="msg.attachment.url" target="_blank" class="chat-file-link">
                    📄 {{ msg.attachment.filename || 'file' }}
                  </a>
                  <!-- Text: collapsible if long -->
                  <div v-if="isLongMessage(msg.content)" class="collapsible-msg">
                    <div class="msg-text" :class="{ collapsed: !msg._expanded }" v-html="formatMessage(msg.content)"></div>
                    <button class="btn-expand" @click="toggleExpand(msg)">
                      <span class="material-symbols-outlined">{{ msg._expanded ? 'expand_less' : 'expand_more' }}</span>
                      {{ msg._expanded ? 'Show less' : 'Show more' }}
                    </button>
                  </div>
                  <span v-else v-html="formatMessage(msg.content)"></span>
                </div>
              </div>

              <!-- Typing indicator -->
              <div v-if="typing" class="message-wrapper ai">
                <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
                <div class="message"><span class="typing-dots"><span></span><span></span><span></span></span></div>
              </div>
            </div>

            <!-- Input -->
            <div class="chat-input-area">
              <!-- Image/File preview -->
              <div v-if="pendingImage" class="attachment-preview">
                <img :src="pendingImage.dataUrl" class="preview-thumb">
                <button @click="clearImage" class="btn-clear-attach">✕</button>
              </div>
              <div v-if="pendingFile" class="attachment-preview file-preview">
                <span>📄 {{ pendingFile.fileName }}</span>
                <button @click="clearFile" class="btn-clear-attach">✕</button>
              </div>

              <div class="input-wrapper">
                <span class="material-symbols-outlined icon-emoji">sentiment_satisfied</span>
                <input 
                  type="text" 
                  v-model="chatInput" 
                  placeholder="Type your message..." 
                  @keydown.enter="sendMessage"
                  :disabled="!selectedTaskId"
                >
                <input type="file" ref="imageInput" accept="image/*" style="display:none" @change="onImageSelected">
                <input type="file" ref="fileInput" accept=".js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.html,.css,.json,.txt,.md" style="display:none" @change="onFileSelected">
                <span class="material-symbols-outlined icon-attach" @click="$refs.fileInput.click()" title="Attach code file">description</span>
                <span class="material-symbols-outlined icon-attach" @click="$refs.imageInput.click()" title="Attach image">photo_camera</span>
              </div>
              <button class="btn-send-box" @click="sendMessage" :disabled="!selectedTaskId">
                <span class="material-symbols-outlined icon-send">send</span>
              </button>
            </div>

            <!-- Submit for review -->
            <div v-if="selectedTaskId" class="submit-bar">
              <button @click="submitForReview" :disabled="!chatInput.trim() || submitting" class="btn-submit-review">
                🚀 {{ submitting ? 'Reviewing...' : 'Submit Code for Review' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Code Review Queue -->
        <div class="mentor-card">
          <div class="card-header-title">
            <span class="material-symbols-outlined" style="color: #4E61F6;">code</span>
            <h2>Code Review Queue</h2>
          </div>
          <div class="queue-list">
            <div v-if="!submissions.length" class="loading-text">Submit code to see reviews here.</div>
            <div v-for="(sub, i) in submissions" :key="sub._id" class="queue-item">
              <div class="queue-left">
                <div class="status-indicator" :class="sub.review?.status || 'pending'"></div>
                <div class="queue-meta">
                  <h3>Submission #{{ i + 1 }}</h3>
                  <p>{{ selectedTaskTitle || 'Task' }}</p>
                </div>
              </div>
              <span class="badge-status" :class="sub.review?.status || 'pending'">
                {{ sub.review?.status || 'pending' }} {{ sub.review?.score ? '(' + sub.review.score + '/100)' : '' }}
              </span>
            </div>
          </div>
        </div>

        <!-- AI Skill Recommendations -->
        <div>
          <div class="card-header-title">
            <span class="material-symbols-outlined icon" style="color:#4E61F6;">collections_bookmark</span>
            <h2>AI Skill Recommendations</h2>
          </div>
          <div v-if="loadingRecs" class="loading-text">Loading recommendations...</div>
          <div v-else class="recommendations-grid">
            <div v-for="(rec, i) in recommendations" :key="i" class="rec-card" :class="recCardColors[i % recCardColors.length]">
              <div class="rec-icon-box">
                <span class="material-symbols-outlined" :style="{ color: recIconColors[i % recIconColors.length] }">{{ recIcons[i % recIcons.length] }}</span>
              </div>
              <div class="rec-details">
                <h3>{{ rec.title }}</h3>
                <p>{{ rec.provider }}</p>
                <span class="badge-rec" :class="recTagColors[rec.tag] || 'blue'">{{ rec.tag }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <ClearChatModal
      v-if="showClearChatModal"
      :loading="clearingChat"
      @confirm="confirmClearChat"
      @cancel="cancelClearChat"
    />
</template>

<script>
import Navbar from '../../components/Navbar.vue'; 
import LoadingScreen from '../../components/LoadingScreen.vue';
import ClearChatModal from '../../components/profile/ClearChatModal.vue';
import { mentorStore } from '../../state/mentorStore.js';
import { 
  getMyProjects, generateTasks, getProjectTasks, 
  getTaskChat, sendTaskChatMessage, getTaskWelcome, deleteTaskChat,
  submitTaskCode, getTaskSubmissions,
  getTopSuggestions, getRecommendations 
} from '../../services/api.js';

export default {
  name: 'AiMentor',
  components: { Navbar, LoadingScreen, ClearChatModal },
  data() {
    return {
      // Projects & Tasks — synced with mentorStore
      projects: [],
      loadingTasks: false,
      pageLoading: true,

      // Chat
      chatInput: '',
      typing: false,
      pendingImage: null,
      pendingFile: null,
      showClearChatModal: false,
      clearingChat: false,

      // Submissions
      submissions: [],
      submitting: false,

      // Suggestions
      suggestions: [],
      loadingSuggestions: false,
      progressColors: ['#0095FF', '#4E61F6', '#FF932A', '#22C55E', '#EC4899'],

      // Recommendations
      recommendations: [],
      loadingRecs: false,
      recCardColors: ['blue', 'yellow', 'purple', 'gray'],
      recIconColors: ['#4E61F6', '#FFAA00', '#7C3AED', '#4E61F6'],
      recIcons: ['language', 'code', 'layers', 'menu_book'],
      recTagColors: { 'Recommended': 'blue', 'Trending': 'yellow', 'For You': 'purple', 'Popular': 'blue' },

      // Shared store reference
      store: mentorStore,
    };
  },
  computed: {
    selectedProjectId: {
      get() { return mentorStore.selectedProjectId; },
      set(v) { mentorStore.setProject(v); }
    },
    selectedTaskId() { return mentorStore.selectedTaskId; },
    selectedTaskTitle() { return mentorStore.selectedTaskTitle; },
    tasks: {
      get() { return mentorStore.tasks; },
      set(v) { mentorStore.setTasks(v); }
    },
    chatMessages: {
      get() { return mentorStore.chatMessages; },
      set(v) { mentorStore.setChatMessages(v); }
    },
  },
  async mounted() {
    await this.loadProjects();
    if (this.selectedProjectId && !this.tasks.length) {
      try { const d = await getProjectTasks(this.selectedProjectId); this.tasks = d.tasks || []; } catch(e) {}
    }
    if (this.selectedTaskId && !this.chatMessages.length) {
      try {
        const d = await getTaskChat(this.selectedProjectId, this.selectedTaskId);
        if (d.messages?.length) this.chatMessages = d.messages;
      } catch(e) {}
      this.loadSubmissions();
    }
    this.pageLoading = false;
    this.loadSuggestions();
    this.loadRecommendations();
  },
  methods: {
    async loadProjects() {
      try {
        const d = await getMyProjects();
        this.projects = d.projects || [];
      } catch (e) { console.error(e); }
    },

    async onProjectChange() {
      mentorStore.setTasks([]);
      mentorStore.setTask(null, '');
      mentorStore.clearChat();
      this.submissions = [];
      if (!this.selectedProjectId) return;
      try {
        const d = await getProjectTasks(this.selectedProjectId);
        this.tasks = d.tasks || [];
      } catch (e) {
        // No tasks yet
      }
    },

    async generateProjectTasks() {
      if (!this.selectedProjectId) return;
      this.loadingTasks = true;
      try {
        const d = await generateTasks(this.selectedProjectId);
        this.tasks = d.tasks || [];
      } catch (e) { console.error(e); }
      finally { this.loadingTasks = false; }
    },

    async selectTask(idx) {
      const t = this.tasks[idx];
      if (!t) return;
      mentorStore.setTask(t._id, t.title);
      mentorStore.clearChat();

      // Load saved chat
      try {
        const d = await getTaskChat(this.selectedProjectId, this.selectedTaskId);
        if (d.messages && d.messages.length > 0) {
          this.chatMessages = d.messages;
          this.$nextTick(() => this.scrollChat());
          this.loadSubmissions();
          return;
        }
      } catch (e) {}

      // No saved chat — get welcome
      this.typing = true;
      try {
        const d = await getTaskWelcome(this.selectedProjectId, this.selectedTaskId);
        this.typing = false;
        if (d.reply) {
          this.chatMessages.push({ role: 'ai', content: d.reply, timestamp: new Date() });
        }
      } catch (e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: `Hey! 👋 Ready to help you with **${t.title}**. Ask me anything!`, timestamp: new Date() });
      }
      this.loadSubmissions();
    },

    async sendMessage() {
      if (!this.selectedTaskId) return;
      const text = this.chatInput.trim();
      if (!text && !this.pendingImage && !this.pendingFile) return;

      const msgText = text || (this.pendingFile ? 'Uploaded: ' + this.pendingFile.fileName : '(sent an image)');
      this.chatInput = '';

      // Show user message
      const userMsg = { role: 'user', content: msgText, timestamp: new Date() };
      if (this.pendingImage) userMsg.attachment = { type: 'image', url: this.pendingImage.dataUrl };
      if (this.pendingFile) userMsg.attachment = { type: 'file', filename: this.pendingFile.fileName };
      this.chatMessages.push(userMsg);
      this.$nextTick(() => this.scrollChat());

      const body = { message: msgText };
      if (this.pendingImage) { body.image = this.pendingImage.base64; body.imageMimeType = this.pendingImage.mimeType; }
      if (this.pendingFile) { body.fileContent = this.pendingFile.content; body.fileName = this.pendingFile.fileName; }
      this.clearImage();
      this.clearFile();

      this.typing = true;
      try {
        const d = await sendTaskChatMessage(this.selectedProjectId, this.selectedTaskId, body);
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: d.reply || 'Sorry, try again!', timestamp: new Date() });
      } catch (e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: 'Oops, something went wrong. Try again!', timestamp: new Date() });
      }
      this.$nextTick(() => this.scrollChat());
    },

    async submitForReview() {
      if (!this.selectedTaskId || !this.chatInput.trim()) return;
      const code = this.chatInput.trim();
      this.chatInput = '';
      this.chatMessages.push({ role: 'user', content: code, timestamp: new Date() });
      this.submitting = true;
      this.typing = true;
      try {
        const d = await submitTaskCode(this.selectedProjectId, this.selectedTaskId, code);
        this.typing = false;
        const rev = d.submission?.review || {};
        const status = rev.status === 'approved' ? '✅ Approved' : '❌ Rejected';
        let reply = `**${status}** (${rev.score}/100)\n\n${rev.feedback || ''}`;
        if (rev.suggestions?.length) reply += '\n\n' + rev.suggestions.map(s => '💡 ' + s).join('\n');
        this.chatMessages.push({ role: 'ai', content: reply, timestamp: new Date() });
        this.loadSubmissions();
      } catch (e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: 'Error submitting code.', timestamp: new Date() });
      }
      this.submitting = false;
      this.$nextTick(() => this.scrollChat());
    },

    async loadSubmissions() {
      try {
        const d = await getTaskSubmissions(this.selectedProjectId, this.selectedTaskId);
        this.submissions = d.submissions || [];
      } catch (e) {}
    },

    async loadSuggestions() {
      this.loadingSuggestions = true;
      try {
        const d = await getTopSuggestions();
        this.suggestions = d.suggestions || [];
      } catch (e) {}
      finally { this.loadingSuggestions = false; }
    },

    async loadRecommendations() {
      this.loadingRecs = true;
      try {
        const d = await getRecommendations();
        this.recommendations = d.recommendations || [];
      } catch (e) {}
      finally { this.loadingRecs = false; }
    },

    // File handlers
    onImageSelected(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.pendingImage = { base64: ev.target.result.split(',')[1], mimeType: file.type, dataUrl: ev.target.result };
        this.clearFile();
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    onFileSelected(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.pendingFile = { content: ev.target.result, fileName: file.name };
        this.clearImage();
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    clearImage() { this.pendingImage = null; },
    clearFile() { this.pendingFile = null; },

    refreshChat() { if (this.selectedTaskId) this.selectTask(this.tasks.findIndex(t => t._id === this.selectedTaskId)); },
    clearChatHistory() {
      if (!this.selectedProjectId || !this.selectedTaskId) return;
      this.showClearChatModal = true;
    },
    cancelClearChat() {
      this.showClearChatModal = false;
    },
    async confirmClearChat() {
      if (!this.selectedProjectId || !this.selectedTaskId) return;
      this.clearingChat = true;
      try {
        await deleteTaskChat(this.selectedProjectId, this.selectedTaskId);
        this.chatMessages = [];
        // Get fresh welcome message
        this.typing = true;
        const d = await getTaskWelcome(this.selectedProjectId, this.selectedTaskId);
        this.typing = false;
        if (d.reply) {
          this.chatMessages.push({ role: 'ai', content: d.reply, timestamp: new Date() });
        }
      } catch (e) {
        this.typing = false;
        console.error(e);
      } finally {
        this.clearingChat = false;
        this.showClearChatModal = false;
      }
    },
    scrollChat() { const el = this.$refs.chatMessages; if (el) el.scrollTop = el.scrollHeight; },
    getTaskStatus(task) {
      const subs = task.submissions || [];
      if (!subs.length) return '⬜';
      const last = subs[subs.length - 1];
      return last.review?.status === 'approved' ? '✅' : '🔄';
    },
    formatMessage(text) {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
    },
    isLongMessage(content) {
      if (!content) return false;
      return content.length > 300 || (content.match(/\n/g) || []).length > 6;
    },
    toggleExpand(msg) {
      msg._expanded = !msg._expanded;
      this.chatMessages = [...this.chatMessages];
    },
    toggleTaskDesc(task) {
      task._descExpanded = !task._descExpanded;
      this.tasks = [...this.tasks];
    },
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
  --rec-blue: #E7F5FF;
  --rec-yellow: #FFFAE5;
  --rec-purple: #F4F0FE;
  --rec-gray: #EAEDF6;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-main);
  min-height: 100vh;
  width: 100%;
}
.content-container { padding: 32px; max-width: 1400px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
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

.mentor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 992px) { .mentor-grid { grid-template-columns: 1fr; } }
.left-column { display: flex; flex-direction: column; gap: 24px; }

.mentor-card { background: #E7F5FF; border: 1px solid rgba(26,27,35,0.05); border-radius: 16px; padding: 24px; }
.card-header-title { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
.card-header-title h2 { font-size: 18px; font-weight: 600; color: #131927; }

/* Project select */
.project-select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 10px; font-size: 14px; background: #fff; margin-bottom: 10px; }
.btn-generate { width: 100%; padding: 12px; border: none; border-radius: 10px; background: var(--primary-color); color: #fff; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.btn-generate:disabled { opacity: 0.5; }

/* Task list */
.task-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; max-height: 300px; overflow-y: auto; }
.task-item { padding: 12px; border-radius: 10px; cursor: pointer; background: #fff; border: 2px solid transparent; transition: 0.15s; }
.task-item:hover { border-color: #d1d5db; }
.task-item.active { border-color: var(--primary-color); background: #f0f4ff; }
.task-header { display: flex; align-items: center; gap: 8px; }
.task-status-icon { font-size: 14px; }
.task-title { font-size: 14px; font-weight: 600; flex: 1; }
.task-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.4; }
.btn-task-expand { display: flex; align-items: center; gap: 2px; background: none; border: none; color: var(--primary-color); font-size: 11px; cursor: pointer; padding: 4px 0 0; font-weight: 600; }
.btn-task-expand:hover { opacity: 0.8; }

/* Progress */
.progress-list { display: flex; flex-direction: column; gap: 18px; }
.progress-item-container { display: flex; flex-direction: column; gap: 8px; }
.progress-info { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--text-main); }
.progress-bar-bg { height: 8px; background-color: #EDEFFE; border-radius: 4px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s; }

.loading-text { text-align: center; color: var(--text-muted); font-size: 13px; padding: 12px; }

/* Chat */
.chat-container { border: 1px solid var(--border-color); border-radius: 16px; background: #E7F5FF; display: flex; flex-direction: column; min-height: 500px; overflow: hidden; }
.chat-header { padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
.chat-header-left { display: flex; align-items: center; gap: 12px; }
.ai-header-avatar { width: 36px; height: 36px; background-color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.ai-status h3 { font-size: 15px; font-weight: 600; color: #4E61F6; }
.ai-status p { font-size: 11px; color: #22c55e; display: flex; align-items: center; gap: 4px; }
.ai-status p::before { content: ''; width: 6px; height: 6px; background-color: #22c55e; border-radius: 50%; }
.chat-header-actions { display: flex; align-items: center; gap: 14px; }
.chat-header-actions a { text-decoration: none; display: inline-flex; align-items: center; }
.chat-header-actions .icon { color: var(--primary-color); cursor: pointer; font-size: 20px; }

.chat-messages { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; min-height: 0; }
.chat-empty { text-align: center; color: var(--text-muted); padding: 40px 20px; font-size: 14px; }
.message-wrapper { display: flex; align-items: flex-start; gap: 10px; max-width: 85%; }
.message-wrapper.ai { align-self: flex-start; }
.message-wrapper.user { align-self: flex-end; flex-direction: row-reverse; }
.chat-msg-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background-color: #fff; padding: 4px; border: 1px solid rgba(0,0,0,0.05); }
.chat-msg-avatar.user-img { padding: 0; }
.message { padding: 12px 16px; border-radius: 14px; font-size: 13px; line-height: 1.5; word-break: break-word; }
.message-wrapper.ai .message { background-color: #0095FF; color: white; border-top-left-radius: 2px; }
.message-wrapper.user .message { background-color: #fff; color: #4E61F6; border-top-right-radius: 2px; }
.message code { background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 3px; font-size: 12px; }
.chat-img-preview { max-width: 200px; border-radius: 8px; margin-bottom: 6px; display: block; }
.chat-file-link { color: #93c5fd; font-size: 12px; display: block; margin-bottom: 4px; }

/* Collapsible long messages */
.collapsible-msg { position: relative; }
.collapsible-msg .msg-text { overflow: hidden; transition: max-height 0.3s ease; }
.collapsible-msg .msg-text.collapsed { max-height: 120px; -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%); mask-image: linear-gradient(to bottom, black 60%, transparent 100%); }
.btn-expand { display: flex; align-items: center; gap: 4px; background: none; border: none; color: inherit; font-size: 12px; cursor: pointer; padding: 6px 0 0; opacity: 0.8; font-weight: 600; }
.btn-expand:hover { opacity: 1; }
.message-wrapper.ai .btn-expand { color: rgba(255,255,255,0.9); }
.message-wrapper.user .btn-expand { color: var(--primary-color); }
.btn-expand .material-symbols-outlined { font-size: 18px; }

/* Typing */
.typing-dots { display: flex; gap: 4px; }
.typing-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.6); animation: bounce 0.6s infinite alternate; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { to { opacity: 0.3; transform: translateY(-4px); } }

/* Attachment preview */
.attachment-preview { display: flex; align-items: center; gap: 8px; padding: 4px 16px; }
.preview-thumb { max-height: 60px; border-radius: 6px; }
.file-preview { font-size: 13px; color: var(--text-main); }
.btn-clear-attach { width: 20px; height: 20px; border-radius: 50%; border: none; background: #ef4444; color: #fff; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

/* Input */
.chat-input-area { padding: 16px; border-top: 1px solid #fff; display: flex; align-items: center; gap: 22px; }
.input-wrapper { flex: 1; position: relative; display: flex; align-items: center; background-color: #E7F5FF; border: 1px solid #4E61F6; border-radius: 12px; padding: 0 14px; }
.input-wrapper input { width: 100%; border: none; background: transparent; padding: 12px 0; outline: none; font-size: 14px; }
.input-wrapper .icon-attach { color: #4E61F6; cursor: pointer; font-size: 20px; margin-left: 4px; }
.input-wrapper .icon-emoji { color: #4E61F6; margin-right: 8px; }
.btn-send-box { background-color: var(--primary-color); border: none; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.btn-send-box:disabled { opacity: 0.5; }
.btn-send-box .icon-send { color: white; font-size: 20px; transform: rotate(-25deg); }
.btn-send-box:hover { background-color: var(--primary-hover); }

.submit-bar { padding: 0 16px 12px; }
.btn-submit-review { width: 100%; padding: 10px; border: none; border-radius: 10px; background: #4E61F6; color: #fff; font-size: 13px; cursor: pointer; }
.btn-submit-review:disabled { opacity: 0.5; }

/* Badges */
.badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge.easy { background-color: #DCFCE7; color: #16a34a; }
.badge.medium { background-color: var(--tag-medium-bg); color: var(--tag-medium-text); }
.badge.hard { background-color: var(--tag-high-bg); color: var(--tag-high-text); }

/* Queue */
.queue-list { display: flex; flex-direction: column; gap: 12px; }
.queue-item { display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color); border-radius: 12px; padding: 16px 20px; background-color: #fff; }
.queue-left { display: flex; align-items: center; gap: 16px; }
.status-indicator { width: 18px; height: 18px; border-radius: 50%; }
.status-indicator.pending { background-color: #FFAA00; }
.status-indicator.approved { background-color: #22C55E; }
.status-indicator.rejected { background-color: #EF4444; }
.queue-meta h3 { font-size: 15px; font-weight: 600; color: var(--text-main); }
.queue-meta p { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.badge-status { padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.badge-status.pending { background-color: #FFF3D1; color: #FFAA00; border: 1px solid #FFAA00; }
.badge-status.approved { background-color: #DCFCE7; color: #22C55E; border: 1px solid #22C55E; }
.badge-status.rejected { background-color: #FEE2E2; color: #EF4444; border: 1px solid #EF4444; }

/* Recommendations */
.recommendations-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 16px; }
@media (max-width: 576px) { .recommendations-grid { grid-template-columns: 1fr; } }
.rec-card { border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.rec-card.blue { background-color: var(--rec-blue); }
.rec-card.yellow { background-color: var(--rec-yellow); }
.rec-card.purple { background-color: var(--rec-purple); }
.rec-card.gray { background-color: #E2E8F0; }
.rec-icon-box { width: 44px; height: 44px; background-color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.rec-details h3 { font-size: 16px; font-weight: 700; color: var(--text-main); }
.rec-details p { font-size: 13px; color: var(--text-muted); margin: 4px 0 12px 0; }
.badge-rec { display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; }
.badge-rec.blue { background-color: #DDE4FF; color: var(--primary-color); border: 1px solid var(--primary-color); }
.badge-rec.yellow { background-color: rgba(255,170,0,0.2); color: #FFAA00; border: 1px solid #FFAA00; }
.badge-rec.purple { background-color: #ECDFFF; color: #CB30E0; border: 1px solid #CB30E0; }
</style>