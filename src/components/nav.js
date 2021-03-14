import React, {useState} from "react"
import * as NavStyles from "./nav.module.css"
import NavEl from "./navElement"

export default function Nav({activeName}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
    <React.Fragment>
        <div className={NavStyles.mobile}>
            <div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className={`${NavStyles.button} ${NavStyles.icon}`}>
                    {mobileOpen ? <i className='fas fa-times'></i> : <i className="fas fa-arrows-alt-h"></i>}
                </button>
                <h4>Table of Contents</h4>
            </div>
            <a href="https://unstable-label.glitch.me" className={NavStyles.button}>Visit App</a>
        </div>
        <div className={NavStyles.list} style={{left: mobileOpen ? "0" : ""}}>
            <div className={NavStyles.tocSubtitle}>Getting Setup</div>
            <ul>
                <NavEl title="Introduction" name="#introduction" activeName={activeName} />
                <NavEl title="System Values" name="#systemValues" activeName={activeName}>
                    <ul>
                        <NavEl title="Situated Perspective" name="#situatedPerspective" activeName={activeName} />
                        <NavEl title="Collective Experience" name="#collectiveExperience" activeName={activeName} />
                        <NavEl title="Slowness" name="#slowness" activeName={activeName} />
                    </ul>
                </NavEl>
                <NavEl title="Selecting Datasource" name="#selectingDatasource" activeName={activeName}>
                    <ul>
                        <NavEl title="Google Street View" name="#googleStreetView" activeName={activeName} />
                        <li><p className={NavStyles.invalid}>Roaming View Shoes</p></li>
                        <li><p className={NavStyles.invalid}>Neighborhood Surveyor</p></li>
                    </ul>
                </NavEl>
            </ul>
            <div className={NavStyles.tocSubtitle}>Operating Instructions</div>
            <ul>
                <NavEl title="Using the Interface" name="#usingTheInterface" activeName={activeName} />
                <NavEl title="Navigating your Data" name="#navigatingYourData" activeName={activeName} />
                <NavEl title="Creating Categories" name="#creatingCategories" activeName={activeName} />
                <NavEl title="Drawing Data" name="#drawingData" activeName={activeName} />
                <NavEl title="Exploring the Model" name="#exploringTheModel" activeName={activeName} />
            </ul>
            <div className={NavStyles.tocSubtitle}>Appendix</div>
            <ul>
            <NavEl title="References" name="#references" activeName={activeName} />
            </ul>
            <a href="https://unstable-label.glitch.me" className={NavStyles.button}>Visit App</a>
        </div>
    </React.Fragment>
  )
}