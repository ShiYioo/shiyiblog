import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d';
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import { copyrightPlugin } from '@vuepress/plugin-copyright'
import { sitemapPlugin } from "@vuepress/plugin-sitemap";
export default defineUserConfig({
  head: [['link', { rel: 'icon', href: '/logo.jpg' }],
    // ['script', { src: '/live2d/index.js' }],
    // ['script', { src: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js' }],
    // ['script', { src: '/cursor-trail.css' }],
    // ['script', { src: '/cursor-trail.js'}],
    // ['script', { src: '/snow.js' }]
  ],
  plugins:[
    oml2dPlugin({
      mobileDisplay: true,
      dockedPosition: 'left',
      primaryColor: '#ff8fab',
      sayHello: true,
      models:[{
        path: '/live2d/HK416-2-destroy/model.json',
        scale: 0.07,
        mobileScale: 0.04,
        position: [-1, 40],
        stageStyle:{
          width: 200,
        }
      }],
      tips: {
        idleTips: {
          interval: 12000,
          duration: 5000,
          message: [
            '欢迎来到我的小库~',
            '今天也要元气满满哦~',
            '要不要一起看番呢？',
            '代码写累了，休息一下吧~',
            '咕咕咕，今天摸鱼了吗？',
            '二次元才是真爱！',
            '早点睡觉，不要熬夜哦~',
          ],
        },
        welcomeTips: {
          message: {
            daybreak: '早上好！一日之计在于晨，美好的一天开始啦~',
            morning: '上午好！工作顺利吗？不要久坐哦~',
            noon: '中午了，该吃午饭啦！别忘了吃饭~',
            afternoon: '午后容易犯困呢，注意休息~',
            dusk: '傍晚了！辛苦一天啦~',
            night: '晚上好，今天过得怎么样呢？',
            lateNight: '已经这么晚了，早点休息吧，晚安~',
            weeHours: '这么晚还不睡？当心熬夜秃头哦！',
          },
        },
        copyTips: {
          message: '复制成功！转载请注明出处哦~',
        },
      },
    }),
    readingTimePlugin({
      
    }),
    copyrightPlugin({
      author: 'Shi Yi',
      license: 'CC BY-NC-SA 4.0',
      global: true,
      // triggerLength: 1,
    }),
    sitemapPlugin({
      hostname: 'blog.shiyio.uk'
    }),
  ],
  port: 8012,
  title: "Shi Yi の 小库",
  description: "只是一个喜欢摆烂混吃等死的Java开发者而已",
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    logo: "/logo.jpg",
    author: "Shi Yi",
    authorAvatar: "/logo.jpg",
    docsRepo: "https://github.com/ShiYioo",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "主页", link: "/" },
      { text: "分类", link: "/categories/daily/1.html" },
      { text: "标签", link: "/tags/java/1.html" },
      {
        text: "Docs",
        children: [
          // { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "介绍", link: "/docs/other/welcome" },
        ],
      },
    ],
    algolia: {
    appId: '9ebbabab-4b36-4711-ac94-f677bcf9b647',
    apiKey: '0bd9f9ba1d74a028e9041408426f9b9c',
    indexName: 'ShiYi Blog',
    inputSelector: '### REPLACE ME ####',
    algoliaOptions: { 'facetFilters': ["lang:$LANG"] },
    debug: false // Set debug to true if you want to inspect the dropdown
  },
  bulletin: {
    body: [
      {
        type: "text",
        content:
          "关于音乐播放器的问题，目前PC端无法点击播放按钮进行播放，切换歌曲可以进行播放，如需关闭可以调低播放器的音量，手机端一切正常（懒得改）",
        style: "font-size: 12px;",
      },
    ],
  },
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `Test`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
