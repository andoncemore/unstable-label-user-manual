import React from "react"

export default function Footnote({name}) {
  return (
  <sup>
      <a aria-describedby="footnote-label" id={`${name}-ref`} href={`#${name}`}></a>
  </sup>
  )
}