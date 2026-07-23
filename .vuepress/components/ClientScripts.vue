// .vuepress/components/ClientScripts.vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window === 'undefined') return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const onIdle = 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb) => setTimeout(cb, 2000);

  onIdle(() => {
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript('/snow.js');
  });
});
</script>

<template>
  <!-- 无实际内容 -->
</template>
