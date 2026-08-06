<template>
  <GenericContainer width-style="full">
    <section class="archive-not-found">
      <div class="archive-not-found__grid" aria-hidden="true"></div>

      <div class="archive-not-found__content">
        <div class="archive-not-found__panel">
          <p class="archive-not-found__eyebrow">SCHALe ARCHIVE // ERROR 404</p>
          <div class="archive-not-found__heading">
            <span class="archive-not-found__code">404</span>
            <span class="archive-not-found__title">档案检索失败</span>
          </div>
          <p class="archive-not-found__message">
            未能在当前档案库中检索到你请求的页面。<br />
            请返回指挥终端，继续浏览已归档的记录。
          </p>

          <button class="archive-not-found__action" type="button" @click="goHome">
            <span class="archive-not-found__action-mark" aria-hidden="true"></span>
            返回主档案
          </button>

          <div class="archive-not-found__status" aria-label="检索状态">
            <span>STATUS</span>
            <strong>RECORD NOT FOUND</strong>
            <i></i>
          </div>
        </div>

        <div class="archive-not-found__unit" aria-hidden="true">
          <span class="archive-not-found__unit-tag">FIELD UNIT // 01</span>
          <img src="https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/Shiroko.ca748c38.png" alt="" />
        </div>
      </div>
    </section>
  </GenericContainer>
</template>

<script lang="ts" setup>
import { useRouteLocale, useRouter } from 'vuepress/client'

import GenericContainer from '@components/GenericContainer/index.vue'

import { useThemeLocaleData } from '@composables/index.js'

const router = useRouter()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const goHome = () => {
  router.push(themeLocal.value.home || routeLocale.value)
}
</script>

<style scoped>
.archive-not-found {
  --archive-cyan: #21bbff;
  --archive-blue: #1677ff;
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 72px);
  overflow: hidden;
  background: #f7fbff;
}

.archive-not-found__grid {
  position: absolute;
  inset: 0;
  opacity: 0.48;
  background-image: linear-gradient(rgba(22, 119, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 119, 255, 0.06) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(to right, #000 0%, rgba(0, 0, 0, 0.45) 57%, transparent 100%);
}

.archive-not-found__content {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 550px) minmax(330px, 420px);
  align-items: center;
  justify-content: space-between;
  column-gap: clamp(28px, 5vw, 72px);
  width: min(1120px, calc(100% - 48px));
  min-height: 540px;
  margin: 0 auto;
}

.archive-not-found__panel {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 42px 48px 34px;
  border: 1px solid rgba(22, 119, 255, 0.24);
  border-left: 4px solid var(--archive-cyan);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 42px rgba(36, 83, 120, 0.12);
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
}

.archive-not-found__eyebrow,
.archive-not-found__unit-tag,
.archive-not-found__status span,
.archive-not-found__status strong {
  margin: 0;
  font-family: Arial, 'Microsoft YaHei', sans-serif;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.archive-not-found__eyebrow {
  color: var(--archive-blue);
  font-size: 0.67rem;
}

.archive-not-found__heading {
  display: flex;
  align-items: flex-end;
  gap: 18px;
  margin: 12px 0 16px;
}

.archive-not-found__code {
  color: var(--archive-blue);
  font-family: Arial, sans-serif;
  font-size: 5.25rem;
  font-weight: 900;
  line-height: 0.82;
}

.archive-not-found__title {
  padding-bottom: 5px;
  color: #263a4a;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 1.48rem;
  font-weight: 800;
}

.archive-not-found__message {
  margin: 0;
  color: #607485;
  font-size: 0.92rem;
  line-height: 1.9;
}

.archive-not-found__action {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 28px;
  padding: 10px 15px;
  border: 1px solid rgba(22, 119, 255, 0.42);
  border-radius: 0;
  background: rgba(33, 187, 255, 0.08);
  color: var(--archive-blue);
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.archive-not-found__action:hover {
  background: var(--archive-blue);
  color: #fff;
  transform: translateX(3px);
}

.archive-not-found__action-mark {
  width: 8px;
  height: 8px;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.archive-not-found__status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  padding-top: 13px;
  border-top: 1px solid rgba(22, 119, 255, 0.15);
  color: #7a8e9f;
  font-size: 0.56rem;
}

.archive-not-found__status strong {
  color: var(--archive-cyan);
  font-size: 0.56rem;
}

.archive-not-found__status i {
  width: 42px;
  height: 2px;
  margin-left: auto;
  background: var(--archive-cyan);
}

.archive-not-found__unit {
  position: relative;
  right: auto;
  bottom: auto;
  z-index: 1;
  justify-self: end;
  width: min(100%, 420px);
  height: 540px;
  overflow: hidden;
  border-bottom: 2px solid rgba(33, 187, 255, 0.5);
}

.archive-not-found__unit::before {
  content: '';
  position: absolute;
  right: 18px;
  bottom: 22px;
  left: 18px;
  height: 1px;
  background: rgba(22, 119, 255, 0.26);
}

.archive-not-found__unit-tag {
  position: absolute;
  z-index: 1;
  top: 18px;
  right: 22px;
  color: var(--archive-blue);
  font-size: 0.58rem;
}

.archive-not-found__unit img {
  position: absolute;
  right: -2px;
  bottom: -36px;
  width: 440px;
  height: 550px;
  object-fit: cover;
  object-position: 78% center;
  filter: drop-shadow(-18px 8px 20px rgba(35, 82, 118, 0.16));
}

:global(html.dark) .archive-not-found {
  background: #111d29;
}

:global(html.dark) .archive-not-found__grid {
  opacity: 0.24;
}

:global(html.dark) .archive-not-found__panel {
  border-color: rgba(33, 187, 255, 0.28);
  background: rgba(19, 32, 45, 0.88);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

:global(html.dark) .archive-not-found__title {
  color: #e3f1fb;
}

:global(html.dark) .archive-not-found__message {
  color: #a9bece;
}

:global(body:has(.archive-not-found) #oml2d-stage),
:global(body:has(.archive-not-found) #oml2d-tips),
:global(body:has(.archive-not-found) .aplayer) {
  display: none !important;
}

@media (max-width: 768px) {
  .archive-not-found {
    align-items: flex-start;
    min-height: calc(100vh - 58px);
  }

  .archive-not-found__content {
    display: block;
    width: min(100% - 28px, 460px);
    min-height: 0;
    padding: 58px 0 210px;
  }

  .archive-not-found__panel {
    width: auto;
    padding: 32px 25px 25px;
  }

  .archive-not-found__heading {
    gap: 12px;
  }

  .archive-not-found__code {
    font-size: 4rem;
  }

  .archive-not-found__title {
    font-size: 1.18rem;
  }

  .archive-not-found__message {
    font-size: 0.84rem;
  }

  .archive-not-found__unit {
    right: -16px;
    bottom: 0;
    width: 280px;
    height: 270px;
    opacity: 0.78;
  }

  .archive-not-found__unit-tag {
    top: 8px;
    right: 10px;
    font-size: 0.5rem;
  }

  .archive-not-found__unit img {
    right: -14px;
    bottom: -28px;
    width: 255px;
    height: 320px;
  }
}
</style>
