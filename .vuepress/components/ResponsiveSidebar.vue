<template>
  <div class="sidebar-container" @mouseenter="hover = true" @mouseleave="hover = false">
    <div :class="['sidebar-content', { active: hover }]">
      <ul>
        <li><a href="#" @click.prevent="toggleFullScreen"><span class="icon">⛶</span><span class="label">全屏</span></a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hover = ref(false)

function toggleFullScreen() {
  const elem = document.documentElement
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`进入全屏模式失败: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  left: 0;
  top: 60px;
  height: calc(100vh - 130px); /* 修改此处：从100vh减去60px变为减去110px，为音乐播放器留出空间 */
  width: 40px; /* 默认只显示图标 */
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 9998;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.2);
}

.sidebar-container:hover,
.sidebar-container.active {
  width: 220px; /* 悬停或激活时扩展宽度 */
}

.sidebar-content {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 20px 10px;
  margin: 10px;
  height: calc(100% - 20px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  font-family: "Noto Sans JP", sans-serif;
  display: flex;
  flex-direction: column;
}

.dark .sidebar-content {
  background-color: rgba(40, 40, 40, 0.5);
  color: #eee;
}

.sidebar-content h3 {
  font-size: 1rem;
  margin-bottom: 15px;
  text-align: center;
}

.dark .sidebar-content h3 {
  color: #eee;
}

.sidebar-content ul {
  list-style: none;
  padding-left: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-content li {
  margin: 10px 0;
}

.sidebar-content a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
  transition: background-color 0.2s;
  overflow: hidden;
}

.dark .sidebar-content a {
  color: #ccc;
}

.dark .sidebar-content a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 图标始终居中 */
.sidebar-content .icon {
  flex-shrink: 0;
  width: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 文字默认隐藏 */
.sidebar-content .label {
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 显示文字当侧边栏激活 */
.sidebar-content.active .label {
  opacity: 1;
  transform: translateX(0);
}

/* 强制隐藏非激活状态下的文字 */
.sidebar-content:not(.active) a .label {
  display: none !important;
}

.sidebar-content a:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 响应式：移动端隐藏 */
@media (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}
</style>