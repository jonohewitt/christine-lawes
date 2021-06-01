import React from "react"
import styled from "styled-components"

export const footerHeightString = `${200}px`

const FooterWrapper = styled.footer`
  background: #959fb1;
  height: ${footerHeightString};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  p {
      margin: 50px;
  }
  
`

export const Footer = () => (
  <FooterWrapper>
    <p>© {new Date().getFullYear()}, Christine Lawes</p>
  </FooterWrapper>
)
