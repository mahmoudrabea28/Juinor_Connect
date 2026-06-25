<template>
  <DashboardLayout>
    <div class="fullscreen-chat-container">

      <!-- Task selector bar -->
      <div class="task-selector-bar" v-if="!selectedTaskId">
        <select v-model="selectedProjectId" @change="onProjectChange" class="select-input">
          <option value="">-- Choose project --</option>
          <option v-for="p in projects" :key="p._id" :value="p._id">{{ p.title }}</option>
        </select>
        <button v-if="selectedProjectId && !tasks.length" @click="genTasks" :disabled="loadingTasks" class="btn-gen">
          {{ loadingTasks ? '⏳ Generating...' : '⚡ Generate Tasks' }}
        </button>
        <div v-if="tasks.length" class="task-chips">
          <div v-for="(t, i) in tasks" :key="t._id" class="task-chip" @click="selectTask(i)">
            {{ getTaskStatus(t) }} {{ t.title }}
            <span class="chip-badge" :class="t.difficulty">{{ t.difficulty }}</span>
          </div>
        </div>
      </div>

      <!-- Active task bar -->
      <div v-if="selectedTaskId" class="active-task-bar">
        <button @click="backToTasks" class="btn-back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <span class="active-task-name">{{ selectedTaskTitle }}</span>
      </div>

      <div class="chat-container">
        <!-- Header -->
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
            <span class="material-symbols-outlined icon" @click="clearChatHistory" title="Clear chat history">restart_alt</span>
          </div>
        </div>
        
        <!-- Messages -->
        <div class="chat-messages" ref="chatMessages">
          <div v-if="!selectedTaskId && !chatMessages.length" class="chat-empty">
            <div class="empty-icon">💬</div>
            <p>Select a project & task above to start chatting</p>
          </div>

          <div v-for="msg in chatMessages" :key="msg._id || msg.timestamp" class="message-wrapper" :class="msg.role === 'user' ? 'user' : 'ai'">
            <img v-if="msg.role === 'ai'" src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
            <img v-else src="../../assets/images/Avatar.png" alt="User" class="chat-msg-avatar user-img">
            <div class="message">
              <img v-if="msg.attachment && msg.attachment.type === 'image' && msg.attachment.url" 
                :src="msg.attachment.url" class="chat-img-preview" alt="attachment">
              <a v-if="msg.attachment && msg.attachment.type === 'file' && msg.attachment.url" 
                :href="msg.attachment.url" target="_blank" class="chat-file-link">
                📄 {{ msg.attachment.filename || 'file' }}
              </a>
              <!-- Collapsible long messages -->
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

          <div v-if="typing" class="message-wrapper ai">
            <img src="../../assets/images/Icon.png" alt="AI" class="chat-msg-avatar">
            <div class="message"><span class="typing-dots"><span></span><span></span><span></span></span></div>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <div v-if="pendingImage" class="attachment-preview">
            <img :src="pendingImage.dataUrl" class="preview-thumb">
            <button @click="clearImage" class="btn-clear-attach">✕</button>
          </div>
          <div v-if="pendingFile" class="attachment-preview file-preview-bar">
            <span>📄 {{ pendingFile.fileName }}</span>
            <button @click="clearFile" class="btn-clear-attach">✕</button>
          </div>

          <div class="input-wrapper">
            <span class="material-symbols-outlined icon-emoji" style="margin-right: 10px;">sentiment_satisfied</span>
            <input type="text" v-model="chatInput" placeholder="Type your message..." @keydown.enter="sendMessage" :disabled="!selectedTaskId">
            <input type="file" ref="imageInput" accept="image/*" style="display:none" @change="onImageSelected">
            <input type="file" ref="fileInput" accept=".js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.html,.css,.json,.txt,.md" style="display:none" @change="onFileSelected">
            <span class="material-symbols-outlined icon-attach" @click="$refs.fileInput.click()" title="Attach code file">description</span>
            <span class="material-symbols-outlined icon-attach" @click="$refs.imageInput.click()" title="Attach image">photo_camera</span>
          </div>
          <button class="btn-send-box" @click="sendMessage" :disabled="!selectedTaskId">
            <span class="material-symbols-outlined icon-send">send</span>
          </button>
        </div>

        <div v-if="selectedTaskId" class="submit-bar">
          <button @click="submitForReview" :disabled="!chatInput.trim() || submitting" class="btn-submit-review">
            🚀 {{ submitting ? 'Reviewing...' : 'Submit Code for Final Review' }}
          </button>
        </div>
      </div>
    </div>
    <ClearChatModal
      v-if="showClearChatModal"
      :loading="clearingChat"
      @confirm="confirmClearChat"
      @cancel="cancelClearChat"
    />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/Dashboard_Navbar.vue'; 
import ClearChatModal from '../../components/profile/ClearChatModal.vue';
import { mentorStore } from '../../state/mentorStore.js';
import { 
  getMyProjects, generateTasks, getProjectTasks, 
  getTaskChat, sendTaskChatMessage, getTaskWelcome, deleteTaskChat,
  submitTaskCode
} from '../../services/api.js';

export default {
  name: 'FullscreenAiMentor',
  components: { DashboardLayout, ClearChatModal },
  data() {
    return {
      projects: [],
      loadingTasks: false,
      chatInput: '',
      typing: false,
      pendingImage: null,
      pendingFile: null,
      submitting: false,
      showClearChatModal: false,
      clearingChat: false,
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
    }
    this.$nextTick(() => this.scrollChat());
  },
  methods: {
    async loadProjects() {
      try { const d = await getMyProjects(); this.projects = d.projects || []; } catch(e) {}
    },
    async onProjectChange() {
      mentorStore.setTasks([]); mentorStore.setTask(null, ''); mentorStore.clearChat();
      if (!this.selectedProjectId) return;
      try { const d = await getProjectTasks(this.selectedProjectId); this.tasks = d.tasks || []; } catch(e) {}
    },
    async genTasks() {
      this.loadingTasks = true;
      try { const d = await generateTasks(this.selectedProjectId); this.tasks = d.tasks || []; } catch(e) {}
      finally { this.loadingTasks = false; }
    },
    async selectTask(idx) {
      const t = this.tasks[idx];
      if (!t) return;
      mentorStore.setTask(t._id, t.title);
      mentorStore.clearChat();

      try {
        const d = await getTaskChat(this.selectedProjectId, this.selectedTaskId);
        if (d.messages && d.messages.length > 0) {
          this.chatMessages = d.messages;
          this.$nextTick(() => this.scrollChat());
          return;
        }
      } catch(e) {}

      this.typing = true;
      try {
        const d = await getTaskWelcome(this.selectedProjectId, this.selectedTaskId);
        this.typing = false;
        if (d.reply) this.chatMessages.push({ role: 'ai', content: d.reply, timestamp: new Date() });
      } catch(e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: `Hey! 👋 Ready to help with **${t.title}**!`, timestamp: new Date() });
      }
    },
    backToTasks() { mentorStore.setTask(null, ''); mentorStore.clearChat(); },
    async sendMessage() {
      if (!this.selectedTaskId) return;
      const text = this.chatInput.trim();
      if (!text && !this.pendingImage && !this.pendingFile) return;
      const msgText = text || (this.pendingFile ? 'Uploaded: ' + this.pendingFile.fileName : '(sent an image)');
      this.chatInput = '';

      const userMsg = { role: 'user', content: msgText, timestamp: new Date() };
      if (this.pendingImage) userMsg.attachment = { type: 'image', url: this.pendingImage.dataUrl };
      if (this.pendingFile) userMsg.attachment = { type: 'file', filename: this.pendingFile.fileName };
      this.chatMessages.push(userMsg);
      this.$nextTick(() => this.scrollChat());

      const body = { message: msgText };
      if (this.pendingImage) { body.image = this.pendingImage.base64; body.imageMimeType = this.pendingImage.mimeType; }
      if (this.pendingFile) { body.fileContent = this.pendingFile.content; body.fileName = this.pendingFile.fileName; }
      this.clearImage(); this.clearFile();

      this.typing = true;
      try {
        const d = await sendTaskChatMessage(this.selectedProjectId, this.selectedTaskId, body);
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: d.reply || 'Try again!', timestamp: new Date() });
      } catch(e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: 'Oops, something went wrong.', timestamp: new Date() });
      }
      this.$nextTick(() => this.scrollChat());
    },
    async submitForReview() {
      if (!this.selectedTaskId || !this.chatInput.trim()) return;
      const code = this.chatInput.trim();
      this.chatInput = '';
      this.chatMessages.push({ role: 'user', content: code, timestamp: new Date() });
      this.submitting = true; this.typing = true;
      try {
        const d = await submitTaskCode(this.selectedProjectId, this.selectedTaskId, code);
        this.typing = false;
        const rev = d.submission?.review || {};
        const status = rev.status === 'approved' ? '✅ Approved' : '❌ Rejected';
        let reply = `**${status}** (${rev.score}/100)\n\n${rev.feedback || ''}`;
        if (rev.suggestions?.length) reply += '\n\n' + rev.suggestions.map(s => '💡 ' + s).join('\n');
        this.chatMessages.push({ role: 'ai', content: reply, timestamp: new Date() });
      } catch(e) {
        this.typing = false;
        this.chatMessages.push({ role: 'ai', content: 'Error submitting.', timestamp: new Date() });
      }
      this.submitting = false;
      this.$nextTick(() => this.scrollChat());
    },
    clearChatHistory() {
      if (!this.selectedProjectId || !this.selectedTaskId) return;
      this.showClearChatModal = true;
    },
    cancelClearChat() { this.showClearChatModal = false; },
    async confirmClearChat() {
      if (!this.selectedProjectId || !this.selectedTaskId) return;
      this.clearingChat = true;
      try {
        await deleteTaskChat(this.selectedProjectId, this.selectedTaskId);
        this.chatMessages = [];
        this.typing = true;
        const d = await getTaskWelcome(this.selectedProjectId, this.selectedTaskId);
        this.typing = false;
        if (d.reply) this.chatMessages.push({ role: 'ai', content: d.reply, timestamp: new Date() });
      } catch(e) { this.typing = false; }
      finally { this.clearingChat = false; this.showClearChatModal = false; }
    },

    // File handlers
    onImageSelected(e) {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { this.pendingImage = { base64: ev.target.result.split(',')[1], mimeType: file.type, dataUrl: ev.target.result }; this.clearFile(); };
      reader.readAsDataURL(file); e.target.value = '';
    },
    onFileSelected(e) {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { this.pendingFile = { content: ev.target.result, fileName: file.name }; this.clearImage(); };
      reader.readAsText(file); e.target.value = '';
    },
    clearImage() { this.pendingImage = null; },
    clearFile() { this.pendingFile = null; },

    scrollChat() { const el = this.$refs.chatMessages; if (el) el.scrollTop = el.scrollHeight; },
    getTaskStatus(task) {
      const subs = task.submissions || [];
      if (!subs.length) return '⬜';
      return subs[subs.length - 1].review?.status === 'approved' ? '✅' : '🔄';
    },
    formatMessage(text) {
      if (!text) return '';
      return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')
        .replace(/`([^`]+)`/g,'<code>$1</code>')
        .replace(/\n/g,'<br>');
    },
    isLongMessage(content) { return content && (content.length > 300 || (content.match(/\n/g)||[]).length > 6); },
    toggleExpand(msg) { msg._expanded = !msg._expanded; this.chatMessages = [...this.chatMessages]; },
  },
}
</script>

<style scoped>
.fullscreen-chat-container { flex: 1; padding: 32px; display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; gap: 12px; }

/* Task selector */
.task-selector-bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-start; }
.select-input { padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 10px; font-size: 13px; min-width: 220px; background: #fff; }
.btn-gen { padding: 10px 16px; border: none; border-radius: 10px; background: #4E61F6; color: #fff; font-size: 13px; cursor: pointer; }
.btn-gen:disabled { opacity: 0.5; }
.task-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.task-chip { padding: 8px 14px; background: #E7F5FF; border: 1px solid #d1e5f7; border-radius: 10px; font-size: 13px; cursor: pointer; transition: 0.15s; }
.task-chip:hover { border-color: #4E61F6; background: #f0f4ff; }
.chip-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-weight: 600; }
.chip-badge.easy { background: #DCFCE7; color: #16a34a; }
.chip-badge.medium { background: #FFF3D1; color: #FFAA00; }
.chip-badge.hard { background: #FEE2E2; color: #EF4444; }

.active-task-bar { display: flex; align-items: center; gap: 10px; }
.btn-back { background: none; border: 1px solid #d1d5db; border-radius: 10px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.active-task-name { font-size: 15px; font-weight: 600; color: #131927; }

/* Chat container */
.chat-container { border: 1px solid rgba(26,27,35,0.05); border-radius: 16px; background: #E7F5FF; display: flex; flex-direction: column; flex: 1; overflow: hidden; }

.chat-header { padding: 18px 24px; border-bottom: 1px solid rgba(26,27,35,0.05); display: flex; justify-content: space-between; align-items: center; background-color: #E7F5FF; }
.chat-header-left { display: flex; align-items: center; gap: 12px; }
.ai-avatar-box { width: 38px; height: 38px; background-color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,0,0,0.05); }
.ai-status h3 { font-size: 16px; font-weight: 600; color: #4E61F6; }
.ai-status p { font-size: 12px; color: #22c55e; display: flex; align-items: center; gap: 4px; }
.ai-status p::before { content: ''; width: 6px; height: 6px; background-color: #22c55e; border-radius: 50%; }
.chat-header-actions { display: flex; align-items: center; gap: 16px; }
.chat-header-actions a { text-decoration: none; display: inline-flex; align-items: center; }
.chat-header-actions .icon { color: #4E61F6; cursor: pointer; font-size: 22px; transition: transform 0.2s ease; }
.chat-header-actions .icon:hover { transform: scale(1.1); }

/* Messages */
.chat-messages { flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 18px; background-color: #E7F5FF; overflow-y: auto; min-height: 0; }
.chat-empty { text-align: center; color: #64748b; padding: 60px 20px; }
.chat-empty .empty-icon { font-size: 48px; margin-bottom: 12px; }
.message-wrapper { display: flex; align-items: flex-start; gap: 12px; max-width: 75%; }
.message-wrapper.ai { align-self: flex-start; }
.message-wrapper.user { align-self: flex-end; flex-direction: row-reverse; }
.chat-msg-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background-color: #fff; padding: 4px; border: 1px solid rgba(0,0,0,0.05); }
.chat-msg-avatar.user-img { padding: 0; }
.message { padding: 14px 18px; border-radius: 16px; font-size: 14px; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.02); word-break: break-word; }
.message-wrapper.ai .message { background-color: #0095FF; color: white; border-top-left-radius: 2px; }
.message-wrapper.user .message { background-color: #ffffff; color: #4E61F6; border-top-right-radius: 2px; }
.message code { background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 3px; font-size: 12px; }
.chat-img-preview { max-width: 240px; border-radius: 8px; margin-bottom: 6px; display: block; }
.chat-file-link { color: #93c5fd; font-size: 13px; display: block; margin-bottom: 4px; }

/* Collapsible */
.collapsible-msg { position: relative; }
.collapsible-msg .msg-text { overflow: hidden; transition: max-height 0.3s ease; }
.collapsible-msg .msg-text.collapsed { max-height: 120px; -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%); mask-image: linear-gradient(to bottom, black 60%, transparent 100%); }
.btn-expand { display: flex; align-items: center; gap: 4px; background: none; border: none; color: inherit; font-size: 12px; cursor: pointer; padding: 6px 0 0; opacity: 0.8; font-weight: 600; }
.btn-expand:hover { opacity: 1; }
.message-wrapper.ai .btn-expand { color: rgba(255,255,255,0.9); }
.message-wrapper.user .btn-expand { color: #4E61F6; }
.btn-expand .material-symbols-outlined { font-size: 18px; }

/* Typing */
.typing-dots { display: flex; gap: 4px; }
.typing-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.6); animation: bounce 0.6s infinite alternate; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { to { opacity: 0.3; transform: translateY(-4px); } }

/* Attachment preview */
.attachment-preview { display: flex; align-items: center; gap: 8px; padding: 4px 24px; }
.preview-thumb { max-height: 60px; border-radius: 6px; }
.file-preview-bar { font-size: 13px; color: #131927; }
.btn-clear-attach { width: 20px; height: 20px; border-radius: 50%; border: none; background: #ef4444; color: #fff; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

/* Input */
.chat-input-area { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.5); display: flex; align-items: center; gap: 16px; background-color: #E7F5FF; }
.input-wrapper { flex: 1; display: flex; align-items: center; background-color: #E7F5FF; border: 1px solid #4E61F6; border-radius: 14px; padding: 0 16px; }
.input-wrapper input { width: 100%; border: none; background: transparent; padding: 14px 0; outline: none; font-size: 14px; color: #131927; }
.input-wrapper input::placeholder { color: #64748b; }
.input-wrapper .icon-emoji, .input-wrapper .icon-attach { color: #4E61F6; cursor: pointer; font-size: 22px; }
.input-wrapper .icon-attach { margin-left: 4px; }
.btn-send-box { background-color: #4E61F6; border: none; border-radius: 14px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background-color 0.2s ease; }
.btn-send-box:disabled { opacity: 0.5; }
.btn-send-box .icon-send { color: white; font-size: 22px; transform: rotate(-25deg); }
.btn-send-box:hover { background-color: #3b4ed1; }

.submit-bar { padding: 0 24px 16px; }
.btn-submit-review { width: 100%; padding: 12px; border: none; border-radius: 10px; background: #4E61F6; color: #fff; font-size: 14px; cursor: pointer; font-weight: 600; }
.btn-submit-review:disabled { opacity: 0.5; }
</style>