<template>
  <div class="article-grid">
    <div class="article-col">
      <AccordionItem
        v-for="item in leftItems"
        :key="item.title"
        :title="item.title"
        :content="item.content"
        bullet
      />
    </div>
    <div class="article-col">
      <AccordionItem
        v-for="item in rightItems"
        :key="item.title"
        :title="item.title"
        :content="item.content"
        bullet
      />
    </div>
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
import { computed } from 'vue'
import AccordionItem from './AccordionItem.vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const half = computed(() => Math.ceil(props.items.length / 2))
const leftItems = computed(() => props.items.slice(0, half.value))
const rightItems = computed(() => props.items.slice(half.value))
</script>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

.article-col {
  display: flex;
  flex-direction: column;
}

.article-col :deep(.accordion-item) {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-card);
}

.article-col :deep(.accordion-trigger) {
  padding: 14px 0;
}

@media (max-width: 700px) {
  .article-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
