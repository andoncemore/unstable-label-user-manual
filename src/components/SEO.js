import React from "react"
import { Helmet } from "react-helmet"

function SEO() {
    const description = "An interactive web esssay describing Unstable Label, a speculative design project that challenges contemporary ML data collection practices, imagining alternative paths forward"
    const title = "Unstable Label: User Manual"
    const author = "Adit Dhanushkodi"
    return (
        <Helmet
            title={title}
            meta={[
                {
                  name: `description`,
                  content: description,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:description`,
                  content: description,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: author,
                },
                {
                  name: `twitter:title`,
                  content: title,
                },
                {
                  name: `twitter:description`,
                  content: description,
                },
              ].concat([])

            }
        >
            <meta charset="utf-8" />
        </Helmet>
    )
}

export default SEO