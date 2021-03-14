import React from "react"
import * as NavStyles from "./nav.module.css"

export default function NavEl({name, activeName, children, title}) {
  return (
    <li><a href={name} className={activeName===name ? NavStyles.active : ""}>{title}</a>
        {children}
    </li>
  )
}