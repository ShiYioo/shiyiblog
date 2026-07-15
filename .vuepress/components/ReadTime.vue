<template>
  <div class="spirit-widget" ref="widget">
    <div class="spirit-progress-track">
      <div class="spirit-progress-fill" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    <div class="spirit-card">
      <div class="spirit-row">
        <span class="spirit-icon icon-book"></span>
        <span class="spirit-label">字数</span>
        <span class="spirit-value">{{ wordCount }}</span>
      </div>
      <div class="spirit-divider"></div>
      <div class="spirit-row">
        <span class="spirit-icon icon-clock"></span>
        <span class="spirit-label">予読</span>
        <span class="spirit-value">{{ readingTime }}</span>
      </div>
      <div class="spirit-pct">{{ Math.floor(scrollProgress) }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps<{
  wordCount: string
  readingTime: string
}>()

const scrollProgress = ref(0)

const onScroll = () => {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const scrollHeight = el.scrollHeight - el.clientHeight
  scrollProgress.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.spirit-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9990;
  user-select: none;
  animation: spirit-float 4s ease-in-out infinite;
}

@keyframes spirit-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ========== 进度条 ========== */
.spirit-progress-track {
  width: 100%;
  height: 3px;
  background: rgba(200, 200, 220, 0.15);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.spirit-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8fab, #b39ddb, #6ec6ff);
  border-radius: 10px;
  transition: width 0.2s ease;
  box-shadow: 0 0 6px rgba(255, 143, 171, 0.4);
}

/* ========== 主卡片 ========== */
.spirit-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.75);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.spirit-widget:hover .spirit-card {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 143, 171, 0.15);
}

/* ========== 暗黑模式 ========== */
:global(html.dark) .spirit-card,
:global(body.dark) .spirit-card {
  background: rgba(30, 30, 50, 0.75);
  border-color: rgba(100, 100, 160, 0.2);
}

/* ========== 行 ========== */
.spirit-row {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-family: 'Comic Sans MS', 'Noto Sans CJK', sans-serif;
}

.spirit-label {
  color: #aaa3bd;
  font-size: 0.7rem;
}

:global(html.dark) .spirit-label,
:global(body.dark) .spirit-label {
  color: #7878a0;
}

.spirit-value {
  color: #7c6cb0;
  font-weight: 600;
}

:global(html.dark) .spirit-value,
:global(body.dark) .spirit-value {
  color: #ce93d8;
}

.spirit-divider {
  width: 1px;
  height: 16px;
  background: linear-gradient(to bottom, transparent, rgba(180, 180, 220, 0.3), transparent);
  flex-shrink: 0;
}

/* ========== 百分比 ========== */
.spirit-pct {
  font-size: 0.72rem;
  font-family: monospace;
  color: #ff8fab;
  min-width: 32px;
  text-align: right;
  font-weight: 600;
}

:global(html.dark) .spirit-pct,
:global(body.dark) .spirit-pct {
  color: #f48fb1;
}

/* ========== CSS图标 ========== */
.spirit-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: inline-block;
}

.icon-book {
  background: linear-gradient(135deg, #ff8fab, #b39ddb);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19 2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H8V4h11v14zM4 6H2v14c0 1.1.9 2 2 2v-2V6z'/%3E%3C/svg%3E") no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19 2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H8V4h11v14zM4 6H2v14c0 1.1.9 2 2 2v-2V6z'/%3E%3C/svg%3E") no-repeat center / contain;
}

.icon-clock {
  background: linear-gradient(135deg, #6ec6ff, #b39ddb);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z'/%3E%3C/svg%3E") no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z'/%3E%3C/svg%3E") no-repeat center / contain;
}

/* ========== 移动端 ========== */
@media (max-width: 768px) {
  .spirit-widget {
    bottom: 68px;
    right: 10px;
    animation: none;
  }

  .spirit-card {
    padding: 6px 10px;
    gap: 6px;
  }

  .spirit-row {
    font-size: 0.68rem;
  }

  .spirit-label {
    display: none;
  }

  .spirit-pct {
    font-size: 0.65rem;
    min-width: 26px;
  }

  .spirit-icon {
    width: 12px;
    height: 12px;
  }
}
</style>
