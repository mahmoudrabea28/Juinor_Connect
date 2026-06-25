<template>
  <Teleport to="body">
    <div class="toast-wrap" role="status" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="t in toastState.items"
          :key="t.id"
          class="toast"
          :class="`toast--${t.type}`"
          @click="toast.remove(t.id)"
        >
          <span class="toast__icon" aria-hidden="true">
            <!-- success -->
            <svg v-if="t.type === 'success'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <!-- error -->
            <svg v-else-if="t.type === 'error'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5v.5" />
            </svg>
            <!-- info -->
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7.5v.5" />
            </svg>
          </span>
          <span class="toast__msg">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { toastState, toast } from '../state/toastStore.js'
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: 380px;
  padding: 13px 16px;
  border-radius: 12px;
  background: #fff;
  color: #1f2937;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 0 10px 30px rgba(30, 41, 59, 0.16);
  border: 1px solid #eef0f6;
  border-left: 4px solid #9aa3b2;
}
.toast--success { border-left-color: #16a34a; }
.toast--error { border-left-color: #ef4444; }
.toast--info { border-left-color: #4F39F6; }
.toast__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
}
.toast--success .toast__icon { background: #dcfce7; color: #16a34a; }
.toast--error .toast__icon { background: #fee2e2; color: #ef4444; }
.toast--info .toast__icon { background: #ecebfe; color: #4F39F6; }
.toast__msg { flex: 1; }

/* enter / leave animations */
.toast-enter-active { transition: all 0.32s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
.toast-leave-active { transition: all 0.28s ease; }
.toast-enter-from { opacity: 0; transform: translateY(24px) scale(0.96); }
.toast-leave-to { opacity: 0; transform: translateY(24px) scale(0.96); }
.toast-move { transition: transform 0.28s ease; }

@media (max-width: 520px) {
  .toast-wrap { bottom: 12px; right: 12px; left: 12px; }
  .toast { min-width: 0; max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active, .toast-leave-active, .toast-move { transition: opacity 0.2s ease; }
  .toast-enter-from, .toast-leave-to { transform: none; }
}
</style>
