// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// document schemas
import about from "./documents/about"
import category from "./documents/category"
import post from "./documents/post"
import siteSettings from "./documents/siteSettings"
import artwork from "./documents/artwork"
import portfolio from "./documents/portfolio"

// Object types
import bodyPortableText from "./objects/bodyPortableText"
import bioPortableText from "./objects/bioPortableText"
import excerptPortableText from "./objects/excerptPortableText"
import mainImage from "./objects/mainImage"
import artworkImage from "./objects/artworkImage"
import aboutPhoto from "./objects/aboutPhoto"
import exhibition from "./objects/exhibition"
import feature from "./objects/pressFeature"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    artworkImage,
    siteSettings,
    post,
    about,
    artwork,
    category,
    mainImage,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    aboutPhoto,
    exhibition,
    feature,
    portfolio,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
})
