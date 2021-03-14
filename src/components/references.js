import React from "react"

export default function Ref({name, children}) {
  return (
      <li id={name}>
          {children}
          <a href={`#${name}-ref`} aria-label="back to Content">↵</a>
      </li>
  )
}
