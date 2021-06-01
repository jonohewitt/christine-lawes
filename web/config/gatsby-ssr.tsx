import "@fontsource/dm-sans/latin-400.css"
import "@fontsource/dm-sans/latin-500.css"
import "@fontsource/dm-mono/latin-400.css"
import "@fontsource/dm-mono/latin-500.css"
import "@fontsource/dm-mono/latin-400-italic.css"
import "@fontsource/dm-mono/latin-500-italic.css"

import React from "react"
import Layout from "../src/components/layout"

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
