export default {
  server: {
    host: "0",
  },
  ssr: true,
  components: true,
  // target: "static",

  head: {
    title: "Emyr",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { name: "robots", content: "index, follow" },
      {
        hid: "description",
        name: "description",
        content: "Emyr — строительный клей для плиток",
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "Emyr — строительный клей для плиток",
      },
      {
        name: "keywords",
        content: "Emyr строительный клей для плиток",
      },
      // {
      //   hid: "og:image",
      //   name: "og:image",
      //   content: "https://amina-osimi.com/amina-photo.jpg",
      // },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
      },
    ],
  },

  css: ["~/assets/scss/index.scss"],

  styleResources: {
    scss: ["~assets/scss/_responsive.scss", "~assets/scss/_variables.scss"],
  },

  plugins: [
    {
      src: "~/plugins/plugins.js",
    },
  ],

  modules: ["@nuxtjs/axios"],

  buildModules: ["@nuxtjs/style-resources"],

  build: {
    scss: {
      implementation: require("sass"),
    },
  },

  pageTransition: "page-transition",
  router: {
    scrollBehavior() {
      return { top: 0 };
    },
  },
};
