import { format, isFuture } from "date-fns"

import slugify from "slugify"

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = {}, publishedAt } = edge.node
      const dateSegment = format(new Date(publishedAt), "yyyy/MM")
      const path = `/blog/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.tsx"),
        context: { id },
      })
    })
}

async function createPortfolioPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      sanityPortfolio {
        selection {
          id
          slug {
            current
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  // const getSlug = (slug: string, title: string) => {
  //   if (slug) return slug
  //   else if (title) return slugify(title, { lower: true })
  //   else return "untitled"
  // }

  interface Artwork {
    slug: {
      current: string
    }
    id: string
  }

  const artworks: Artwork[] = result.data.sanityPortfolio.selection

  artworks
    .filter((artwork) => artwork.slug)
    .forEach(({ slug, id }, index) => {
      const path = `/portfolio/${slug.current}/`

      let prevSlug: string, nextSlug: string

      if (index === 0) prevSlug = artworks[artworks.length - 1].slug.current
      else prevSlug = artworks[index - 1].slug.current

      if (index === artworks.length - 1) nextSlug = artworks[0].slug.current
      else nextSlug = artworks[index + 1].slug.current

      createPage({
        path,
        component: require.resolve("./src/templates/portfolio-artwork.tsx"),
        context: { id, prevSlug, nextSlug },
      })
    })
}

export async function createPages({ graphql, actions }) {
  await createBlogPostPages(graphql, actions)
  await createPortfolioPages(graphql, actions)
}
