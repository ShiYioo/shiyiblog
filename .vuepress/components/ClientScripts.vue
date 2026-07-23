// .vuepress/components/ClientScripts.vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window === 'undefined') return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

});
</script>

<template>
  <!-- 无实际内容 -->
</template>
