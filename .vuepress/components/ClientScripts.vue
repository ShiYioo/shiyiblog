// .vuepress/components/ClientScripts.vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window !== 'undefined') {
    // 动态创建 <script> 标签来加载 /public 下的脚本
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript('/cursor-trail.js');
    loadScript('/snow.js');
  }
});
</script>

<template>
  <!-- 无实际内容 -->
</template>