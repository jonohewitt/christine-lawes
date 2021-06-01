export default {
  name: "portfolio",
  type: "document",
  title: "Portfolio Selection",
  fields: [
    {
      title: "Selection",
      description:
        "Add artworks here and drag them into the order you'd like them to be shown in the portfolio grid",
      name: "selection",
      type: "array",
      of: [
        {
          title: "Portfolio Selection",
          type: "reference",
          to: [{ type: "artwork" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
}
