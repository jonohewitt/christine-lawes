export default {
  name: "aboutPhoto",
  type: "image",
  title: "Photo",
  description: "The profile image shown next to the text",
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "Describe the image for search engines and people with sight disabilities.",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
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
