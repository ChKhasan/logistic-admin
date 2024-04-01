export default {
  head: {
    title: "Logistic admin",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
  },
  ssr: false,
  css: ["ant-design-vue/dist/antd.css", "~/assets/css/main.css"],

  plugins: [
    "~/plugins/axios",
    "~/plugins/axios-instance",
    { src: "~/plugins/ymapPlugin.js",ssr: false },
    { src: "~plugins/antdv.js", ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false },
    { src: "~plugins/ckeditor.js", ssr: false },
    { src: "~plugins/v-mask.js", ssr: false },
  ],
  loadingIndicator: {
    name: "chasing-dots",
    color: "#1890ff",
    background: "white",
  },
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: process.env.BASE_URL,
  },
  components: true,

  buildModules: ["@nuxtjs/svg"],

  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "nuxt-precompress",
    "@nuxtjs/dotenv",
  ],
  nuxtPrecompress: {
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ["br", "gzip"],
    },
    gzip: {
      enabled: true,
      filename: "[path].gz[query]",
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: "[path].br[query]",
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  build: {},
};
