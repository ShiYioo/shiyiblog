<template>
  <div class="music-dock">
    <APlayer :music="music" :float="true" :shuffle="true" :listFolded="true" :list="list"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import APlayer from 'vue3-aplayer'

const music = ref({
  title: 'オセロ',
  artist: 'DAZBEE',
  src: 'https://api.injahow.cn/meting/?type=url&id=2085560360',
  pic: '/musicimg.jpg'
})

const list = [
  {
    title: 'オセロ',
    artist: 'DAZBEE',
    src: 'https://api.injahow.cn/meting/?type=url&id=2085560360',
    pic: '/musicimg.jpg'
  },
  {
    title: 'Zenith',
    artist: 'KARAKURI',
    src: 'https://api.injahow.cn/meting/?type=url&id=2019092913',
    pic: 'https://p3.music.126.net/wGqRIS6kYizTDXIn3tWsAA==/109951168277970190.jpg?param=300x300'
  },
  {
    title: 'disco light',
    artist: 'ShibayanRecords',
    src: 'https://api.injahow.cn/meting/?type=url&id=1960160744',
    pic: 'https://p2.music.126.net/8xbS3r5CLdgvV_ObMidiGw==/109951167604592544.jpg?param=90y90'
  },
  {
    title: 'moremoremore',
    artist: '中村さんそ',
    src: 'https://api.injahow.cn/meting/?type=url&id=1840237913',
    pic: 'https://p1.music.126.net/NmQw4g1fbkt91EJFLXNTsg==/109951165924052279.jpg?param=90x90'
  }
]
</script>

<style scoped>
.music-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9998;
}

.music-dock :deep(.aplayer) {
  font-family: 'Comic Sans MS', 'Noto Sans CJK', sans-serif;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 16px rgba(255, 143, 171, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-left: none;
  border-bottom: none;
}

.music-dock :deep(.aplayer-body) {
  border-top-right-radius: 16px;
}

.music-dock :deep(.aplayer-pic) {
  border-top-left-radius: 0;
  filter: drop-shadow(0 0 4px rgba(255, 143, 171, 0.2));
}

.music-dock :deep(.aplayer-list) {
  border-top: 1px solid rgba(255, 143, 171, 0.15);
  background: rgba(255, 255, 255, 0.85);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.music-dock :deep(.aplayer-list ol li.aplayer-list-light) {
  background: rgba(255, 143, 171, 0.1);
}

.music-dock :deep(.aplayer-list ol li:hover) {
  background: rgba(255, 143, 171, 0.06);
}

.music-dock :deep(.aplayer-list ol li.aplayer-list-light .aplayer-list-cur) {
  background: linear-gradient(to bottom, #ff8fab, #b39ddb);
}

.music-dock :deep(.aplayer-info) {
  border-top: none;
}

.music-dock :deep(.aplayer-info .aplayer-music .aplayer-title) {
  color: #7c6cb0;
}

.music-dock :deep(.aplayer-info .aplayer-music .aplayer-author) {
  color: #aaa3bd;
}

:global(html.dark) .music-dock :deep(.aplayer),
:global(body.dark) .music-dock :deep(.aplayer),
:global(html.dark) .music-dock :deep(.aplayer-list),
:global(body.dark) .music-dock :deep(.aplayer-list) {
  background: rgba(30, 30, 50, 0.8);
  border-color: rgba(100, 100, 160, 0.2);
}

:global(html.dark) .music-dock :deep(.aplayer-info .aplayer-music .aplayer-title),
:global(body.dark) .music-dock :deep(.aplayer-info .aplayer-music .aplayer-title) {
  color: #ce93d8;
}

:global(html.dark) .music-dock :deep(.aplayer-info .aplayer-music .aplayer-author),
:global(body.dark) .music-dock :deep(.aplayer-info .aplayer-music .aplayer-author) {
  color: #7878a0;
}

@media (max-width: 768px) {
  .music-dock :deep(.aplayer) {
    font-size: 12px;
  }
}
</style>
