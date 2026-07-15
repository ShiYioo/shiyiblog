<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(true)
const fading = ref(false)
const progress = ref(0)
const textIndex = ref(0)

const loadingTexts = [
  '正在展开魔法阵...',
  '召唤式神中...',
  '正在连接异世界...',
  '加载樱花结界...',
  '即将転生...',
]

let textTimer = null
let progressTimer = null

onMounted(() => {
  textTimer = setInterval(() => {
    textIndex.value = (textIndex.value + 1) % loadingTexts.length
  }, 1800)

  const img = new Image()
  const startTime = Date.now()
  const MIN_DISPLAY = 2000

  const smoothProgress = () => {
    progressTimer = setInterval(() => {
      if (img.complete && progress.value < 90) {
        progress.value = 90
      } else if (!img.complete && progress.value < 85) {
        progress.value += Math.random() * 3
      }
    }, 100)
  }

  const finish = () => {
    clearInterval(progressTimer)
    progress.value = 100
    setTimeout(() => {
      fading.value = true
      setTimeout(() => {
        visible.value = false
      }, 800)
    }, 300)
  }

  img.onload = () => {
    const elapsed = Date.now() - startTime
    const wait = Math.max(0, MIN_DISPLAY - elapsed)
    setTimeout(finish, wait)
  }

  img.onerror = () => {
    const elapsed = Date.now() - startTime
    const wait = Math.max(0, MIN_DISPLAY - elapsed)
    setTimeout(finish, wait)
  }

  img.src = '/bgimg1.jpg'
  smoothProgress()
})

onBeforeUnmount(() => {
  if (textTimer) clearInterval(textTimer)
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
  <div v-if="visible" class="loading-overlay" :class="{ 'is-fading': fading }">
    <div class="petals">
      <span v-for="n in 8" :key="n" class="petal" :style="{
        '--delay': (n * 0.4) + 's',
        '--duration': (3 + n * 0.3) + 's',
        '--x': (Math.random() * 100) + '%',
      }"></span>
    </div>

    <div class="magic-circle">
      <div class="ring ring-outer"></div>
      <div class="ring ring-middle"></div>
      <div class="ring ring-inner"></div>
      <div class="rune rune-1"></div>
      <div class="rune rune-2"></div>
      <div class="rune rune-3"></div>
      <div class="rune rune-4"></div>
      <div class="core">
        <div class="core-star"></div>
      </div>
    </div>

    <div class="loading-info">
      <div class="loading-text">{{ loadingTexts[textIndex] }}</div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-num">{{ Math.floor(progress) }}%</div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
}

.loading-overlay.is-fading {
  opacity: 0;
  visibility: hidden;
}

/* ========== 魔法阵 ========== */
.magic-circle {
  position: relative;
  width: 220px;
  height: 220px;
}

.ring {
  position: absolute;
  border-radius: 50%;
}

.ring-outer {
  inset: 0;
  border: 2px solid transparent;
  border-top-color: #ff8fab;
  border-right-color: #b39ddb;
  animation: spin-cw 3s linear infinite;
  box-shadow: 0 0 30px rgba(255, 143, 171, 0.25);
}

.ring-middle {
  inset: 22px;
  border: 2px dashed rgba(179, 157, 219, 0.45);
  animation: spin-ccw 5s linear infinite;
}

.ring-inner {
  inset: 44px;
  border: 2px solid transparent;
  border-bottom-color: #6ec6ff;
  border-left-color: #ff8fab;
  animation: spin-cw 2s linear infinite;
}

/* 符文装饰点 */
.rune {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ff8fab, #b39ddb);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.rune-1 { top: -4px; left: 50%; transform: translateX(-50%); animation: spin-cw 3s linear infinite; transform-origin: 4px 114px; }
.rune-2 { top: 50%; right: -4px; transform: translateY(-50%); animation: spin-cw 3s linear infinite; transform-origin: -106px 4px; }
.rune-3 { bottom: -4px; left: 50%; transform: translateX(-50%); animation: spin-cw 3s linear infinite; transform-origin: 4px -106px; }
.rune-4 { top: 50%; left: -4px; transform: translateY(-50%); animation: spin-cw 3s linear infinite; transform-origin: 114px 4px; }

.core {
  position: absolute;
  inset: 70px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 143, 171, 0.25), rgba(110, 198, 255, 0.1), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: core-pulse 1.5s ease-in-out infinite;
}

.core-star {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #ff8fab, #b39ddb, #6ec6ff);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  box-shadow: 0 0 20px rgba(255, 143, 171, 0.6);
}

@keyframes spin-cw {
  to { transform: rotate(360deg); }
}

@keyframes spin-ccw {
  to { transform: rotate(-360deg); }
}

@keyframes core-pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.15); opacity: 1; }
}

/* ========== 樱花花瓣 ========== */
.petals {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.petal {
  position: absolute;
  top: -20px;
  left: var(--x);
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #ff8fab, #ffc0cb);
  clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 90% 70%, 60% 90%, 50% 100%, 40% 90%, 10% 70%, 0% 35%, 20% 10%);
  opacity: 0;
  animation: petal-fall var(--duration) ease-in var(--delay) infinite;
}

@keyframes petal-fall {
  0% {
    top: -20px;
    opacity: 0;
    transform: rotate(0deg) scale(0.8);
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    top: 110%;
    opacity: 0;
    transform: rotate(720deg) scale(1.2);
  }
}

/* ========== 加载信息 ========== */
.loading-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loading-text {
  color: rgba(255, 143, 171, 0.9);
  font-size: 1rem;
  letter-spacing: 2px;
  font-family: 'Mochiy Pop One', 'Noto Sans CJK SC', sans-serif;
  text-shadow: 0 0 10px rgba(255, 143, 171, 0.4);
  animation: text-fade 1.8s ease-in-out infinite;
  min-height: 1.5em;
}

@keyframes text-fade {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.progress-track {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8fab, #b39ddb, #6ec6ff);
  border-radius: 10px;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 143, 171, 0.5);
}

.progress-num {
  color: rgba(179, 157, 219, 0.7);
  font-size: 0.85rem;
  font-family: monospace;
  letter-spacing: 1px;
}
</style>
