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
            <script src="https://unpkg.com/ml5@0.5.0/dist/ml5.min.js" type="text/javascript" />
            <script src="https://kit.fontawesome.com/e0cacda273.js" crossOrigin="anonymous"></script>
        </Helmet>
    )
}

export default SEO