<template>
  
</template>

<script setup>
import { onMounted } from 'vue'
import * as live2d from 'live2d-render'

onMounted(() => {
  init()
})

const init = async () => {
  await live2d.initializeLive2D({
    CanvasId: 'live2d-canvas', // canvas ID
    BackgroundRGBA: [0, 0, 0, 0], // 背景透明
    ResourcesPath: '/live2d/baimeimo/baimeimo.model3.json', // 模型路径
    LoadFromCache: true,
    ShowToolBox: true,
    CanvasSize: {
      width: 200,
      height: 300,
    },
  })
}

const ccc = () => {
  if (window.Live2D && window.Live2D.expressions) {
    const expressions = Object.keys(window.Live2D.expressions)
    if (expressions.length > 0) {
      const randomExpr = expressions[Math.floor(Math.random() * expressions.length)]
      window.Live2D.model.expression(randomExpr)
    }
  }
}
</script>

<style scoped>
.live2d-container {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  backdrop-filter: blur(8px);
}

/* 在移动端隐藏 Live2D 模型 */
@media (max-width: 768px) {
  .live2d-container {
    display: none;
  }
}
</style>