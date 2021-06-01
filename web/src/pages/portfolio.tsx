import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEO from "../components/seo"
import AspectRatio from "../components/aspectRatio"

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
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-row-gap: 15px;
  grid-column-gap: 25px;
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
  }
`

const Portfolio = ({ data }) => {
  const artworks = data.artworks.selection
  return (
    <>
      <SEO
        title={"Portfolio"}
        // description={site.description}
        // keywords={site.keywords}
      />
      <main>
        <PortfolioGrid aria-label="Portfolio artworks">
          {artworks.map((artwork) => {
            const title = artwork.title || "untitled"
            const slug = artwork.slug.current
            const hotspot = artwork.artworkImage?.hotspot
            return (
              <ArtworkContainer key={artwork._id}>
                <ArtworkCard to={`/portfolio/${slug}/`}>
                  <AspectRatio ratio={1}>
                    {artwork.artworkImage && (
                      <GatsbyImage
                        image={getImage(artwork.artworkImage.asset)}
                        alt={artwork.artworkImage.alt}
                        style={{
                          height: "100%",
                        }}
                        imgStyle={
                          hotspot && {
                            objectPosition: `${hotspot.x * 100}% ${
                              hotspot.y * 100
                            }%`,
                          }
                        }
                      />
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
