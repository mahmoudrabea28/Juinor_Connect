<template>
  <div class="accordion">
    <AccordionItem
      v-for="item in items"
      :key="item.id || item.title"
      :title="item.title"
      :content="item.content || item.description"
      :bullet="bullet"
    />
  </div>
</template>

<script setup>
import '../../assets/images/main.css'
import AccordionItem from './AccordionItem.vue'

defineProps({
  items: { type: Array, required: true },
  bullet: { type: Boolean, default: false },
})
</script>

<style scoped>
.accordion {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 4px 18px;
  box-shadow: var(--shadow-card);
}
</style>
