<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let frame = 0
let resizeObserver: ResizeObserver | undefined
let cleanup: (() => void) | undefined

type Fragment = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: 'diamond' | 'line'
}

const fragments: Fragment[] = []

const createFragment = (width: number, height: number): Fragment => {
  let x = 0
  let y = 0
  // Keep the central banner copy visually quiet.
  do {
    x = Math.random() * width
    y = Math.random() * height
  } while (x > width * 0.26 && x < width * 0.74 && y > height * 0.22 && y < height * 0.7)

  return {
    x,
    y,
    vx: 0.04 + Math.random() * 0.08,
    vy: -0.012 + Math.random() * 0.024,
    size: 3 + Math.random() * 5,
    opacity: 0.07 + Math.random() * 0.1,
    type: Math.random() > 0.5 ? 'diamond' : 'line',
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const element = canvas.value
  const context = element?.getContext('2d')
  if (!element || !context) return

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    element.width = window.innerWidth * ratio
    element.height = window.innerHeight * ratio
    element.style.width = `${window.innerWidth}px`
    element.style.height = `${window.innerHeight}px`
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    fragments.splice(0, fragments.length, ...Array.from({ length: 8 }, () => createFragment(window.innerWidth, window.innerHeight)))
  }

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    fragments.forEach((fragment) => {
      fragment.x += fragment.vx
      fragment.y += fragment.vy
      if (fragment.x > window.innerWidth + 16 || fragment.y < -16 || fragment.y > window.innerHeight + 16) {
        Object.assign(fragment, createFragment(window.innerWidth, window.innerHeight), { x: -12 })
      }

      context.save()
      context.translate(fragment.x, fragment.y)
      context.globalAlpha = fragment.opacity
      context.strokeStyle = '#21bbff'
      context.fillStyle = '#21bbff'
      context.lineWidth = 1
      if (fragment.type === 'diamond') {
        context.rotate(Math.PI / 4)
        context.strokeRect(-fragment.size / 2, -fragment.size / 2, fragment.size, fragment.size)
      } else {
        context.fillRect(-fragment.size, -0.5, fragment.size * 2, 1)
      }
      context.restore()
    })
    frame = window.requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(document.documentElement)
  draw()

  cleanup = () => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    resizeObserver?.disconnect()
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="archive-ambient" aria-hidden="true"></canvas>
</template>

<style>
.archive-ambient {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
</style>
