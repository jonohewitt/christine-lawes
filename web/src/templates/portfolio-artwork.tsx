import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { toPlainText } from "../lib/helpers"
import { PortfolioArtwork } from "../components/portfolioArtwork"

export const query = graphql`
  query PortfolioArtworkTemplateQuery($id: String!) {
    artwork: sanityArtwork(id: { eq: $id }) {
      title
      slug {
        current
      }
      id
      _rawDescription
      dateComplete
      artworkDimensions
      materialsUsed
      exhibitions {
        _key
        name
        date
        link
      }
      features {
        _key
        name
        date
        link
      }
      artworkImage {
        ...ImageWithPreview
        asset {
          metadata {
            dimensions {
              aspectRatio
              width
              height
            }
          }
        }
        alt
        description
      }
    }
  }
`

const PortfolioArtworkTemplate = ({ pageContext, data, errors }) => {
  const artwork = data?.artwork
  return (
    <>
      {artwork && (
        <>
          <SEO
            title={artwork.title || "Untitled"}
            description={toPlainText(artwork._rawDescription)}
            // image={artwork.artworkImage}
          />
          <PortfolioArtwork
            {...artwork}
            prevSlug={pageContext.prevSlug}
            nextSlug={pageContext.nextSlug}
          />
        </>
      )}
    </>
  )
}

export default PortfolioArtworkTemplate
