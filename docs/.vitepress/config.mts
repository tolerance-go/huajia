import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "画家",
  description: "一个后端开发者友好的前端框架",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
      // { text: 'DSL 文档', link: '/dsl' }
    // ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是画家', link: '/what-is-huajia' },
          { text: '快速开始', link: '/getting-started' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
