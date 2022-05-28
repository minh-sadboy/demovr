export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Thử nghiệm vr || Mêtan',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src:
          "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js",
        type: "text/javascript",
        integrity:
          "sha256-7hTNJB9pNQSp6lX6Ly7Tsk2h98+ASSZxYGnQ0jJDTY4=",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.js",
        type: "text/javascript",
        integrity:
          "sha256-9f0TeUPJwoISUd64ll73HsMuZ+Nyt4M/G7nm0n5QmQ4=",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248257/drawing_utils.js",
        type: "text/javascript",
        integrity:
          "sha256-L5Jry9TqC98ERwGM5UuSCGJ3EmVTRkVYFrDYuDSw8wU=",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer"
      },
    ]
  },

  loading: {
    color: '#2196F3',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/root.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/mediapipe.worker.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'vi'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["three"],
    optimizeCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
    loaders: {
      cssModules: {
        modules: {
          localIdentName: "[hash:base64:10]",
        }
      }
    },
    babel: {
      compact: true,
    },
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      });
    },
  },

  publicRuntimeConfig: {
    baseURL: "http://localhost:3000/ ",
  },
}
