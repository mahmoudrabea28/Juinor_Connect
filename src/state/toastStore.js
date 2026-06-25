import { reactive } from 'vue'

// مخزن مركزي بسيط للـ toasts. أي مكون يقدر ينادي toast.success(...) أو
// toast.error(...) وتظهر رسالة عائمة بدل alert() القبيح بتاع المتصفح.
let nextId = 1

export const toastState = reactive({
  items: [],
})

function add(message, type = 'info', duration = 3500) {
  if (!message) return
  const id = nextId++
  toastState.items.push({ id, message, type })

  // نشيلها تلقائيًا بعد المدة المحددة.
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
  return id
}

function remove(id) {
  const i = toastState.items.findIndex((t) => t.id === id)
  if (i !== -1) toastState.items.splice(i, 1)
}

// واجهة الاستخدام: toast.success('...') / toast.error('...') / toast.info('...')
export const toast = {
  success: (msg, duration) => add(msg, 'success', duration),
  error: (msg, duration) => add(msg, 'error', duration),
  info: (msg, duration) => add(msg, 'info', duration),
  remove,
}
