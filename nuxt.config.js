import axios from 'axios'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      dir: 'ltr',
      lang: 'ja'
    },
    title: 'ぴくせる',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { property: 'og:title', content: 'ぴくせる | Pixel'},
      { property: 'og:image', content: 'https://images.microcms-assets.io/protected/ap-northeast-1:f0125be4-1574-49d1-bdb0-156ee92aa551/service/pmgwork/media/ogimage.png'},
      { name: 'twitter:card', content: 'summary_large_image'},
      { name: 'twitter:site', content: '@pmgwork'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans+JP:wght@500;700&display=swap' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/vqq6vsv.css' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/combine/npm/lodash@4.17.20,npm/lottie-web@5.7.6,npm/parallax-js@3.1.0,npm/desvg@1.0.2', defer: true },
      { src: '/js/butter.js', defer: true }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/style.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'UA-130292836-1'
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/redirect-module',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      let position = false

      if (to.matched.length < 2) {
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        position = { x: 0, y: 0 }
      }

      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        window.$nuxt.$once('triggerScroll', () => {
          if (to.hash && document.querySelector(to.hash) && !savedPosition) {
            position = { selector: to.hash }
          }
          resolve(position)
        });
      });
    }
  },

  generate: {
    async routes() {
      const pages = await axios
        .get('https://pmgwork.microcms.io/api/v1/works?limit=100', {
          headers: { 'X-API-KEY': '8d729177-1247-4c07-b1b4-b2ccd3bd4e66' }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `works/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  }
}
