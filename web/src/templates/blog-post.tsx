import { graphql } from "gatsby"
import React from "react"
import GraphQLErrorList from "../components/graphql-error-list"
import SEO from "../components/seo"
import { toPlainText } from "../lib/helpers"

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
    }
  }
`

const BlogPostTemplate = (props) => {
  const { data, errors } = props
  const post = data && data.post
  console.log(post)
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title || "Untitled"}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && <GraphQLErrorList errors={errors} />}
    </>
  )
}

export default BlogPostTemplate
