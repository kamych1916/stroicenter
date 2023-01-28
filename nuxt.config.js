export default {
  server: {
    host: "localhost",
  },
  ssr: true,

  components: true,

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
    "~/plugins/api-context.js"
  ],

  modules: ["@nuxtjs/axios"],

  buildModules: ["@nuxtjs/style-resources"],

  build: {
    scss: {
      implementation: require("sass"),
    },
    extend (config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.txt$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/
      });
    }
  },

  pageTransition: "page-transition",
  router: {
    scrollBehavior() {
      return { top: 0 };
    },
  },

  // axios: {
  //   baseURL: "http://stroicenter.mirllex.com"
  // },

  serverMiddleware: [
    { path: "/api", handler: "~/serverMiddleware/api-image.js" },
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],
};
