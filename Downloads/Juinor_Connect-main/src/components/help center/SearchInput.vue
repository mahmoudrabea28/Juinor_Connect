<template>
  <div class="search-input">
    <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6" stroke="#9ca3af" stroke-width="1.6"/>
      <path d="M14 14L18 18" stroke="#9ca3af" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search...' },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  gap: 10px;
  box-shadow: var(--shadow-card);
}

.search-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.search-input input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 13px;
  background: transparent;
  color: var(--color-text);
}

.search-input input::placeholder {
  color: var(--color-text-muted);
}
</style>
