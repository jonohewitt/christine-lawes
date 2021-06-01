export default {
  name: "about",
  type: "document",
  title: "About",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Page header",
    },
    {
      name: "body",
      type: "bodyPortableText",
      title: "Body",
      description: "The main text for the page",
    },
    {
      name: "aboutPhoto",
      type: "aboutPhoto",
      title: "Photo",
    },
  ],
}
