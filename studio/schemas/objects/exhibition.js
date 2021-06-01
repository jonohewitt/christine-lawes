export default {
  name: "exhibition",
  title: "Exhibition",
  type: "object",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Exhibition Name",
      description: "The title of the exhibition",
    },
    {
      title: "Month of Exhibition",
      name: "date",
      type: "date",
      options: {
        dateFormat: "MM, YYYY",
      },
    },
    {
      title: "External Link (Optional)",
      description: "A link to an external site related to the exhibition. Must start with https:// or http://",
      name: "link",
      type: "url",
    },
  ],
}
