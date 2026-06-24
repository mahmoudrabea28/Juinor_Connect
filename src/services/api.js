export const BASE_URL = "http://localhost:5000";
export async function api(path, { method = "GET", body } = {}) {
  const options = {
    method,
    headers: { 
      "Content-Type": "application/json" 
    },
    credentials: "include", 
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "An unexpected error occurred.");
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${path}:`, error);
    throw error;
  }
}

export function loginWithGoogle(rememberMe = false) {
  window.location.href = `${BASE_URL}/api/auth/google?remember=${rememberMe}`;
}

export function loginWithFacebook(rememberMe = false) {
  window.location.href = `${BASE_URL}/api/auth/facebook?remember=${rememberMe}`;
}

export async function register({ name, email, password, remember = false }) {
  return api("/api/auth/register", { method: "POST", body: { name, email, password, remember } });
}

export async function login({ email, password, remember = false }) {
  return api("/api/auth/login", { method: "POST", body: { email, password, remember } });
}

export async function forgotPassword(email) {
  return api("/api/auth/forgot-password", { method: "POST", body: { email } });
}

export async function verifyCode(email, code) {
  return api("/api/auth/verify-code", { method: "POST", body: { email, code } });
}

export async function resetPassword(email, token, newPassword) {
  return api("/api/auth/reset-password", { method: "POST", body: { email, token, newPassword } });
}

export async function checkStatus() {
  return api("/api/auth/status");
}

export async function getMe() {
  return api("/api/auth/me");
}

export async function logout() {
  return api("/api/auth/logout", { method: "POST" });
}
/*----- Profile (Profile page data: card + skills + personalInfo + portfolio) -----*/
export const getProfile = () => api("/api/profile");

/*----------------------*/
// دوال عامة لجلب البروفايل والخيارات
export const getOnboardingProfile = () => api("/api/onboarding");
export const getOnboardingOptions = () => api("/api/onboarding/options");

// دالة أساسية موحدة للتعامل مع خطوات التقديم (السر هنا في إضافة /api)
export const updateOnboardingStep = (step, data) => 
  api(`/api/onboarding/step/${step}`, { method: "PUT", body: data });

// دوال مختصرة لكل خطوة (استخدم هذه الدوال في مكونات الـ Vue)
export const updatePersonalInfo = (data) => updateOnboardingStep(1, data);
export const updateSkills = (skills) => updateOnboardingStep(2, { skills });
export const updateInterests = (interests) => updateOnboardingStep(3, { interests });
export const updateExperience = (level) => updateOnboardingStep(4, { experienceLevel: level });
export const updateAvailability = (data) => updateOnboardingStep(5, data);

/*----- Profile Generation (AI) -----*/
export const generateProfile = () => api("/api/profile-gen/generate", { method: "POST" });
export const regenerateProfile = () => api("/api/profile-gen/regenerate", { method: "POST" });
export const getLatestProfile = () => api("/api/profile-gen/latest");

/*----- Ideas -----*/
export const generateIdeas = () => api("/api/ideas/generate", { method: "POST" });
export const regenerateIdeas = () => api("/api/ideas/regenerate", { method: "POST" });
export const getLatestIdeas = () => api("/api/ideas/latest");

/*----- Projects / Teams -----*/
export const discoverProjects = () => api("/api/projects/discover");
export const getMyProjects = () => api("/api/projects/my");
export const getProjectById = (id) => api(`/api/projects/${id}`);
export const joinProject = (data) => api("/api/projects/join", { method: "POST", body: data });
export const leaveProject = (id) => api(`/api/projects/${id}/leave`, { method: "POST" });

/*----- Tasks -----*/
export const generateTasks = (projectId) => api(`/api/tasks/${projectId}/generate`, { method: "POST" });
export const getProjectTasks = (projectId) => api(`/api/tasks/${projectId}`);
export const submitTaskCode = (projectId, taskId, code) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/submit`, { method: "POST", body: { code } });
export const getTaskSubmissions = (projectId, taskId) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/submissions`);
export const getTaskChat = (projectId, taskId) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/chat`);
export const sendTaskChatMessage = (projectId, taskId, data) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/chat`, { method: "POST", body: data });
export const getTaskWelcome = (projectId, taskId) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/welcome`);
export const deleteTaskChat = (projectId, taskId) => 
  api(`/api/tasks/${projectId}/tasks/${taskId}/chat`, { method: "DELETE" });

/*----- Suggestions -----*/
export const getTopSuggestions = () => api("/api/suggestions/top-suggestions");
export const getRecommendations = () => api("/api/suggestions/recommendations");
export const regenerateRecommendations = () => api("/api/suggestions/recommendations/regenerate", { method: "POST" });