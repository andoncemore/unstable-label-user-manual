import React from "react"

const ExploreTooltip = ({ name, description, location}) => {

    return (
        <div className="tooltip-content">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default ExploreTooltip;