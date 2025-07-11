import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d';
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import { copyrightPlugin } from '@vuepress/plugin-copyright'
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
      dockedPosition:'right',
      models:[{
        path: '/live2d/HK416-2-destroy/model.json',
        scale: 0.07,
        mobileScale: 0.07,
        position:[-1,20],
        stageStyle:{
          width: 500,
        }
      }]
    }),
    readingTimePlugin({
      
    }),
    copyrightPlugin({
      author: 'Shi Yi',
      license: 'CC BY-NC-SA 4.0',
      global: true,
      // triggerLength: 1,
    })
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
    docsRepo: "https://github.com/2743305544",
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
      { text: "分类", link: "/categories/Test/1.html" },
      { text: "标签", link: "/tags/test/1.html" },
      {
        text: "Docs",
        children: [
          // { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "介绍", link: "/docs/other/welcome" },
        ],
      },
    ],
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
