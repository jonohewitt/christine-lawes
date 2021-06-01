import React from "react"
import styled from "styled-components"

const OptionsContainer = styled.div`
  height: 100vh;
  width: 90vw;
  z-index: 1;
  position: absolute;
  background: #959fb1;
  transform: translateX(-100%);
`

export const MenuOptions = () => {
  return <OptionsContainer></OptionsContainer>
}
