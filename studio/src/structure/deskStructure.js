import S from "@sanity/desk-tool/structure-builder"
import {
  MdHome,
  MdInfo,
  MdDescription,
  MdMenu,
  MdBorderColor,
} from "react-icons/md"
import IframePreview from "../previews/IframePreview"

// Web preview configuration
const remoteURL = "https://sanity-gatsby-blog-web-m42jfw7a.netlify.app"
const localURL = "http://localhost:8000"
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL

export const getDefaultDocumentNode = ({ schemaType }) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */

  return S.document().views([
    S.view.form(),
    S.view
      .component(IframePreview)
      .title("Web Preview")
      .options({ previewURL }),
  ])
}

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("General")
        .icon(MdHome)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("About")
        .icon(MdInfo)
        .child(S.editor().id("about").schemaType("about").documentId("about")),
      S.listItem()
        .title("Artworks")
        .icon(MdBorderColor)
        .schemaType("artwork")
        .child(S.documentTypeList("artwork").title("Artworks")),
      S.listItem()
        .title("Portfolio Selection")
        .icon(MdMenu)
        .child(
          S.editor()
            .id("portfolio")
            .schemaType("portfolio")
            .documentId("portfolio")
        ),
      S.listItem()
        .title("Blog Posts")
        .icon(MdDescription)
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog Posts")),

      // S.listItem()
      //   .title("Categories")
      //   .icon(MdLocalOffer)
      //   .schemaType("category")
      //   .child(S.documentTypeList("category").title("Categories")),

      // `S.documentTypeListItems()` returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above.
      
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "about",
            "category",
            "author",
            "artwork",
            "post",
            "siteSettings",
            "portfolio",
          ].includes(listItem.getId())
      ),
    ])
