import { GatsbyConfig } from "gatsby"
import clientConfig from "../client-config"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const isProd = process.env.NODE_ENV === "production"

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
  ],
}

export default config
