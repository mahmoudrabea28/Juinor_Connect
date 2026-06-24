import { reactive } from 'vue'

// Shared state between AI_Mentor.vue and ChatAI.vue
// So when you pick a project/task in one, it stays selected in the other.

export const mentorStore = reactive({
  selectedProjectId: '',
  selectedTaskId: null,
  selectedTaskTitle: '',
  tasks: [],
  chatMessages: [],

  setProject(projectId) {
    if (this.selectedProjectId === projectId) return;
    this.selectedProjectId = projectId;
    this.selectedTaskId = null;
    this.selectedTaskTitle = '';
    this.tasks = [];
    this.chatMessages = [];
  },

  setTasks(tasks) {
    this.tasks = tasks || [];
  },

  setTask(taskId, taskTitle) {
    this.selectedTaskId = taskId;
    this.selectedTaskTitle = taskTitle;
  },

  setChatMessages(messages) {
    this.chatMessages = messages || [];
  },

  addChatMessage(msg) {
    this.chatMessages.push(msg);
  },

  clearChat() {
    this.chatMessages = [];
  },
})