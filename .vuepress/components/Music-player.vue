<template>
  <div class="stardust-player" :class="{ expanded, playing: isPlaying }">
    <!-- 粒子层：播放时蓝色星屑 + 音符飘出 -->
    <div class="particles" aria-hidden="true">
      <span
        v-for="p in particles"
        :key="p.id"
        :class="['particle', p.type]"
        :style="{
          left: p.left + '%',
          animationDelay: p.delay + 's',
          animationDuration: p.dur + 's',
          '--x': p.x,
        }"
        >{{ p.type === 'note' ? p.char : '' }}</span
      >
    </div>

    <!-- 收起态：旋转黑胶唱片 + BA 光环 -->
    <div class="record-pod" @click="toggleExpand" title="点击展开">
      <div class="ba-halo" :class="{ active: isPlaying }">
        <div class="halo-arc"></div>
        <div class="halo-ring"></div>
        <div class="halo-ring-inner"></div>
        <span class="halo-node n"></span>
        <span class="halo-node e"></span>
        <span class="halo-node s"></span>
        <span class="halo-node w"></span>
        <span class="halo-diamond"></span>
      </div>
      <div class="vinyl" :class="{ spinning: isPlaying }">
        <img class="vinyl-label" :src="current.pic" alt="" @error="onImgError" />
        <span class="vinyl-hole"></span>
      </div>
      <span class="status-badge" v-show="!expanded">{{
        isPlaying ? '♪' : 'zz'
      }}</span>
    </div>

    <!-- 展开态：玻璃拟态面板 -->
    <transition name="expand">
      <div v-if="expanded" class="panel" :class="{ 'lyrics-mode': view === 'lyric' }" @click.stop>
        <div class="panel-head">
          <div class="np-wrap">
            <span class="np-dot" :class="{ live: isPlaying }"></span>
            <span class="now-playing">{{ isPlaying ? '再生中' : '一時停止' }}</span>
          </div>
          <button class="collapse-btn" @click="expanded = false" title="收起">
            ✕
          </button>
        </div>

        <div class="player-body">
          <div class="song-summary">
            <div class="art-frame">
              <div class="art-wrap">
                <img class="art" :src="current.pic" alt="" @error="onImgError" />
                <span class="corner tl"></span>
                <span class="corner tr"></span>
                <span class="corner bl"></span>
                <span class="corner br"></span>
              </div>
            </div>

            <div class="meta">
              <div class="song-title">{{ current.title }}</div>
              <div class="song-artist">{{ current.artist }}</div>
              <div class="meta-line"></div>
            </div>
          </div>

          <div class="content-pane">
            <div class="view-tabs" role="tablist" aria-label="播放器视图">
              <button class="v-tab" :class="{ on: view === 'lyric' }" @click.stop="view = 'lyric'">
                歌詞
              </button>
              <button class="v-tab" :class="{ on: view === 'list' }" @click.stop="view = 'list'">
                トラック
              </button>
              <span class="tl-count">{{
                view === 'list' ? list.length : lyricLines.length
              }}</span>
            </div>

            <div
              v-show="view === 'lyric'"
              ref="lyricsRef"
              class="lyrics"
              @wheel.passive="onLyricsUserScroll"
              @touchmove.passive="onLyricsUserScroll"
            >
              <template v-if="lyricLines.length">
                <div
                  v-for="(line, i) in lyricLines"
                  :key="i"
                  class="lyric-line"
                  :class="{ active: i === activeLyric }"
                  @click.stop="seekToLyric(line.time)"
                >
                  <p class="l-text">{{ line.text }}</p>
                  <p v-if="line.trans" class="l-trans">{{ line.trans }}</p>
                </div>
              </template>
              <div v-else class="lyric-empty">歌詞が見つかりませんでした ♪</div>
            </div>

            <ul class="tracklist" v-show="view === 'list'">
              <li
                v-for="(s, i) in list"
                :key="i"
                :class="{ active: i === currentIndex }"
                @click.stop="goto(i)"
              >
                <div class="t-thumb-wrap">
                  <img class="t-thumb" :src="s.pic" alt="" @error="onImgError" />
                </div>
                <div class="t-info">
                  <span class="t-title">{{ s.title }}</span>
                  <span class="t-artist">{{ s.artist }}</span>
                </div>
                <span class="t-eq" v-if="i === currentIndex && isPlaying">
                  <i></i><i></i><i></i>
                </span>
                <span class="t-star" v-else-if="i === currentIndex">✦</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="transport">
          <div class="timeline">
            <span>{{ formatTime(currentTime) }}</span>
            <div class="progress" @click.stop="seek">
              <div class="progress-fill" :style="{ width: progressPercent + '%' }">
                <span class="progress-knob"></span>
              </div>
            </div>
            <span>{{ formatTime(duration) }}</span>
          </div>

          <div class="controls">
            <button class="ctrl-btn" @click.stop="goto(currentIndex - 1)" title="上一首">
              ⏮
            </button>
            <button class="play-btn" :class="{ playing: isPlaying }" @click.stop="togglePlay">
              <span class="play-icon">{{ isPlaying ? '❚❚' : '▶' }}</span>
            </button>
            <button class="ctrl-btn" @click.stop="goto(currentIndex + 1)" title="下一首">
              ⏭
            </button>
          </div>
        </div>
      </div>
    </transition>

    <audio
      ref="audioRef"
      :src="current.src"
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="onEnded"
      @timeupdate="currentTime = $event.target.currentTime"
      @loadedmetadata="duration = $event.target.duration"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { SONG_LYRICS } from '../data/song-lyrics'

const list = [
  {
    id: 2019092913,
    title: 'Zenith',
    artist: 'KARAKURI',
    src: 'https://music.163.com/song/media/outer/url?id=2019092913',
    pic: 'https://p3.music.126.net/wGqRIS6kYizTDXIn3tWsAA==/109951168277970190.jpg?param=300x300',
  },
  {
    id: 1960160744,
    title: 'disco light',
    artist: 'ShibayanRecords',
    src: 'https://music.163.com/song/media/outer/url?id=1960160744',
    pic: 'https://p2.music.126.net/8xbS3r5CLdgvV_ObMidiGw==/109951167604592544.jpg?param=90y90',
  },
  {
    id: 1840237913,
    title: 'moremoremore',
    artist: '中村さんそ',
    src: 'https://music.163.com/song/media/outer/url?id=1840237913',
    pic: 'https://p1.music.126.net/NmQw4g1fbkt91EJFLXNTsg==/109951165924052279.jpg?param=90x90',
  },
  {
    id: 2735484466,
    title: 'モニタリング (Best Friend Remix)',
    artist: 'DECO*27 / 初音ミク',
    src: 'https://music.163.com/song/media/outer/url?id=2735484466',
    pic: 'https://p1.music.126.net/MS2OJ66gPnSUPST4GrXUKw==/109951171841383870.jpg?param=300x300',
  },
]

const currentIndex = ref(0)
const current = computed(() => list[currentIndex.value])
const isPlaying = ref(false)
const expanded = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const pendingPlay = ref(false)
const audioRef = ref(null)

const progressPercent = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
)

/* ===== 歌词：LRC 解析 + 逐行同步 ===== */
// 面板下方视图：曲目列表 / 歌词
const view = ref('list')
const activeLyric = ref(-1)
const lyricsRef = ref(null)
let userScrollTimer = null
let lyricUserScrolling = false

// 兼容 [mm:ss.xx] [mm:ss.xxx] [mm:ss:xx] 三种时间戳写法
function parseLrc(lrc) {
  const out = []
  if (!lrc) return out
  const re = /\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g
  for (const raw of String(lrc).split(/\r?\n/)) {
    const text = raw.replace(re, '').trim()
    if (!text) continue
    let m
    re.lastIndex = 0
    while ((m = re.exec(raw))) {
      const frac = m[3] ? parseFloat('0.' + m[3]) : 0
      out.push({ time: +m[1] * 60 + +m[2] + frac, text })
    }
  }
  return out.sort((a, b) => a.time - b.time)
}

// 原文按时间戳对齐翻译（误差 0.6s 内视为同一行）
const lyricLines = computed(() => {
  const data = SONG_LYRICS[current.value.id]
  if (!data) return []
  const main = parseLrc(data.lyric)
  const trans = parseLrc(data.trans)
  return main.map((l) => {
    const t = trans.find((x) => Math.abs(x.time - l.time) < 0.6)
    return { time: l.time, text: l.text, trans: t ? t.text : '' }
  })
})

// 二分查找当前时间对应的歌词行
watch(currentTime, (t) => {
  const arr = lyricLines.value
  if (!arr.length) {
    activeLyric.value = -1
    return
  }
  let lo = 0
  let hi = arr.length - 1
  let ans = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid].time <= t + 0.15) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  activeLyric.value = ans
})

// 用户手动滚动歌词时，暂停自动跟随 3 秒
function onLyricsUserScroll() {
  lyricUserScrolling = true
  clearTimeout(userScrollTimer)
  userScrollTimer = setTimeout(() => {
    lyricUserScrolling = false
  }, 3000)
}

function scrollLyricTo(idx, behavior) {
  const wrap = lyricsRef.value
  if (!wrap || idx < 0) return
  const el = wrap.children[idx]
  if (!el) return
  wrap.scrollTo({
    top: el.offsetTop - wrap.clientHeight / 2 + el.clientHeight / 2,
    behavior,
  })
}

// 当前行变化时平滑滚动居中；切换到歌词视图时立即定位
watch(activeLyric, (idx) => {
  if (view.value !== 'lyric' || lyricUserScrolling) return
  scrollLyricTo(idx, 'smooth')
})
watch(view, (v) => {
  if (v === 'lyric') nextTick(() => scrollLyricTo(activeLyric.value, 'auto'))
})

// 点击歌词行跳转播放进度
function seekToLyric(time) {
  const el = audioRef.value
  if (!el || !el.duration || isNaN(time)) return
  el.currentTime = time
  currentTime.value = time
}

const noteChars = ['♪', '♫', '♩', '♬']
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  type: i % 2 === 0 ? 'petal' : 'note',
  left: 5 + Math.random() * 90,
  delay: Math.random() * 6,
  dur: 5 + Math.random() * 4,
  x: (Math.random() * 80 - 40).toFixed(0) + 'px',
  char: noteChars[i % noteChars.length],
}))

function togglePlay() {
  const el = audioRef.value
  if (!el) return
  if (isPlaying.value) {
    el.pause()
  } else {
    el.play().catch(() => {})
  }
}

function goto(idx) {
  pendingPlay.value = isPlaying.value || pendingPlay.value
  currentIndex.value = (idx + list.length) % list.length
}

function onEnded() {
  pendingPlay.value = true
  currentIndex.value = (currentIndex.value + 1) % list.length
}

watch(currentIndex, () => {
  const el = audioRef.value
  if (!el) return
  duration.value = 0
  currentTime.value = 0
  nextTick(() => {
    el.load()
    if (pendingPlay.value) {
      pendingPlay.value = false
      el.play().catch(() => {})
    }
  })
})

function seek(e) {
  const el = audioRef.value
  if (!el || !duration.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  el.currentTime = ratio * duration.value
}

function formatTime(s) {
  if (!s || isNaN(s)) return '00:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function toggleExpand() {
  expanded.value = !expanded.value
}

function onImgError(e) {
  e.target.style.visibility = 'hidden'
}

function onClickOutside(e) {
  if (expanded.value && !e.target.closest('.stardust-player')) {
    expanded.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
/* ===== 碧蓝档案配色 ===== */
.stardust-player {
  position: fixed;
  right: 22px;
  bottom: 120px;
  z-index: 9998;
  font-family: 'Noto Sans SC', 'Noto Sans CJK SC', sans-serif;
  --ba-cyan: #21bbff;
  --ba-blue: #1677ff;
  --ba-light: #7fdfff;
  --ba-deep: #0e8fd9;
  --ba-muted: #6d9ab5;
}

/* ===== 粒子层 ===== */
.particles {
  position: absolute;
  right: 0;
  bottom: 30px;
  width: 130px;
  height: 200px;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s;
}
.stardust-player.playing .particles {
  opacity: 1;
}
.particle {
  position: absolute;
  bottom: 0;
  opacity: 0;
}
.particle.note {
  color: var(--ba-cyan);
  font-size: 15px;
  text-shadow: 0 0 6px rgba(33, 187, 255, 0.7);
  animation: note-rise 6s linear infinite;
}
.particle.petal {
  width: 7px;
  height: 7px;
  background: linear-gradient(135deg, var(--ba-light), var(--ba-blue));
  box-shadow: 0 0 6px rgba(33, 187, 255, 0.8);
  animation: petal-swirl 7s linear infinite;
}
@keyframes note-rise {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), -190px) rotate(360deg);
  }
}
@keyframes petal-swirl {
  0% {
    opacity: 0;
    transform: translate(0, -10px) rotate(45deg);
  }
  15% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), 180px) rotate(405deg);
  }
}

/* ===== 黑胶唱片 ===== */
.record-pod {
  position: relative;
  width: 92px;
  height: 92px;
  cursor: pointer;
  z-index: 2;
  animation: float 3.2s ease-in-out infinite alternate;
}
@keyframes float {
  to {
    transform: translateY(-10px);
  }
}

/* BA 光环：倾斜旋转的发光环（分段弧 + 双环 + 中心菱形） */
.ba-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 134px;
  height: 134px;
  margin: -67px 0 0 -67px;
  opacity: 0.5;
  transition: opacity 0.4s;
  animation: halo-tilt-spin 8s linear infinite;
  transform-style: preserve-3d;
}
.ba-halo.active {
  opacity: 1;
}
@keyframes halo-tilt-spin {
  from {
    transform: rotateX(68deg) rotateZ(0deg);
  }
  to {
    transform: rotateX(68deg) rotateZ(360deg);
  }
}

/* 分段弧：4 段亮弧 + 4 段缺口，最 BA 的特征 */
.halo-arc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    var(--ba-cyan) 0deg 52deg,
    transparent 52deg 90deg,
    var(--ba-cyan) 90deg 142deg,
    transparent 142deg 180deg,
    var(--ba-cyan) 180deg 232deg,
    transparent 232deg 270deg,
    var(--ba-cyan) 270deg 322deg,
    transparent 322deg 360deg
  );
  -webkit-mask: radial-gradient(
    circle,
    transparent 56%,
    #000 58%,
    #000 70%,
    transparent 72%
  );
  mask: radial-gradient(
    circle,
    transparent 56%,
    #000 58%,
    #000 70%,
    transparent 72%
  );
  filter: drop-shadow(0 0 6px rgba(33, 187, 255, 0.8));
}

/* 外环：细亮实线 */
.halo-ring {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 1.5px solid var(--ba-cyan);
  box-shadow: 0 0 10px rgba(33, 187, 255, 0.6);
  opacity: 0.85;
}
/* 内环：更细 */
.halo-ring-inner {
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  border: 1px solid rgba(127, 223, 255, 0.55);
}

.halo-node {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ba-light);
  box-shadow: 0 0 8px var(--ba-cyan);
}
.halo-node.n {
  top: 1px;
  left: 50%;
  margin-left: -3px;
}
.halo-node.s {
  bottom: 1px;
  left: 50%;
  margin-left: -3px;
}
.halo-node.e {
  right: 1px;
  top: 50%;
  margin-top: -3px;
}
.halo-node.w {
  left: 1px;
  top: 50%;
  margin-top: -3px;
}
/* 中心菱形（小四角星） */
.halo-diamond {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  background: var(--ba-cyan);
  transform: rotate(45deg);
  box-shadow: 0 0 10px var(--ba-cyan);
  opacity: 0.7;
}

.vinyl {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at center,
    #121212 0px,
    #121212 2px,
    #1d1d1d 2px,
    #1d1d1d 3px
  );
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45),
    inset 0 0 0 2px rgba(255, 255, 255, 0.04);
}
.vinyl.spinning {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44%;
  height: 44%;
  border-radius: 50%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 3px var(--ba-cyan), 0 0 12px rgba(33, 187, 255, 0.7);
}
.vinyl-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  transform: translate(-50%, -50%);
  z-index: 3;
}

.status-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border-radius: 11px;
  background: linear-gradient(135deg, var(--ba-cyan), var(--ba-blue));
  color: #fff;
  font-size: 11px;
  line-height: 22px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.5);
}

/* ===== 玻璃面板（BA 卡片） ===== */
.panel {
  position: absolute;
  right: 0;
  bottom: 108px;
  width: 300px;
  padding: 16px 16px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.82);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(33, 187, 255, 0.35);
  box-shadow: 0 16px 44px rgba(22, 119, 255, 0.22);
  z-index: 3;
  overflow: hidden;
}
/* 顶部 BA 青色光带 */
.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--ba-cyan) 30%,
    var(--ba-blue) 70%,
    transparent
  );
  box-shadow: 0 0 8px var(--ba-cyan);
}

/* 头部 */
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.np-wrap {
  display: flex;
  align-items: center;
  gap: 7px;
}
.np-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ba-muted);
}
.np-dot.live {
  background: var(--ba-cyan);
  box-shadow: 0 0 8px var(--ba-cyan);
  animation: np-pulse 1.4s ease-in-out infinite;
}
@keyframes np-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
.now-playing {
  font-size: 11.5px;
  color: var(--ba-blue);
  letter-spacing: 0.06em;
}
.collapse-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 7px;
  background: rgba(33, 187, 255, 0.14);
  color: var(--ba-blue);
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s;
}
.collapse-btn:hover {
  background: rgba(33, 187, 255, 0.32);
}

/* 封面外框（BA 立绘容器感） */
.art-frame {
  width: 116px;
  margin: 0 auto 12px;
  padding: 3px;
  border-radius: 16px;
  background: linear-gradient(
    160deg,
    rgba(33, 187, 255, 0.55),
    rgba(22, 119, 255, 0.15)
  );
  box-shadow: 0 8px 22px rgba(22, 119, 255, 0.25);
}
.art-wrap {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto;
}
.art {
  width: 100%;
  height: 100%;
  border-radius: 13px;
  object-fit: cover;
  display: block;
}
.art-mood {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 15px;
  line-height: 30px;
  text-align: center;
  z-index: 2;
}
/* BA 卡片风直角括号 */
.corner {
  position: absolute;
  width: 11px;
  height: 11px;
  border: 2px solid var(--ba-cyan);
  filter: drop-shadow(0 0 3px rgba(33, 187, 255, 0.6));
  z-index: 2;
}
.corner.tl {
  top: -4px;
  left: -4px;
  border-right: none;
  border-bottom: none;
}
.corner.tr {
  top: -4px;
  right: -4px;
  border-left: none;
  border-bottom: none;
}
.corner.bl {
  bottom: -4px;
  left: -4px;
  border-right: none;
  border-top: none;
}
.corner.br {
  bottom: -4px;
  right: -4px;
  border-left: none;
  border-top: none;
}

/* 标题区 */
.meta {
  text-align: center;
  margin-bottom: 14px;
}
.meta.compact {
  margin-bottom: 8px;
}
.song-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--ba-deep);
  margin-bottom: 2px;
}
.song-artist {
  font-size: 12px;
  color: var(--ba-muted);
}
/* 标题下装饰短线（BA 分隔） */
.meta-line {
  width: 28px;
  height: 2px;
  margin: 7px auto 0;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--ba-cyan), var(--ba-blue));
  box-shadow: 0 0 5px rgba(33, 187, 255, 0.6);
}

/* 进度条 */
.progress {
  height: 6px;
  margin: 0 2px 6px;
  border-radius: 3px;
  background: rgba(33, 187, 255, 0.18);
  cursor: pointer;
}
.progress-fill {
  position: relative;
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--ba-cyan), var(--ba-blue));
  box-shadow: 0 0 8px rgba(33, 187, 255, 0.6);
}
.progress-knob {
  position: absolute;
  right: -5px;
  top: 50%;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px var(--ba-cyan);
  transform: translateY(-50%);
}
.time {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ba-muted);
  font-variant-numeric: tabular-nums;
  margin-bottom: 12px;
}

/* 控制按钮区 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}
/* 上下首：BA 亮面胶囊按钮 */
.ctrl-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
      rgba(127, 223, 255, 0.35) 0%,
      rgba(33, 187, 255, 0.18) 100%
  );
  border: 1px solid rgba(33, 187, 255, 0.3);
  color: var(--ba-blue);
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.ctrl-btn:hover {
  background: linear-gradient(
    180deg,
    rgba(127, 223, 255, 0.55) 0%,
    rgba(33, 187, 255, 0.3) 100%
  );
  transform: translateY(-2px);
}
.ctrl-btn:active {
  transform: scale(0.92);
}
/* BA 风格亮面蓝主按钮 */
.play-btn {
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(180deg, #5ec8ff 0%, var(--ba-blue) 55%, #0e7bd9 100%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(22, 119, 255, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: transform 0.2s;
  position: relative;
}
.play-btn:active {
  transform: scale(0.92);
}
.play-btn.playing::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(33, 187, 255, 0.5);
  animation: ripple 1.6s ease-out infinite;
}
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
.play-icon {
  display: inline-block;
}

/* ===== 曲目列表（BA 六边形头像框） ===== */
.tracklist-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--ba-blue);
  margin: 4px 2px 8px;
  text-transform: uppercase;
}
.tl-diamond {
  width: 7px;
  height: 7px;
  background: var(--ba-cyan);
  transform: rotate(45deg);
  box-shadow: 0 0 6px var(--ba-cyan);
}
.tl-count {
  margin-left: auto;
  font-size: 10px;
  color: var(--ba-muted);
  background: rgba(33, 187, 255, 0.12);
  padding: 1px 7px;
  border-radius: 8px;
}
/* 视图切换标签（列表 / 歌词） */
.v-tab {
  border: none;
  background: rgba(33, 187, 255, 0.1);
  color: var(--ba-muted);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  padding: 3px 9px;
  border-radius: 9px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, box-shadow 0.2s;
}
.v-tab:hover {
  color: var(--ba-blue);
  background: rgba(33, 187, 255, 0.2);
}
.v-tab.on {
  color: #fff;
  background: linear-gradient(135deg, var(--ba-cyan), var(--ba-blue));
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.4);
}
.tracklist {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 168px;
  overflow-y: auto;
}
.tracklist::-webkit-scrollbar {
  width: 4px;
}
.tracklist::-webkit-scrollbar-thumb {
  background: rgba(33, 187, 255, 0.4);
  border-radius: 2px;
}
.tracklist li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px 7px 10px;
  margin-bottom: 5px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.tracklist li:hover {
  background: rgba(33, 187, 255, 0.08);
}
.tracklist li.active {
  background: linear-gradient(
    90deg,
    rgba(33, 187, 255, 0.2),
    rgba(33, 187, 255, 0.04)
  );
  border-color: rgba(33, 187, 255, 0.45);
}
/* 选中态左侧青色光条 */
.tracklist li.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18%;
  bottom: 18%;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--ba-cyan);
  box-shadow: 0 0 8px var(--ba-cyan);
}

/* BA 六边形头像框 */
.t-thumb-wrap {
  width: 38px;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ba-cyan);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: filter 0.2s;
}
.tracklist li.active .t-thumb-wrap {
  filter: drop-shadow(0 0 5px rgba(33, 187, 255, 0.9));
}
.t-thumb {
  width: 86%;
  height: 86%;
  object-fit: cover;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.t-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.t-title {
  font-size: 12.5px;
  color: #445;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tracklist li.active .t-title {
  color: var(--ba-blue);
  font-weight: 600;
}
.t-artist {
  font-size: 10px;
  color: var(--ba-muted);
}
/* 播放中频谱 */
.t-eq {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}
.t-eq i {
  display: inline-block;
  width: 2.5px;
  background: var(--ba-cyan);
  border-radius: 1px;
  animation: eq-bounce 0.8s ease-in-out infinite;
}
.t-eq i:nth-child(1) {
  height: 8px;
  animation-delay: 0s;
}
.t-eq i:nth-child(2) {
  height: 14px;
  animation-delay: 0.2s;
}
.t-eq i:nth-child(3) {
  height: 10px;
  animation-delay: 0.4s;
}
/* 当前曲目（暂停时）BA 星标 */
.t-star {
  color: var(--ba-cyan);
  font-size: 13px;
  text-shadow: 0 0 6px var(--ba-cyan);
}
@keyframes eq-bounce {
  0%,
  100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
}

/* ===== 歌词视图 ===== */
.lyrics {
  position: relative; /* 作为 offsetTop 定位基准 */
  max-height: 168px;
  overflow-y: auto;
  padding: 4px 2px;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(
    transparent,
    #000 15%,
    #000 85%,
    transparent
  );
  mask-image: linear-gradient(transparent, #000 15%, #000 85%, transparent);
}
.lyrics-mode .lyrics {
  max-height: 210px;
  margin: 0 -3px 10px;
  padding: 12px 5px;
  border-top: 1px solid rgba(33, 187, 255, 0.14);
  border-bottom: 1px solid rgba(33, 187, 255, 0.14);
  background: rgba(33, 187, 255, 0.035);
}
.lyrics::-webkit-scrollbar {
  width: 0;
  display: none;
}
.lyric-line {
  padding: 6px 8px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  opacity: 0.45;
  transform: scale(0.96);
  transition: opacity 0.3s, transform 0.3s, background 0.2s;
}
.lyric-line:hover {
  opacity: 0.8;
  background: rgba(33, 187, 255, 0.08);
}
.lyric-line.active {
  opacity: 1;
  transform: scale(1);
  background: linear-gradient(
    90deg,
    rgba(33, 187, 255, 0.16),
    rgba(33, 187, 255, 0.02)
  );
}
.l-text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: #445;
  transition: color 0.3s;
}
.lyric-line.active .l-text {
  color: var(--ba-blue);
  font-weight: 600;
  text-shadow: 0 0 8px rgba(33, 187, 255, 0.45);
}
.l-trans {
  margin: 1px 0 0;
  font-size: 10.5px;
  line-height: 1.45;
  color: var(--ba-muted);
}
.lyric-empty {
  padding: 30px 0;
  text-align: center;
  font-size: 12px;
  color: var(--ba-muted);
}

/* ===== 横向播放台：摘要、内容与控制区分层 ===== */
.panel {
  right: 112px;
  bottom: 0;
  width: 520px;
  padding: 14px;
  border-radius: 8px;
  background: rgba(248, 252, 255, 0.94);
  box-shadow: 0 18px 48px rgba(22, 72, 112, 0.22);
}
.panel-head {
  margin-bottom: 12px;
}
.player-body {
  display: grid;
  grid-template-columns: 136px minmax(0, 1fr);
  gap: 16px;
  min-height: 220px;
}
.song-summary {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border-right: 1px solid rgba(33, 187, 255, 0.16);
}
.song-summary .art-frame {
  width: 116px;
  margin: 0 0 14px;
}
.song-summary .meta {
  width: 100%;
  margin: 0;
  padding-right: 10px;
}
.song-summary .song-title,
.song-summary .song-artist {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content-pane {
  display: flex;
  min-width: 0;
  height: 220px;
  flex-direction: column;
}
.view-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 32px;
  margin-bottom: 6px;
  padding: 3px;
  border-radius: 6px;
  background: rgba(33, 187, 255, 0.07);
}
.view-tabs .v-tab {
  height: 26px;
  padding: 0 10px;
  border-radius: 4px;
  background: transparent;
  box-shadow: none;
  letter-spacing: 0;
}
.view-tabs .v-tab.on {
  color: var(--ba-blue);
  background: #fff;
  box-shadow: 0 2px 7px rgba(22, 119, 255, 0.13);
}
.view-tabs .tl-count {
  margin-right: 5px;
  background: transparent;
}
.content-pane .lyrics,
.content-pane .tracklist {
  flex: 1;
  min-height: 0;
  max-height: none;
}
.content-pane .lyrics {
  margin: 0;
  padding: 12px 4px;
  border: 0;
  background: transparent;
  -webkit-mask-image: linear-gradient(transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(transparent, #000 12%, #000 88%, transparent);
}
.content-pane .lyric-line {
  padding: 7px 10px;
  border-left: 2px solid transparent;
  border-radius: 0;
  text-align: left;
  opacity: 0.52;
  transform: none;
}
.content-pane .lyric-line:hover {
  opacity: 0.82;
  background: rgba(33, 187, 255, 0.05);
}
.content-pane .lyric-line.active {
  border-left-color: var(--ba-cyan);
  opacity: 1;
  transform: none;
  background: linear-gradient(90deg, rgba(33, 187, 255, 0.12), transparent 78%);
}
.content-pane .lyric-line.active .l-text {
  font-size: 14px;
  text-shadow: none;
}
.content-pane .l-trans {
  margin-top: 3px;
}
.content-pane .tracklist li {
  min-height: 54px;
  margin-bottom: 4px;
  padding: 5px 8px;
  border-radius: 6px;
}
.content-pane .t-thumb-wrap {
  width: 34px;
  height: 38px;
}
.transport {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(33, 187, 255, 0.16);
}
.timeline {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 34px;
  align-items: center;
  gap: 8px;
  color: var(--ba-muted);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}
.timeline span:last-child {
  text-align: right;
}
.timeline .progress {
  height: 4px;
  margin: 0;
}
.transport .controls {
  gap: 7px;
  margin: 0;
}
.transport .ctrl-btn {
  width: 34px;
  height: 34px;
  border-radius: 7px;
}
.transport .play-btn {
  width: 44px;
  height: 44px;
}

/* ===== 展开过渡 ===== */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.92);
}

/* ===== 暗色模式 ===== */
:global(html.dark) .panel,
:global(body.dark) .panel {
  background: rgba(18, 28, 48, 0.85);
  border-color: rgba(33, 187, 255, 0.22);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.5);
}
:global(html.dark) .song-title,
:global(body.dark) .song-title {
  color: var(--ba-light);
}
:global(html.dark) .song-artist,
:global(body.dark) .song-artist,
:global(html.dark) .time,
:global(body.dark) .time {
  color: #6b7f94;
}
:global(html.dark) .t-title,
:global(body.dark) .t-title {
  color: #b8d4e8;
}
:global(html.dark) .l-text,
:global(body.dark) .l-text {
  color: #b8d4e8;
}
:global(html.dark) .l-trans,
:global(body.dark) .l-trans,
:global(html.dark) .lyric-empty,
:global(body.dark) .lyric-empty {
  color: #6b7f94;
}
:global(html.dark) .lyric-line.active .l-text,
:global(body.dark) .lyric-line.active .l-text {
  color: var(--ba-light);
}
:global(html.dark) .ctrl-btn,
:global(body.dark) .ctrl-btn {
  color: var(--ba-light);
}
:global(html.dark) .art-mood,
:global(body.dark) .art-mood {
  background: rgba(18, 28, 48, 0.95);
}

/* ===== 移动端：砍掉重特效 + 自适应宽度 + 放大触控区 ===== */
@media (max-width: 768px) {
  .stardust-player {
    right: 12px;
    bottom: 110px;
  }
  .particles {
    display: none;
  }
  /* 关掉光环旋转，只留静态环，省 GPU */
  .ba-halo {
    animation: none;
    transform: rotateX(68deg);
    opacity: 0.4;
  }
  .record-pod {
    width: 64px;
    height: 64px;
    animation: none;
  }
  .ba-halo {
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
  }
  .panel {
    right: 0;
    width: calc(100vw - 24px);
    max-width: 360px;
    bottom: 78px;
    padding: 14px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .player-body {
    display: block;
    min-height: 0;
  }
  .song-summary {
    display: grid;
    grid-template-columns: 68px minmax(0, 1fr);
    gap: 12px;
    min-height: 68px;
    padding: 0 0 10px;
    border-right: 0;
    border-bottom: 1px solid rgba(33, 187, 255, 0.16);
  }
  .song-summary .art-frame {
    width: 68px;
    margin: 0;
    padding: 2px;
    border-radius: 7px;
  }
  .song-summary .art-wrap {
    width: 64px;
    height: 64px;
  }
  .song-summary .art {
    border-radius: 5px;
  }
  .song-summary .meta {
    padding-right: 0;
    text-align: left;
  }
  .song-summary .meta-line {
    margin-left: 0;
  }
  .content-pane {
    height: min(190px, 26vh);
    margin-top: 10px;
  }
  .transport {
    display: block;
    margin-top: 10px;
    padding-top: 10px;
  }
  .transport .controls {
    margin-top: 8px;
  }
  .art-wrap {
    width: 92px;
    height: 92px;
  }
  .collapse-btn {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
  .tracklist li {
    padding: 9px 6px;
  }
  .t-thumb-wrap {
    width: 42px;
    height: 46px;
  }
  .lyric-line {
    padding: 8px 6px;
  }
  .play-btn {
    width: 46px;
    height: 46px;
  }
}

@media (max-width: 360px) {
  .panel {
    max-width: none;
    right: -6px;
  }
  .art-wrap {
    width: 80px;
    height: 80px;
  }
}

/* ===== 无障碍 / 省电：尊重系统「减少动态效果」 ===== */
@media (prefers-reduced-motion: reduce) {
  .record-pod,
  .vinyl.spinning,
  .ba-halo,
  .play-btn.playing::before,
  .particle,
  .t-eq i {
    animation: none !important;
  }
  .ba-halo {
    transform: rotateX(68deg);
  }
  .particles {
    display: none;
  }
}
</style>
