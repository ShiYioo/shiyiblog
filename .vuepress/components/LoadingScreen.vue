<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(true)
const fading = ref(false)
const progress = ref(0)
const currentAvatar = ref(0)

// 4 张立绘（直接外链蔚蓝档案 CDN）
const avatars = [
  '/ba-avatars/avatar1.c18ce793.png',
  '/ba-avatars/avatar2.916294c1.png',
  '/ba-avatars/avatar3.5e643647.png',
  '/ba-avatars/avatar4.be61bf91.png',
]

let progressTimer = null
let switchTimer = null
let finished = false

onMounted(() => {
  // 头像切换：每 0.5s 触发一次 onRepeat 等价，跳一次切一次 = 每 1s 切一次
  let skip = true
  switchTimer = setInterval(() => {
    if (skip) { skip = false; return }
    skip = true
    let next
    do { next = Math.floor(Math.random() * 4) } while (next === currentAvatar.value)
    currentAvatar.value = next
  }, 500)

  // 进度条逻辑（严格复刻：3 段速度）
  const img = new Image()
  const startTime = Date.now()
  const MIN_DISPLAY = 2500
  const MAX_WAIT = 12000

  progressTimer = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(progressTimer)
      return
    }
    if (img.complete) {
      // 资源就绪，飞快冲到 100
      progress.value = Math.min(100, progress.value + 2)
    } else if (progress.value > 80 && progress.value < 99.9) {
      // 80%+ 卡住等资源
      progress.value += 0.016
    } else {
      // 正常加载中
      progress.value += 0.3
    }
  }, 16)

  const finish = () => {
    if (finished) return
    finished = true
    clearInterval(progressTimer)
    clearInterval(switchTimer)
    progress.value = 100
    setTimeout(() => {
      fading.value = true
      setTimeout(() => {
        visible.value = false
      }, 800)
    }, 300)
  }

  const triggerFinish = () => {
    const elapsed = Date.now() - startTime
    const wait = Math.max(0, MIN_DISPLAY - elapsed)
    setTimeout(finish, wait)
  }

  img.onload = triggerFinish
  img.onerror = triggerFinish

  img.src = '/bgimg1.jpg'
  setTimeout(finish, MAX_WAIT)
})

onBeforeUnmount(() => {
  if (progressTimer) clearInterval(progressTimer)
  if (switchTimer) clearInterval(switchTimer)
})
</script>

<template>
  <div v-if="visible" class="loading_wrapper" :class="{ 'is-fading': fading }">
    <div class="avatar_img">
      <img :src="avatars[currentAvatar]" alt="" />
      <!-- 预加载所有立绘 -->
      <div class="hide">
        <img v-for="(src, i) in avatars" :key="i" :src="src" alt="" />
      </div>
    </div>
    <div class="progress_wrapper">
      <h1 class="title">connecting<span class="dots">...</span></h1>
      <div class="percent">{{ Math.floor(progress) }}%</div>
    </div>
  </div>
</template>

<style scoped>
.loading_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: url('/ba-loading-bg.png') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  font-family: 'TVPS-Vain-Capital-2', 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
  overflow: hidden;
}

.loading_wrapper.is-fading {
  opacity: 0;
  visibility: hidden;
}

/* 立绘容器：GSAP from y:-30, duration 0.5s, power1.in, yoyo, infinite */
.avatar_img {
  width: 222px;
  max-width: 40vw;
  position: relative;
  animation: ba-float 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
}

@keyframes ba-float {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, -30px, 0); }
}

.avatar_img > img:first-child {
  width: 100%;
  height: auto;
  display: block;
}

/* 预加载容器 */
.hide {
  display: none;
}

/* 文字块 */
.progress_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
}

.title {
  margin: 0;
  color: #1289F9;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}

.dots {
  display: inline-block;
  animation: dots-blink 1.4s steps(4, end) infinite;
}

@keyframes dots-blink {
  0%, 20%   { opacity: 0; }
  50%, 100% { opacity: 1; }
}

.percent {
  margin-top: 10px;
  color: #1289F9;
  font-size: 23px;
  font-weight: 400;
  line-height: 1;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-variant-numeric: tabular-nums;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .avatar_img { width: 170px; }
  .title { font-size: 26px; }
  .percent { font-size: 18px; }
}

@media (max-width: 480px) {
  .avatar_img { width: 140px; }
  .title { font-size: 22px; }
  .percent { font-size: 16px; margin-top: 8px; }
}

@media (max-width: 360px) {
  .avatar_img { width: 115px; }
  .title { font-size: 19px; }
  .percent { font-size: 14px; }
}

@media (max-height: 500px) and (orientation: landscape) {
  .avatar_img { width: 115px; }
  .title { font-size: 22px; }
  .percent { font-size: 16px; }
}
</style>
