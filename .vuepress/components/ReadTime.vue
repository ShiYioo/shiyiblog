<template>
  <div class="reading-progress-track">
    <div class="reading-progress-fill" :style="{ width: displayProgress + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  wordCount: string
  readingTime: string
}>()

const displayProgress = ref(0)
const targetProgress = ref(0)
let rafId = 0
let inited = false

const computeTarget = () => {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const scrollHeight = el.scrollHeight - el.clientHeight
  targetProgress.value = scrollHeight > 0
    ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
    : 0
  if (!inited) {
    displayProgress.value = targetProgress.value
    inited = true
  }
}

const tick = () => {
  const target = targetProgress.value
  const current = displayProgress.value
  const diff = target - current
  if (Math.abs(diff) < 0.15) {
    displayProgress.value = target
  } else {
    displayProgress.value = current + diff * 0.22
  }
  rafId = requestAnimationFrame(tick)
}

const onScroll = () => computeTarget()

const BOOK_PATH = 'M19 2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H8V4h11v14zM4 6H2v14c0 1.1.9 2 2 2v-2V6z'
const CLOCK_PATH = 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z'

const injectedNodes: HTMLElement[] = []
let injectTimer = 0

const makeItem = (d: string, text: string): HTMLElement => {
  const wrap = document.createElement('span')
  wrap.className = 'xicon-container left reading-meta-item'
  wrap.style.cursor = 'default'
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '15')
  svg.setAttribute('height', '15')
  svg.setAttribute('fill', 'currentColor')
  svg.style.cssText = 'width:15px;height:15px;margin-right:6px;opacity:.85;flex-shrink:0;'
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  svg.appendChild(path)
  const txt = document.createElement('span')
  txt.className = 'xicon-content'
  txt.style.cssText = 'font-size:14px;text-wrap:nowrap;'
  txt.textContent = text
  wrap.appendChild(svg)
  wrap.appendChild(txt)
  return wrap
}

const ensureInfo = (): HTMLElement | null => {
  const content = document.querySelector('.page-content')
  if (!content) return null
  let info = content.querySelector('.page-info') as HTMLElement | null
  if (!info) {
    info = document.createElement('div')
    info.className = 'page-info reading-info-fallback'
    const title = content.querySelector('.page-title')
    if (title && title.parentNode) {
      title.parentNode.insertBefore(info, title.nextSibling)
    } else {
      content.insertBefore(info, content.firstChild)
    }
  }
  return info
}

const inject = (): boolean => {
  if (document.querySelector('.reading-meta-item')) return true
  const info = ensureInfo()
  if (!info) return false
  const w = makeItem(BOOK_PATH, `字数 ${props.wordCount}`)
  const r = makeItem(CLOCK_PATH, `阅读 ${props.readingTime}`)
  info.appendChild(w)
  info.appendChild(r)
  injectedNodes.push(w, r)
  return true
}

const tryInject = (attempt: number) => {
  if (inject()) return
  if (attempt < 40) injectTimer = window.setTimeout(() => tryInject(attempt + 1), 100)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  document.addEventListener('load', onScroll, true)
  computeTarget()
  setTimeout(onScroll, 600)
  setTimeout(onScroll, 1600)
  rafId = requestAnimationFrame(tick)
  tryInject(0)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.removeEventListener('load', onScroll, true)
  cancelAnimationFrame(rafId)
  clearTimeout(injectTimer)
  injectedNodes.forEach(n => n.remove())
  injectedNodes.length = 0
})
</script>

<style scoped>
.reading-progress-track {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9999;
  background: rgba(22, 119, 255, 0.12);
  overflow: hidden;
  pointer-events: none;
}

.reading-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #21bbff, #1677ff);
  box-shadow: 0 0 8px rgba(33, 187, 255, 0.48);
}
</style>
