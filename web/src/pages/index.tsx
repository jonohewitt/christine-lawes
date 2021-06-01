import React from "react"
import { graphql } from "gatsby"
import {
  filterOutDocsPublishedInTheFuture,
  filterOutDocsWithoutSlugs,
  mapEdgesToNodes,
} from "../lib/helpers"
import GraphQLErrorList from "../components/graphql-error-list"
import SEO from "../components/seo"

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost {
      edges {
        node {
          title
          slug {
            current
          }
          _rawBody
          _id
        }
      }
    }
  }
`

const IndexPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1>Welcome to the {site.title} homepage</h1>
      <p>This could go straight to the portfolio page or be something else!</p>
    </>
  )
}

export default IndexPage
