<template>
  <div class="card-container" ref="card">
    <div class="card-content">
      <p>字数：{{ wordCount }} </p>
      <p>预计阅读时间：{{ readingTime }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  wordCount: string
  readingTime: string
}>()

const card = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const offset = { x: 0, y: 0 }

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  offset.x = e.clientX - (card.value?.offsetLeft || 0)
  offset.y = e.clientY - (card.value?.offsetTop || 0)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  if (card.value) {
    card.value.style.left = `${e.clientX - offset.x}px`
    card.value.style.top = `${e.clientY - offset.y}px`
  }
}

const onMouseUp = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  if (card.value) {
    card.value.addEventListener('mousedown', onMouseDown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  if (card.value) {
    card.value.removeEventListener('mousedown', onMouseDown)
  }
})
</script>

<style scoped>
.card-container {
  position: fixed;
  left: 100px;
  top: 100px;
  width: 200px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6); /* 半透明白色背景 */
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0.8; /* 整体透明度控制 */
  font-family: 'Comic Sans MS', cursive, sans-serif;
  user-select: none;
  cursor: move;
  transition: transform 0.2s ease;
  z-index: 9999;
  pointer-events: auto; /* 只有需要点击的地方才响应事件 */
  touch-action: pan-y pinch-zoom; /* 允许纵向滚动和缩放 */
}

.card-container * {
  pointer-events: auto;
}

.card-container:hover {
  transform: scale(1.03);
}

/* 手机端适配 */
@media (max-width: 768px) {
  .card-container {
    width: 160px;
    left: 20px;
    top: 20px;
    font-size: 12px;
    padding: 12px;
    border-radius: 12px;
    pointer-events: none; /* 移动端禁用拖拽与点击事件，避免影响滑动 */
    touch-action: pan-y pinch-zoom;
  }

  .card-container * {
    pointer-events: none; /* 防止文字被误触选中 */
  }
}
</style>