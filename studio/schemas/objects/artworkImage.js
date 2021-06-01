export default {
  name: "artworkImage",
  type: "image",
  title: "Artwork Image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "An essential short description of the image for search engines and people with sight disabilities",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "description",
      title: "Long description",
      description:
        "A long description of the artwork for people with sight disabilities who might like to know more about what the work shows",
      type: "text",
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
    },
  },
}
