/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata : {
    title: `Unstable Label User Manual`,
    description: `A web essay describing the design of Unstable Label, a speculative design project by Adit Dhanushkodi`,
    author: `Adit Dhanushkodi`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unstable Label User Manual`,
        short_name: `User Manual`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#52FFC1`,
        display: `standalone`,
        icon: `src/components/logo_transparent.png`
      }
    },
    `gatsby-plugin-offline`
  ],
}
