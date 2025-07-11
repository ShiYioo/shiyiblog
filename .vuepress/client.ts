

import { h ,createApp , onUnmounted} from 'vue'
import { useRouter } from 'vue-router'
import Live2DModel from './components/Live2DModel.vue'
import { defineClientConfig } from '@vuepress/client'
import ResponsiveSidebar from './components/ResponsiveSidebar.vue'
import  MusicPlayer  from './components/music-player.vue'
import APlayer from 'vue3-aplayer'
import ReadTime from './components/ReadTime.vue'
import {
  useReadingTimeData,
  useReadingTimeLocale,
  getReadingTimeLocale
} from '@vuepress/plugin-reading-time/client'
export default defineClientConfig({
  enhance({ app }) {
    app.component('MusicPlayer', MusicPlayer)
    app.component('Live2DModel', Live2DModel)
    app.component('APlayer', APlayer)
  },
  setup() {
    const router = useRouter()
    // console.log('当前路由:', router.currentRoute.value.path)

    // const isMobile = /mobile/i.test(window.navigator.userAgent)
    // if (!isMobile) {
    //   const container = document.createElement('div')
    //   document.body.appendChild(container)
    //   createApp(h(Live2DModel)).mount(container)
    // }
    
  const sidebarContainer = document.createElement('div')
    document.body.appendChild(sidebarContainer)
    createApp(h(ResponsiveSidebar)).mount(sidebarContainer)

    const musiccontainer = document.createElement('div')
  document.body.appendChild(musiccontainer)
  createApp(h(MusicPlayer)).mount(musiccontainer)

  let readTimeApp: any = null
let readTimeContainer: HTMLElement | null = null
   
const mountReadTimeComponent = () => {
      const readingTimeLocale = useReadingTimeLocale()
      // 卸载旧组件并重新创建
      if (readTimeApp) {
        readTimeApp.unmount()
        readTimeApp = null
        if (readTimeContainer) {
          document.body.removeChild(readTimeContainer)
          readTimeContainer = null
        }
      }

      readTimeContainer = document.createElement('div')
      document.body.appendChild(readTimeContainer)
      readTimeApp = createApp(h(ReadTime, {
        wordCount: readingTimeLocale.value.words,
        readingTime: readingTimeLocale.value.time
      }))
      readTimeApp.mount(readTimeContainer)
    }

    const unmountReadTimeComponent = () => {
      // 如果离开 /blogs/ 页面，卸载组件
      if (readTimeApp) {
        readTimeApp.unmount()
        readTimeApp = null
        if (readTimeContainer) {
          document.body.removeChild(readTimeContainer)
          readTimeContainer = null
        }
      }
    }

    // 在 setup 中直接调用一次 mountReadTimeComponent 来初始化组件
    mountReadTimeComponent()

    // 监听路由变化
    router.afterEach((to) => {
      // 判断是否是 /blogs/ 开头的路径
      if (to.path.startsWith('/blogs/')) {
        mountReadTimeComponent()
      } else {
        unmountReadTimeComponent()
      }
    })

    // 组件卸载时清理
    onUnmounted(() => {
      unmountReadTimeComponent()
    })
  }
})
  