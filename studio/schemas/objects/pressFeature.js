export default {
  name: "feature",
  title: "Press Feature",
  type: "object",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Press Name",
      description: "The title of the magazine, book, website, etc",
    },
    {
      title: "Month of Feature",
      name: "date",
      type: "date",
      options: {
        dateFormat: "MM, YYYY",
      },
    },
    {
      title: "External Link (Optional)",
      description: "A link to an external site related to the feature. Must start with https:// or http://",
      name: "link",
      type: "url",
    },
  ],
}
