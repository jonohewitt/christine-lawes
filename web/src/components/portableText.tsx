import React from "react"
import clientConfig from "../../client-config"
import BasePortableText from "@sanity/block-content-to-react"
import serializers from "./serializers"
import styled from "styled-components"

const Styles = styled.div`
  font-family: DM Sans, sans-serif;
`

const PortableText = ({ blocks }) => (
  <Styles>
    <BasePortableText
      blocks={blocks}
      serializers={serializers}
      {...clientConfig.sanity}
    />
  </Styles>
)

export default PortableText
