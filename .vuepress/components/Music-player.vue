<template>
       <div style="position: fixed; bottom: 0; left: 0; z-index: 999;">
        <APlayer :music="music" :float="true" :shuffle="true" :listFolded="true" autoplay="true" :list="list" />
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
},{
    title: 'Zenith',
    artist: 'KARAKURI',
    src: 'https://m801.music.126.net/20250711103617/a53832bfc50bf9880b32b36872d26aa1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24484332522/a2d8/8599/7c1b/0f2f002d013de690d02116be74f3bc04.mp3?vuutv=uzuzUi0gjJ/HDkEHiyUKSjn12xoRnV4dhtP0PrXWM+THTLqPTbFc0uGQQCMCZAzRdcyhPnEPqbdbbHTjOwN8S85bQ/RLg2ApSQ6mUt52E7w=', // 替换为实际音频文件路径
    pic: 'https://p3.music.126.net/wGqRIS6kYizTDXIn3tWsAA==/109951168277970190.jpg?param=300y300'  // 替换为实际封面图片路径
  },
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
    src: 'https://m801.music.126.net/20250711103617/a53832bfc50bf9880b32b36872d26aa1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24484332522/a2d8/8599/7c1b/0f2f002d013de690d02116be74f3bc04.mp3?vuutv=uzuzUi0gjJ/HDkEHiyUKSjn12xoRnV4dhtP0PrXWM+THTLqPTbFc0uGQQCMCZAzRdcyhPnEPqbdbbHTjOwN8S85bQ/RLg2ApSQ6mUt52E7w=', // 替换为实际音频文件路径
    pic: 'https://p3.music.126.net/wGqRIS6kYizTDXIn3tWsAA==/109951168277970190.jpg?param=300y300'  // 替换为实际封面图片路径
  },
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