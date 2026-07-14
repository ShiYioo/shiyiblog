

import { h, createApp, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineClientConfig } from '@vuepress/client'
import ReadTime from './components/ReadTime.vue'
import {
  useReadingTimeLocale,
} from '@vuepress/plugin-reading-time/client'

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

const onIdle = typeof window !== 'undefined' && 'requestIdleCallback' in window
  ? window.requestIdleCallback
  : (cb: () => void) => setTimeout(cb, 2000)

export default defineClientConfig({
  enhance({ app }) {
  },
  setup() {
    const router = useRouter()

    if (typeof window !== 'undefined') {
      onIdle(() => {
        import('./components/ClientScripts.vue').then(({ default: ClientScripts }) => {
          if (isMobile) return
          const scriptContainer = document.createElement('div');
          document.body.appendChild(scriptContainer);
          createApp(h(ClientScripts)).mount(scriptContainer);
        }).catch(err => {
          console.error('Failed to load ClientScripts:', err);
        });
      })
    }

    if (typeof window !== 'undefined') {
      onIdle(() => {
        import('./components/Music-player.vue').then(({ default: MusicPlayer }) => {
          const musiccontainer = document.createElement('div')
          document.body.appendChild(musiccontainer)
          createApp(h(MusicPlayer)).mount(musiccontainer)
        }).catch(err => {
          console.error('Failed to load MusicPlayer:', err)
        })
      })
    }

    if (typeof window !== 'undefined') {
      import('./components/LinkCheck.vue').then(({ default: LinkCheck }) => {
        const linkCheckContainer = document.createElement('div')
        document.body.appendChild(linkCheckContainer)
        createApp(h(LinkCheck)).mount(linkCheckContainer)
      }).catch(err => {
        console.error('Failed to load LinkCheck:', err)
      })
    }

  let readTimeApp: any = null
  let readTimeContainer: HTMLElement | null = null

  const mountReadTimeComponent = () => {
      const readingTimeLocale = useReadingTimeLocale()
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
      if (readTimeApp) {
        readTimeApp.unmount()
        readTimeApp = null
        if (readTimeContainer) {
          document.body.removeChild(readTimeContainer)
          readTimeContainer = null
        }
      }
    }

    if (typeof window !== 'undefined' && router.currentRoute.value.path.startsWith('/blogs/')) {
      mountReadTimeComponent()
    }

    router.afterEach((to) => {
      if (typeof window === 'undefined') return
      if (to.path.startsWith('/blogs/')) {
        mountReadTimeComponent()
      } else {
        unmountReadTimeComponent()
      }
    })

    onUnmounted(() => {
      unmountReadTimeComponent()
    })
  }
})
