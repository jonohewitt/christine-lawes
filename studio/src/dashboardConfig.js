export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "60953f8234e2e95a752a925c",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-nkiwask4",
                  apiId: "55c581cf-429e-4a23-ae3a-7b39b43a6cbf",
                },
                {
                  buildHookId: "60953f82b8c7ee56259a938f",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-m42jfw7a",
                  apiId: "5b125a7d-68b3-46af-b10f-bf3e3053cab9",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/jonohewitt/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-m42jfw7a.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
