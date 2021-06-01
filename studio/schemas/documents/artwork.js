export default {
  name: "artwork",
  type: "document",
  title: "Artwork",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Artwork Title",
    },
    {
      name: "artworkImage",
      type: "artworkImage",
      title: "Artwork Image",
    },
    {
      title: "Year Completed",
      name: "dateComplete",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    },
    {
      name: "artworkDimensions",
      type: "string",
      title: "Artwork Dimensions",
      description: "Width by height in centimeters, e.g '50x30cm'",
    },
    {
      name: "materialsUsed",
      type: "string",
      title: "Materials Used",
      description:
        "E.g 'Graphite & watercolour on paper' - Try to use '&' instead of 'and'",
    },
    {
      name: "description",
      type: "bodyPortableText",
      title: "Description",
      description:
        "Descriptions should be personal to you, rather than general information about the subject",
    },
    {
      name: "features",
      type: "array",
      of: [
        { name: "feature", type: "feature", title: "Press Feature" },
      ],
      title: "Featured In (Optional)",
      description: "Press that this work has been published in",
    },
    {
      name: "exhibitions",
      type: "array",
      of: [{ name: "exhibition", type: "exhibition", title: "Exhibition" }],
      title: "Exhibited In (Optional)",
      description: "Exhibitions that this work has featured in",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "Click the 'Generate' button to create a 'slug' automatically. This is the end part of the website address, e.g throw-of-the-dice.",
      validation: (Rule) =>
        Rule.error("You have to click the 'Generate' button").required(),
      options: {
        source: "title",
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
  ],
  orderings: [
    {
      name: "portfolioGrid",
      title: "Portfolio grid",
      by: [
        {
          field: "order",
          direction: "asc",
        },
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
      media: "artworkImage",
    },
    prepare({ title = "No title", slug = {}, media }) {
      const path = `/portfolio/${slug.current}`
      return {
        title,
        media,
        subtitle: slug ? path : "Missing slug",
      }
    },
  },
}
