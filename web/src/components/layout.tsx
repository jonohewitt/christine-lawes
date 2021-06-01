import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { Nav } from "./nav"

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background: #ececec;
    font-family: DM Mono, monospace;
    color: #132b58;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  strong {
    font-weight: 700;
  }
  hr {
    background: #132b58;
    opacity: 50%;
    border: 0;
    height: 2px;
  }
  .screen-reader-only {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`

const Content = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
  padding-bottom: 100px;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Footer = styled.footer`
  width: 100%;
  height: 200px;
  background: #959fb1;

  p {
    margin: 50px;
  }
`

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    {/* <MenuOptions /> */}

    <Page>
      <Nav />
      <Content>{children}</Content>
      <Footer>
        <p>© {new Date().getFullYear()}, Christine Lawes</p>
      </Footer>
    </Page>
  </>
)

export default Layout
