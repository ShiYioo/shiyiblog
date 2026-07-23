<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const cursor = ref<HTMLElement | null>(null)
let clickTimer: ReturnType<typeof setTimeout> | undefined
let cleanup: (() => void) | undefined

const isInteractive = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('a, button, input, select, textarea, [role="button"], .link'))

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return

  const move = (event: MouseEvent) => {
    cursor.value?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`)
    cursor.value?.classList.add('is-visible')
  }
  const over = (event: MouseEvent) => cursor.value?.classList.toggle('is-hovering', isInteractive(event.target))
  const leave = () => cursor.value?.classList.remove('is-visible', 'is-hovering')
  const click = () => {
    cursor.value?.classList.add('is-clicking')
    if (clickTimer) clearTimeout(clickTimer)
    clickTimer = setTimeout(() => cursor.value?.classList.remove('is-clicking'), 140)
  }

  window.addEventListener('mousemove', move, { passive: true })
  document.addEventListener('mouseover', over, { passive: true })
  document.addEventListener('mouseleave', leave)
  document.addEventListener('mousedown', click, { passive: true })

  cleanup = () => {
    window.removeEventListener('mousemove', move)
    document.removeEventListener('mouseover', over)
    document.removeEventListener('mouseleave', leave)
    document.removeEventListener('mousedown', click)
    if (clickTimer) clearTimeout(clickTimer)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="cursor" class="archive-cursor" aria-hidden="true">
    <span class="archive-cursor__marker"></span>
    <span class="archive-cursor__pointer"></span>
  </div>
</template>

<style>
@media (pointer: fine) {
  html,
  body,
  a,
  button,
  input,
  select,
  textarea,
  [role="button"] {
    cursor: none !important;
  }
}

.archive-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483647;
  width: 1px;
  height: 1px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.14s ease;
}

.archive-cursor.is-visible { opacity: 1; }

.archive-cursor__pointer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 43px;
  height: 52px;
  background: url('/archive-cursor-pointer.png') center / 100% 100% no-repeat;
  transform: translateX(-10px);
}

.archive-cursor__marker {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 41px;
  height: 44px;
  background: url('/archive-cursor-hover.png') center / 100% 100% no-repeat;
  opacity: 0;
  transform: translate(-50%, -30%);
  transition: opacity 0.3s ease;
}

.archive-cursor.is-hovering .archive-cursor__marker {
  opacity: 1;
}

.archive-cursor.is-clicking .archive-cursor__pointer {
  transform: translateX(-10px) scale(0.92);
}
</style>
