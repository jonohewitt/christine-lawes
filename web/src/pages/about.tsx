import React from "react"
import { graphql } from "gatsby"
import PortableText from "../components/portableText"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEO from "../components/seo"
import AspectRatio from "../components/aspectRatio"

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      description
      keywords
    }
    about: sanityAbout {
      title
      _rawBody
      _rawAboutPhoto
      aboutPhoto {
        alt
        asset {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`

const Main = styled.main`
  margin-top: 26px;
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 25px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 0.75fr;
    column-gap: 40px;
  }
`

const BodyStyles = styled.div`
  min-width: 50%;
  p,
  li {
    line-height: 1.4;
  }
  ul {
    margin: 16px;
  }
  li {
    font-weight: 500;
    list-style-type: disc;
  }
`

const ImageContainer = styled.div`
  @media (max-width: 749px) {
    position: relative;
    max-height: 45vw;
    overflow: hidden;
    margin-bottom: 40px;
    img {
      top: -90px;
      object-position: 50% 40%;
    }
  }
`

const About = ({ data, errors }) => {
  const { site, about } = data
  return (
    <>
      <SEO
        title={"About"}
        description={site.description}
        keywords={site.keywords}
        image={about._rawAboutPhoto}
      />
      <Main>
        <Title>{about.title}</Title>
        <ContentContainer>
          <BodyStyles>
            <PortableText blocks={about._rawBody} />
          </BodyStyles>
          <ImageContainer>
            {/* <AspectRatio ratio={4 / 3}> */}
            <GatsbyImage
              image={getImage(about.aboutPhoto.asset)}
              alt={about.aboutPhoto.alt}
              style={{
                maxHeight: "450px",
                maxWidth: "500px",
                margin: "0 auto",
              }}
              imgStyle={{}}
            />
            {/* </AspectRatio> */}
          </ImageContainer>
        </ContentContainer>
      </Main>
    </>
  )
}

export default About
