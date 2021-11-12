import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEO from "../components/seo"
import AspectRatio from "../components/aspectRatio"
import Image from "gatsby-plugin-sanity-image"

export const query = graphql`
  query PortfolioPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    artworks: sanityPortfolio {
      selection {
        _id
        slug {
          current
        }
        artworkImage {
          ...ImageWithPreview
          asset {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            title
          }
          alt
          hotspot {
            _key
            _type
            height
            width
            x
            y
          }
        }
        title
      }
    }
  }
`

const PortfolioGrid = styled.ul`
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  max-width: 420px;

  @media (min-width: 660px) {
    max-width: unset;
    grid-column-gap: 25px;
    grid-template-columns: repeat(3, 1fr);
  }
`
const ArtworkContainer = styled.li`
  /* aspect-ratio: 1; */

  /* Safari doesn't support it yet */
  /* Instead the custom AspectRatio component is being used */
`

const ArtworkCard = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding: 8px;
    width: 100%;
    text-align: center;

    @media (min-width: 660px) {
      font-size: min(16px, 1.8vw);
    }
  }
`

const Portfolio = ({ data }) => {
  const artworks = data.artworks.selection
  return (
    <>
      <SEO
        title={"Portfolio"}
        description={data.site.description}
        keywords={data.site.keywords}
      />
      <main>
        <PortfolioGrid aria-label="Portfolio artworks">
          {artworks.map((artwork) => {
            const title = artwork.title || "untitled"
            const slug = artwork.slug.current

            return (
              <ArtworkContainer key={artwork._id}>
                <ArtworkCard to={`/portfolio/${slug}/`}>
                  <AspectRatio ratio={1}>
                    {artwork.artworkImage && (
                      <Image
                        {...artwork.artworkImage}
                        width={450}
                        height={450}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                      // <GatsbyImage
                      //   image={getImage(artwork.artworkImage.asset)}
                      //   alt={artwork.artworkImage.alt}
                      //   style={{
                      //     height: "100%",
                      //   }}
                      //   imgStyle={
                      //     hotspot && {
                      //       objectPosition: `${hotspot.x * 100}% ${
                      //         hotspot.y * 100
                      //       }%`,
                      //     }
                      //   }
                      // />
                    )}
                  </AspectRatio>
                  <p>{title}</p>
                </ArtworkCard>
              </ArtworkContainer>
            )
          })}
        </PortfolioGrid>
      </main>
    </>
  )
}

export default Portfolio
