

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

const animeQuotes = [
  { title: 'Shi\'Yi の小庫', desc: '光是活着就已经赚到' },
  { title: 'たとえ今日が終わっても', desc: '即使今天结束了，明天依然会来' },
  { title: '自分のペースで生きよう', desc: '按自己的节奏活下去吧' },
  { title: '夢は逃げない、逃げるのはいつも自分', desc: '梦想不会逃跑，逃跑的总是自己' },
  { title: '生きているだけで丸もうけ', desc: '只要还活着就是赚到了' },
  { title: '綺麗事でも前を向く', desc: '即使是漂亮话，也要向前看' },
  { title: '何もしないのが一番の贅沢', desc: '什么都不做就是最大的奢侈' },
  { title: '今日も無事に終わりました', desc: '今天也平安无事地结束了' },
  { title: '逆境こそが最高のサーバー', desc: '逆境才是最好的老师' },
  { title: '暇なら寝よう、眠れば幸せ', desc: '有空就睡吧，睡着了就是幸福' },
  { title: '努力は必ず報われる、とは限らない', desc: '努力不一定有回报，但不努力一定没有' },
  { title: '好きなことをしていたいだけ', desc: '只是想做自己喜欢的事而已' },
  { title: '日常こそが奇跡', desc: '日常才是真正的奇迹' },
  { title: '笑う門には福来たる', desc: '和气致祥，笑口常开' },
  { title: '明日は明日の風が吹く', desc: '明天的风明天再吹' },
]

function applyRandomQuote() {
  if (typeof window === 'undefined') return
  const tryReplace = (attempt: number) => {
    const titleEl = document.querySelector('.banner-brand__content h1, .banner-brand__title') as HTMLElement
    const descEl = document.querySelector('.banner-brand__content p, .banner-brand__description') as HTMLElement
    if (titleEl) {
      const quote = animeQuotes[Math.floor(Math.random() * animeQuotes.length)]
      titleEl.textContent = quote.title
      if (descEl) descEl.textContent = quote.desc
    } else if (attempt < 10) {
      setTimeout(() => tryReplace(attempt + 1), 200)
    }
  }
  tryReplace(0)
}

export default defineClientConfig({
  enhance({ app }) {
  },
  setup() {
    const router = useRouter()

    if (typeof window !== 'undefined' && !sessionStorage.getItem('loaded')) {
      sessionStorage.setItem('loaded', '1')
      import('./components/LoadingScreen.vue').then(({ default: LoadingScreen }) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        createApp(h(LoadingScreen)).mount(container)
      }).catch(() => {})
    }

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

    if (typeof window !== 'undefined' && !isMobile && router.currentRoute.value.path.startsWith('/blogs/')) {
      mountReadTimeComponent()
    }

    if (typeof window !== 'undefined' && router.currentRoute.value.path === '/') {
      applyRandomQuote()
    }

    router.afterEach((to) => {
      if (typeof window === 'undefined') return
      if (!isMobile && to.path.startsWith('/blogs/')) {
        mountReadTimeComponent()
      } else {
        unmountReadTimeComponent()
      }
      if (to.path === '/') {
        applyRandomQuote()
      }
    })

    onUnmounted(() => {
      unmountReadTimeComponent()
    })
  }
})
