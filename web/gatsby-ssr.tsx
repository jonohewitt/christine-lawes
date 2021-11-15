import React from "react"
import Layout from "./src/components/layout"

const ScriptInjection = () => {
  let codeToRunOnClient = `(() => {
        document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.body.offsetWidth) + "px")
    })()`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ScriptInjection key="🔑" />)
}

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
