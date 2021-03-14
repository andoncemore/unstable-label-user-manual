import React, {useRef, useState, useEffect} from "react"
import "@fontsource/ibm-plex-serif/400.css"
import "@fontsource/ibm-plex-serif/500.css"
import "@fontsource/ibm-plex-serif/600.css"
import "@fontsource/ibm-plex-serif/400-italic.css"
import "@fontsource/ibm-plex-serif/500-italic.css"
import "@fontsource/ibm-plex-serif/600-italic.css"
import * as LayoutStyles from "./layout.module.css"
import "./site.css"
import logo from "./logo.png"
import Nav from "./nav"
import SEO from "./SEO"
import { Helmet } from "react-helmet"

export default function Layout({children}) {
  const [activeName, setActiveName] = useState("#introduction");
  const contentRef = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver((entries, observer) =>{
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
          setActiveName(`#${entry.target.id}`);
        }
      })
    })
    contentRef.current.querySelectorAll(".toc").forEach(heading => {
      observer.observe(heading);
    })
    return () => observer.disconnect();
  },[]);

  return (
  <React.Fragment>
    <Helmet>
      <script src="https://unpkg.com/ml5@0.5.0/dist/ml5.min.js" type="text/javascript" />
      <script src="https://kit.fontawesome.com/e0cacda273.js" crossOrigin="anonymous"></script>
    </Helmet>
    {/* <SEO /> */}
    <header className={LayoutStyles.header}>
      <img src={logo} alt="Logo" />
      <h4>Unstable Label</h4>
      <h1>User Manual</h1>
    </header>
    <main className={LayoutStyles.contentContainer}>
      <nav className={LayoutStyles.navbar}>
        <Nav activeName={activeName} />
      </nav>
      <article className={LayoutStyles.content} ref={contentRef}>
        {children}
      </article>
    </main>
  </React.Fragment>
  )
}