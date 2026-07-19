<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let modal = null

const whitelistDomains = [
  'music.163.com',
  'music.126.net',
]

const isInWhitelist = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return whitelistDomains.some(domain => urlObj.hostname.includes(domain))
  } catch (e) {
    return false
  }
}

const handleLinkClick = (event) => {
  if (event.target.closest && event.target.closest('.aplayer')) return
  if (event.target.closest && event.target.closest('[data-exclude-link-check]')) return

  const link = event.target.closest('a')
  if (!link) return

  const href = link.getAttribute('href')
  if (!href) return
  if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return

  const isLocalLink = (url) => {
    try {
      if (url.startsWith('/') && !url.startsWith('//')) return true
      const urlObj = new URL(url, window.location.origin)
      return urlObj.origin === window.location.origin
    } catch (e) {
      return false
    }
  }

  if (!isLocalLink(href) && !isInWhitelist(href)) {
    event.preventDefault()
    showModal(href)
  }
}

const showModal = (url) => {
  if (modal) {
    document.body.removeChild(modal)
    modal = null
  }

  // 解析 URL
  let domain = 'UNKNOWN'
  let path = url
  try {
    const u = new URL(url)
    domain = u.hostname.toUpperCase()
    path = u.pathname + u.search
  } catch (e) {}

  // 时间戳
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const ts = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} // ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const reqId = Math.random().toString(36).substring(2, 8).toUpperCase()
  const displayUrl = url.length > 44 ? url.substring(0, 44) + '...' : url
  const shortPath = path.length > 38 ? path.substring(0, 38) + '...' : (path || '/')

  modal = document.createElement('div')
  modal.id = 'external-link-modal'
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(200, 162, 216, 0.12), transparent 55%),
      radial-gradient(ellipse at 75% 80%, rgba(231, 115, 115, 0.15), transparent 55%),
      linear-gradient(135deg, rgba(60, 42, 30, 0.32), rgba(93, 78, 66, 0.28)),
      url('/bg1.jpg') center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    animation: extFadeIn 0.5s ease-out forwards;
    overflow: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    font-family: 'JetBrains Mono', 'SF Mono', 'Consolas', 'PingFang SC', monospace;
    color: #FAF0E6;
  `

  // 极少量精致暖色粒子
  let dotsHtml = ''
  for (let i = 0; i < 18; i++) {
    const top = Math.random() * 100
    const left = Math.random() * 100
    const delay = Math.random() * 4
    const duration = 2.5 + Math.random() * 3.5
    const size = Math.random() > 0.7 ? 3 : 1.5
    const isAccent = Math.random() > 0.5
    const color = isAccent ? '#E57373' : '#C8A2D8'
    dotsHtml += `<span class="ext-dot" style="top:${top}%; left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s; width:${size}px; height:${size}px; background:${color}; box-shadow:0 0 ${size * 4}px ${color};"></span>`
  }

  modal.innerHTML = `
    <style>
      @keyframes extFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes extFadeOut { from { opacity: 1; } to { opacity: 0; } }

      /* 网格背景 - 暖色调 */
      .ext-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(231, 115, 115, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(231, 115, 115, 0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        background-position: center center;
        z-index: 1;
        pointer-events: none;
        mask-image: radial-gradient(ellipse at center, black 25%, transparent 78%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 25%, transparent 78%);
      }

      /* 暖色扫描线 */
      @keyframes extScanLine {
        0% { transform: translateY(-100vh); opacity: 0; }
        10%, 90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      .ext-scanline {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 90px;
        background: linear-gradient(180deg, transparent, rgba(200, 162, 216, 0.1), transparent);
        z-index: 2;
        pointer-events: none;
        animation: extScanLine 7s linear infinite;
      }

      /* 粒子 */
      @keyframes extDotBlink {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
      .ext-dot {
        position: absolute;
        border-radius: 50%;
        z-index: 2;
        pointer-events: none;
        animation: extDotBlink ease-in-out infinite;
        will-change: transform, opacity;
      }

      /* 角落数据条 - 暖色调 */
      .ext-corner-info {
        position: absolute;
        font-size: 10px;
        color: rgba(200, 162, 216, 0.85);
        letter-spacing: 0.18em;
        z-index: 3;
        pointer-events: none;
        line-height: 1.7;
      }
      .ext-corner-info.tl { top: 26px; left: 30px; }
      .ext-corner-info.tr { top: 26px; right: 30px; text-align: right; }
      .ext-corner-info.bl { bottom: 26px; left: 30px; }
      .ext-corner-info.br { bottom: 26px; right: 30px; text-align: right; }
      .ext-corner-info .lbl { color: rgba(231, 115, 115, 0.95); }
      .ext-corner-info .val { color: rgba(250, 240, 230, 0.85); }

      /* 卡片 */
      @keyframes extCardIn {
        0% { transform: scale(0.92); opacity: 0; filter: blur(6px); }
        100% { transform: scale(1); opacity: 1; filter: blur(0); }
      }
      @keyframes extCardOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.92); opacity: 0; filter: blur(4px); }
      }
      .ext-card {
        position: relative;
        z-index: 10;
        width: 460px;
        max-width: 92vw;
        background: linear-gradient(160deg, rgba(50, 35, 28, 0.42), rgba(75, 55, 42, 0.38));
        border: 1px solid rgba(231, 115, 115, 0.45);
        clip-path: polygon(18px 0, 0 18px, 0 calc(100% - 18px), 18px 100%, calc(100% - 18px) 100%, 100% calc(100% - 18px), 100% 18px, 18px 0);
        box-shadow:
          0 0 0 1px rgba(200, 162, 216, 0.12),
          0 24px 70px rgba(40, 25, 15, 0.45),
          0 0 80px rgba(231, 115, 115, 0.18),
          0 0 140px rgba(200, 162, 216, 0.1);
        opacity: 0;
        animation: extCardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
        backdrop-filter: blur(8px) saturate(140%);
        -webkit-backdrop-filter: blur(8px) saturate(140%);
      }

      /* HUD 四角瞄准线 */
      .ext-hud-corner {
        position: absolute;
        width: 22px;
        height: 22px;
        z-index: 4;
        pointer-events: none;
      }
      .ext-hud-corner::before, .ext-hud-corner::after {
        content: '';
        position: absolute;
        background: #E57373;
        box-shadow: 0 0 6px rgba(231, 115, 115, 0.7);
      }
      .ext-hud-corner::before { width: 22px; height: 1.5px; }
      .ext-hud-corner::after { width: 1.5px; height: 22px; }
      .ext-hud-corner.tl { top: 10px; left: 10px; }
      .ext-hud-corner.tl::before { top: 0; left: 0; }
      .ext-hud-corner.tl::after { top: 0; left: 0; }
      .ext-hud-corner.tr { top: 10px; right: 10px; }
      .ext-hud-corner.tr::before { top: 0; right: 0; }
      .ext-hud-corner.tr::after { top: 0; right: 0; }
      .ext-hud-corner.bl { bottom: 10px; left: 10px; }
      .ext-hud-corner.bl::before { bottom: 0; left: 0; }
      .ext-hud-corner.bl::after { bottom: 0; left: 0; }
      .ext-hud-corner.br { bottom: 10px; right: 10px; }
      .ext-hud-corner.br::before { bottom: 0; right: 0; }
      .ext-hud-corner.br::after { bottom: 0; right: 0; }

      /* 顶部状态条 */
      .ext-header-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 22px;
        background: linear-gradient(90deg, rgba(231, 115, 115, 0.18), rgba(200, 162, 216, 0.15));
        border-bottom: 1px solid rgba(231, 115, 115, 0.35);
        font-size: 11px;
        letter-spacing: 0.2em;
        color: #FAF0E6;
        text-shadow: 0 1px 4px rgba(40, 25, 15, 0.8);
      }
      .ext-header-bar .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #E57373;
        border-radius: 50%;
        margin-right: 8px;
        box-shadow: 0 0 10px #E57373;
        animation: extDotBlink 1.2s ease-in-out infinite;
        vertical-align: middle;
      }
      .ext-header-bar .right {
        color: rgba(200, 162, 216, 0.95);
        font-size: 10px;
      }

      /* 主体 */
      .ext-body {
        padding: 30px 30px 24px;
        text-align: center;
      }

      /* 3D 立体钻石 - 三轴菱形 */
      @keyframes extDiamond3DRotate {
        0%   { transform: rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
        100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
      }
      @keyframes extDiamond3DWobble {
        0%, 100% { transform: rotateX(-15deg) rotateY(-20deg); }
        50%      { transform: rotateX(15deg)  rotateY(20deg); }
      }
      @keyframes extDiamondCorePulse {
        0%, 100% {
          filter: drop-shadow(0 0 14px rgba(231, 115, 115, 0.7)) drop-shadow(0 0 28px rgba(200, 162, 216, 0.4));
        }
        50% {
          filter: drop-shadow(0 0 22px rgba(231, 115, 115, 0.95)) drop-shadow(0 0 44px rgba(200, 162, 216, 0.6));
        }
      }

      .ext-diamond-wrap {
        position: relative;
        width: 90px;
        height: 90px;
        margin: 0 auto 22px;
        perspective: 600px;
        perspective-origin: center center;
        --dsize: 90px;
      }
      .ext-diamond-scene {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        animation: extDiamond3DRotate 16s linear infinite;
        will-change: transform;
      }
      .ext-diamond-scene-inner {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        animation: extDiamond3DWobble 8s ease-in-out infinite;
      }

      /* 三个互相垂直的菱形面 */
      .ext-diamond-face {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--dsize);
        height: var(--dsize);
        margin: calc(var(--dsize) / -2) 0 0 calc(var(--dsize) / -2);
        border: 1.5px solid rgba(231, 115, 115, 0.85);
        background:
          linear-gradient(135deg, rgba(231, 115, 115, 0.1), rgba(200, 162, 216, 0.08));
        box-shadow:
          0 0 18px rgba(231, 115, 115, 0.5),
          inset 0 0 18px rgba(200, 162, 216, 0.15);
        transform-style: preserve-3d;
        backface-visibility: visible;
      }
      .ext-diamond-face::before,
      .ext-diamond-face::after {
        content: '';
        position: absolute;
        background: #E57373;
        border-radius: 50%;
        box-shadow: 0 0 6px #E57373;
      }
      .ext-diamond-face::before { top: -3px; left: 50%; width: 6px; height: 6px; margin-left: -3px; }
      .ext-diamond-face::after  { bottom: -3px; left: 50%; width: 6px; height: 6px; margin-left: -3px; }

      /* XY 平面 */
      .ext-diamond-face.xy { transform: rotateZ(45deg); }
      /* XZ 平面 */
      .ext-diamond-face.xz { transform: rotateY(90deg) rotateZ(45deg); border-color: rgba(200, 162, 216, 0.85); }
      .ext-diamond-face.xz::before, .ext-diamond-face.xz::after { background: #C8A2D8; box-shadow: 0 0 6px #C8A2D8; }
      /* YZ 平面 */
      .ext-diamond-face.yz { transform: rotateX(90deg) rotateZ(45deg); border-color: rgba(255, 183, 77, 0.7); }
      .ext-diamond-face.yz::before, .ext-diamond-face.yz::after { background: #FFB74D; box-shadow: 0 0 6px #FFB74D; }

      /* 立方体顶点小球（6 个轴向端点） */
      .ext-diamond-vertex {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        margin: -2.5px 0 0 -2.5px;
        background: #FAF0E6;
        border-radius: 50%;
        box-shadow: 0 0 8px #FAF0E6, 0 0 14px rgba(231, 115, 115, 0.7);
      }
      .ext-diamond-vertex.v1 { transform: translate3d(calc(var(--dsize) / 2), 0, 0); }
      .ext-diamond-vertex.v2 { transform: translate3d(calc(var(--dsize) / -2), 0, 0); }
      .ext-diamond-vertex.v3 { transform: translate3d(0, calc(var(--dsize) / 2), 0); }
      .ext-diamond-vertex.v4 { transform: translate3d(0, calc(var(--dsize) / -2), 0); }
      .ext-diamond-vertex.v5 { transform: translate3d(0, 0, calc(var(--dsize) / 2)); background: #E57373; box-shadow: 0 0 8px #E57373; }
      .ext-diamond-vertex.v6 { transform: translate3d(0, 0, calc(var(--dsize) / -2)); background: #E57373; box-shadow: 0 0 8px #E57373; }

      /* 中央能量核心 */
      .ext-diamond-core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(var(--dsize) * 0.25);
        height: calc(var(--dsize) * 0.25);
        margin: calc(var(--dsize) * -0.125) 0 0 calc(var(--dsize) * -0.125);
        transform-style: preserve-3d;
      }
      .ext-diamond-core::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #E57373, #C8A2D8);
        transform: rotateZ(45deg);
        box-shadow:
          0 0 18px rgba(231, 115, 115, 0.85),
          0 0 36px rgba(200, 162, 216, 0.5),
          inset 0 0 8px rgba(255, 255, 255, 0.5);
        animation: extDiamondCorePulse 2.5s ease-in-out infinite;
      }

      /* 标题：暴力对比 */
      .ext-title {
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 0.12em;
        line-height: 1;
        margin: 0 0 8px;
        color: #FAF0E6;
        text-shadow: 0 2px 12px rgba(40, 25, 15, 0.95), 0 0 18px rgba(231, 115, 115, 0.5);
      }
      .ext-title .accent {
        background: linear-gradient(90deg, #E57373, #FFB74D);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .ext-subtitle {
        font-size: 11px;
        color: rgba(250, 240, 230, 0.85);
        letter-spacing: 0.2em;
        margin: 0 0 24px;
        font-weight: 500;
        text-shadow: 0 1px 4px rgba(40, 25, 15, 0.85);
      }

      /* URL 数据块 */
      .ext-info-block {
        background: rgba(40, 28, 22, 0.35);
        border: 1px solid rgba(231, 115, 115, 0.28);
        border-left: 3px solid #E57373;
        padding: 12px 14px;
        margin-bottom: 18px;
        font-size: 11.5px;
        text-align: left;
      }
      .ext-info-row {
        display: flex;
        margin-bottom: 5px;
        line-height: 1.6;
      }
      .ext-info-row:last-child { margin-bottom: 0; }
      .ext-info-row .key {
        color: rgba(200, 162, 216, 1);
        min-width: 92px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-shadow: 0 1px 3px rgba(40, 25, 15, 0.85);
      }
      .ext-info-row .val {
        color: rgba(250, 240, 230, 0.98);
        word-break: break-all;
        flex: 1;
        text-shadow: 0 1px 3px rgba(40, 25, 15, 0.85);
      }
      .ext-info-row .val.url-val a {
        color: #FFB74D;
        text-decoration: none;
        transition: color 0.3s;
      }
      .ext-info-row .val.url-val a:hover {
        color: #FAF0E6;
        text-shadow: 0 0 8px rgba(231, 115, 115, 0.7);
      }

      /* 警示 */
      .ext-warn {
        font-size: 11px;
        color: #FFD180;
        letter-spacing: 0.1em;
        margin: 0 0 22px;
        padding: 9px 13px;
        background: rgba(255, 183, 77, 0.12);
        border-left: 2px solid #FFB74D;
        text-align: left;
        line-height: 1.5;
        text-shadow: 0 1px 3px rgba(40, 25, 15, 0.85);
      }
      .ext-warn-icon {
        color: #E57373;
        margin-right: 4px;
      }

      /* 按钮 */
      .ext-buttons {
        display: flex;
        gap: 12px;
      }
      .ext-btn {
        position: relative;
        flex: 1;
        padding: 13px 16px;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.2em;
        transition: all 0.3s ease;
        overflow: hidden;
        clip-path: polygon(10px 0, 0 0, 0 calc(100% - 10px), 10px 100%, 100% 100%, 100% 10px);
        text-shadow: 0 1px 3px rgba(40, 25, 15, 0.85);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .ext-btn-cancel {
        background: linear-gradient(135deg, rgba(80, 60, 48, 0.85), rgba(60, 45, 36, 0.85));
        border: 1px solid rgba(200, 162, 216, 0.4);
        color: #FAF0E6;
      }
      .ext-btn-confirm {
        background: linear-gradient(135deg, rgba(231, 115, 115, 0.4), rgba(200, 162, 216, 0.4));
        border: 1px solid #E57373;
        color: #FAF0E6;
        box-shadow:
          0 0 20px rgba(231, 115, 115, 0.25),
          inset 0 0 20px rgba(255, 183, 77, 0.08);
      }
      .ext-btn::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
        transition: left 0.5s ease;
      }
      .ext-btn:hover::before { left: 100%; }
      .ext-btn-cancel:hover {
        background: linear-gradient(135deg, rgba(100, 75, 60, 0.95), rgba(75, 55, 45, 0.95));
        border-color: rgba(200, 162, 216, 0.85);
        box-shadow: 0 0 20px rgba(200, 162, 216, 0.3);
      }
      .ext-btn-confirm:hover {
        background: linear-gradient(135deg, rgba(231, 115, 115, 0.6), rgba(200, 162, 216, 0.5));
        box-shadow:
          0 0 30px rgba(231, 115, 115, 0.55),
          0 0 50px rgba(200, 162, 216, 0.3),
          inset 0 0 25px rgba(255, 183, 77, 0.15);
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
      }
      .ext-btn:active { transform: scale(0.98); }

      /* 底部进度条 */
      .ext-footer-bar {
        padding: 11px 22px;
        background: rgba(40, 28, 22, 0.3);
        border-top: 1px solid rgba(231, 115, 115, 0.22);
        font-size: 10px;
        letter-spacing: 0.18em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(200, 162, 216, 0.85);
      }
      .ext-progress-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ext-progress {
        width: 90px;
        height: 3px;
        background: rgba(250, 240, 230, 0.15);
        position: relative;
        overflow: hidden;
      }
      @keyframes extProgressMove {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .ext-progress::after {
        content: '';
        position: absolute;
        inset: 0;
        width: 40%;
        background: linear-gradient(90deg, transparent, #E57373, transparent);
        animation: extProgressMove 1.8s ease-in-out infinite;
      }
      .ext-blink {
        animation: extDotBlink 1s ease-in-out infinite;
        color: #E57373;
      }

      /* 平板适配 */
      @media (max-width: 768px) {
        .ext-corner-info { font-size: 9px; letter-spacing: 0.1em; line-height: 1.5; }
        .ext-corner-info.tl, .ext-corner-info.bl { left: 16px; }
        .ext-corner-info.tr, .ext-corner-info.br { right: 16px; }
        .ext-corner-info.tl, .ext-corner-info.tr { top: 16px; }
        .ext-corner-info.bl, .ext-corner-info.br { bottom: 16px; }
        .ext-card { width: 86vw; max-width: 400px; }
        .ext-title { font-size: 24px; }
        .ext-body { padding: 20px 22px 16px; }
      }

      /* 手机适配：卡片大幅压缩，保留所有装饰 */
      @media (max-width: 600px) {
        .ext-grid { background-size: 40px 40px; }
        .ext-scanline { height: 60px; }

        /* 角落数据保留，但更紧凑 */
        .ext-corner-info { font-size: 8.5px; line-height: 1.45; letter-spacing: 0.08em; }
        .ext-corner-info.tl, .ext-corner-info.bl { left: 10px; }
        .ext-corner-info.tr, .ext-corner-info.br { right: 10px; }
        .ext-corner-info.tl, .ext-corner-info.tr { top: 10px; }
        .ext-corner-info.bl, .ext-corner-info.br { bottom: 10px; }

        /* 卡片整体收窄 + 切角变小 */
        .ext-card {
          width: 82vw;
          max-width: 360px;
          clip-path: polygon(14px 0, 0 14px, 0 calc(100% - 14px), 14px 100%, calc(100% - 14px) 100%, 100% calc(100% - 14px), 100% 14px, 14px 0);
        }
        .ext-hud-corner { width: 16px; height: 16px; }
        .ext-hud-corner::before { width: 16px; }
        .ext-hud-corner::after { height: 16px; }
        .ext-hud-corner.tl, .ext-hud-corner.tr { top: 8px; }
        .ext-hud-corner.bl, .ext-hud-corner.br { bottom: 8px; }
        .ext-hud-corner.tl, .ext-hud-corner.bl { left: 8px; }
        .ext-hud-corner.tr, .ext-hud-corner.br { right: 8px; }

        /* 顶部条压缩 */
        .ext-header-bar {
          padding: 7px 14px;
          font-size: 9.5px;
          letter-spacing: 0.12em;
        }
        .ext-header-bar .right { font-size: 8.5px; }
        .ext-header-bar .dot { width: 6px; height: 6px; margin-right: 6px; }

        /* 主体大幅压缩：减少 padding 让卡片变短 */
        .ext-body { padding: 16px 16px 14px; }

        /* 菱形小一圈 */
        .ext-diamond-wrap { width: 64px; height: 64px; margin: 0 auto 10px; --dsize: 64px; }

        /* 标题更小 */
        .ext-title {
          font-size: 18px;
          letter-spacing: 0.06em;
          margin: 0 0 4px;
        }
        .ext-subtitle {
          font-size: 9px;
          letter-spacing: 0.1em;
          margin: 0 0 12px;
        }

        /* 信息块紧凑 */
        .ext-info-block {
          padding: 8px 10px;
          margin-bottom: 10px;
          font-size: 10px;
        }
        .ext-info-row { margin-bottom: 3px; line-height: 1.45; }
        .ext-info-row .key { min-width: 58px; font-size: 9px; letter-spacing: 0.06em; }
        .ext-info-row .val { font-size: 10px; }

        /* 警示压缩 */
        .ext-warn {
          font-size: 9px;
          padding: 6px 10px;
          margin: 0 0 12px;
          line-height: 1.45;
        }

        /* 按钮紧凑 */
        .ext-buttons { gap: 8px; }
        .ext-btn {
          padding: 10px 12px;
          font-size: 10.5px;
          letter-spacing: 0.15em;
          clip-path: polygon(8px 0, 0 0, 0 calc(100% - 8px), 8px 100%, 100% 100%, 100% 8px);
        }

        /* 底部条压缩 */
        .ext-footer-bar {
          padding: 7px 14px;
          font-size: 8.5px;
          letter-spacing: 0.1em;
        }
        .ext-progress { width: 50px; }
      }

      /* 超小屏（iPhone SE 等） */
      @media (max-width: 380px) {
        .ext-card { width: 88vw; }
        .ext-title { font-size: 16px; letter-spacing: 0.04em; }
        .ext-body { padding: 14px 12px 12px; }
        .ext-diamond-wrap { width: 52px; height: 52px; margin: 0 auto 8px; --dsize: 52px; }
        .ext-info-row .key { min-width: 50px; font-size: 8.5px; }
        .ext-info-row .val { font-size: 9.5px; }
        .ext-info-block { padding: 7px 9px; font-size: 9.5px; }
        .ext-warn { padding: 5px 9px; font-size: 8.5px; margin-bottom: 10px; }
        .ext-btn { padding: 9px 10px; font-size: 9.5px; letter-spacing: 0.1em; }
        .ext-header-bar { padding: 6px 12px; font-size: 9px; }
        .ext-footer-bar { padding: 6px 12px; font-size: 8px; }
        .ext-corner-info { font-size: 8px; }
      }

      /* 横屏手机适配 */
      @media (max-height: 500px) and (orientation: landscape) {
        .ext-card { width: 90vw; max-width: 520px; }
        .ext-body { padding: 14px 22px 12px; }
        .ext-diamond-wrap { width: 52px; height: 52px; margin: 0 auto 8px; --dsize: 52px; }
        .ext-title { font-size: 18px; margin: 0 0 4px; }
        .ext-subtitle { margin: 0 0 10px; }
        .ext-info-block { margin-bottom: 10px; padding: 7px 10px; }
        .ext-warn { margin: 0 0 10px; padding: 5px 9px; }
        .ext-btn { padding: 9px 12px; }
        .ext-corner-info { font-size: 8px; }
      }
    </style>

    <!-- 背景层 -->
    <div class="ext-grid"></div>
    <div class="ext-scanline"></div>
    ${dotsHtml}

    <!-- 角落数据 -->
    <div class="ext-corner-info tl">
      <div><span class="lbl">SYS://</span> <span class="val">OUTBOUND_GATEWAY</span></div>
      <div><span class="lbl">VER://</span> <span class="val">2.7.4-ANIMU</span></div>
    </div>
    <div class="ext-corner-info tr">
      <div><span class="val">${ts}</span></div>
      <div><span class="lbl">REQ://</span> <span class="val">${reqId}</span></div>
    </div>
    <div class="ext-corner-info bl">
      <div><span class="lbl">ZONE://</span> <span class="val">EXTERNAL</span></div>
      <div><span class="lbl">PROTO://</span> <span class="val">HTTPS</span></div>
    </div>
    <div class="ext-corner-info br">
      <div><span class="lbl">STATUS://</span> <span class="val">WAIT_AUTH</span></div>
      <div><span class="lbl">ENC://</span> <span class="val">TLS-1.3</span></div>
    </div>

    <!-- 主卡片 -->
    <div class="ext-card">
      <span class="ext-hud-corner tl"></span>
      <span class="ext-hud-corner tr"></span>
      <span class="ext-hud-corner bl"></span>
      <span class="ext-hud-corner br"></span>

      <!-- 顶部条 -->
      <div class="ext-header-bar">
        <span><span class="dot"></span>SECURITY ALERT</span>
        <span class="right">// COORD LOCKED</span>
      </div>

      <!-- 主体 -->
      <div class="ext-body">
        <!-- 立体钻石 -->
        <div class="ext-diamond-wrap">
          <div class="ext-diamond-scene">
            <div class="ext-diamond-scene-inner">
              <!-- 三个互相垂直的菱形面 -->
              <div class="ext-diamond-face xy"></div>
              <div class="ext-diamond-face xz"></div>
              <div class="ext-diamond-face yz"></div>
              <!-- 立方体顶点装饰 -->
              <div class="ext-diamond-vertex v1"></div>
              <div class="ext-diamond-vertex v2"></div>
              <div class="ext-diamond-vertex v3"></div>
              <div class="ext-diamond-vertex v4"></div>
              <div class="ext-diamond-vertex v5"></div>
              <div class="ext-diamond-vertex v6"></div>
              <!-- 中央能量核心 -->
              <div class="ext-diamond-core"></div>
            </div>
          </div>
        </div>

        <h2 class="ext-title"><span class="accent">OUTBOUND</span> REQUEST</h2>
        <p class="ext-subtitle">// 检测到外部坐标 · 等待授权</p>

        <!-- 信息块 -->
        <div class="ext-info-block">
          <div class="ext-info-row">
            <span class="key">HOST://</span>
            <span class="val">${domain}</span>
          </div>
          <div class="ext-info-row">
            <span class="key">PATH://</span>
            <span class="val">${shortPath}</span>
          </div>
          <div class="ext-info-row">
            <span class="key">URL://</span>
            <span class="val url-val"><a href="${url}" target="_blank" rel="noopener">${displayUrl}</a></span>
          </div>
        </div>

        <!-- 警示 -->
        <div class="ext-warn">
          <span class="ext-warn-icon">▲</span>NOTICE: 该坐标位于主网之外，请确认目标安全性后再授权跳转
        </div>

        <!-- 按钮 -->
        <div class="ext-buttons">
          <button id="cancel-btn" class="ext-btn ext-btn-cancel">// ABORT</button>
          <button id="confirm-btn" class="ext-btn ext-btn-confirm">// AUTHORIZE →</button>
        </div>
      </div>

      <!-- 底部条 -->
      <div class="ext-footer-bar">
        <span>SHIYI://GATEWAY</span>
        <div class="ext-progress-wrap">
          <span class="ext-blink">●</span>
          <span>AWAITING</span>
          <div class="ext-progress"></div>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)
  // 锁定背景滚动
  document.body.style.overflow = 'hidden'

  const cancelBtn = modal.querySelector('#cancel-btn')
  const confirmBtn = modal.querySelector('#confirm-btn')

  const closeModalWithAnimation = () => {
    if (!modal) return;
    const card = modal.querySelector('.ext-card')
    if (card) {
      card.style.animation = 'extCardOut 0.3s ease-out forwards'
    }
    modal.style.animation = 'extFadeOut 0.3s ease-out forwards'
    setTimeout(() => {
      if (modal && modal.parentNode) {
        document.body.removeChild(modal)
      }
      // 恢复背景滚动
      document.body.style.overflow = ''
      modal = null
    }, 300)
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => closeModalWithAnimation())
  }
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      window.open(url, '_blank', 'noopener,noreferrer')
      closeModalWithAnimation()
    })
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalWithAnimation()
  })

  const escHandler = (e) => {
    if (e.key === 'Escape' && modal) {
      closeModalWithAnimation()
      document.removeEventListener('keydown', escHandler)
    }
  }
  document.addEventListener('keydown', escHandler)
}

onMounted(() => {
  document.addEventListener('click', handleLinkClick, false)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleLinkClick, false)
  document.body.style.overflow = ''
  if (modal) {
    if (modal.parentNode) {
      document.body.removeChild(modal)
    }
    modal = null
  }
})
</script>

<template>
  <!-- 此组件不需要渲染任何内容 -->
</template>
