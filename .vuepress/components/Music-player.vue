<template>
       <div style="position: fixed; bottom: 0; left: 0; z-index: 999;">
        <APlayer :music="music" :float="true" :shuffle="true" :listFolded="true" :list="list"/>
      </div>
</template>

<script setup>
import { ref } from 'vue'
import APlayer from 'vue3-aplayer'
// 定义音乐对象
const music = ref({
  title: 'オセロ',
  artist: 'DAZBEE',
  src: 'https://music.163.com/song/media/outer/url?id=2085560360.mp3', // 替换为实际音频文件路径
  pic: '/musicimg.jpg'  // 替换为实际封面图片路径
}
)

const list = [
{
    title: 'オセロ',
  artist: 'DAZBEE',
  src: 'https://music.163.com/song/media/outer/url?id=2085560360.mp3', // 替换为实际音频文件路径
  pic: '/musicimg.jpg'  // 替换为实际封面图片路径
},{
    title: 'Zenith',
    artist: 'KARAKURI',
    src: 'https://music.163.com/song/media/outer/url?id=2019092913.mp3', // 替换为实际音频文件路径
    pic: 'https://p3.music.126.net/wGqRIS6kYizTDXIn3tWsAA==/109951168277970190.jpg?param=300y300'  // 替换为实际封面图片路径
  },
  {
    title: 'disco light',
    artist: 'ShibayanRecords',
    src: 'https://music.163.com/song/media/outer/url?id=1960160744.mp3',
    pic: 'https://p2.music.126.net/8xbS3r5CLdgvV_ObMidiGw==/109951167604592544.jpg?param=90y90'
  },{
    title: 'moremoremore',
    artist: '中村さんそ',
    src: 'https://music.163.com/song/media/outer/url?id=1840237913.mp3',
    pic: 'https://p1.music.126.net/NmQw4g1fbkt91EJFLXNTsg==/109951165924052279.jpg?param=90y90'
  }
]


</script>

<style scoped>
.player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px;
  border-top-right-radius: 10px;
  transition: all 0.3s ease;
}
</style>