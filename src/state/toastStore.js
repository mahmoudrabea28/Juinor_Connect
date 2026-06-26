import { reactive } from 'vue'

// Simple central store for toasts. Any component can call toast.success(...) or
// toast.error(...) to show a floating message instead of the ugly browser alert().
let nextId = 1

export const toastState = reactive({
  items: [],
})

function add(message, type = 'info', duration = 3500) {
  if (!message) return
  const id = nextId++
  toastState.items.push({ id, message, type })

  // Auto-dismiss it after the configured duration.
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
  return id
}

function remove(id) {
  const i = toastState.items.findIndex((t) => t.id === id)
  if (i !== -1) toastState.items.splice(i, 1)
}

// Public API: toast.success('...') / toast.error('...') / toast.info('...')
export const toast = {
  success: (msg, duration) => add(msg, 'success', duration),
  error: (msg, duration) => add(msg, 'error', duration),
  info: (msg, duration) => add(msg, 'info', duration),
  remove,
}
