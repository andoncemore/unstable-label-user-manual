import React, {useRef} from 'react';
// import GoogleStreetview from 'react-google-streetview'
import './Navigating.css';
import {GoogleMap, StreetViewPanorama } from "@react-google-maps/api"


const Navigating = ({startLocation, setMapPosition, isLoaded}) => {
  
  const streetviewOptions = {
    disableDefaultUI: true,
    scrollwheel: false,
    enableCloseButton:false
  }

  const pano = useRef(null);

  const onPositionChanged = () => {
    if(pano.current){
      setMapPosition("pos", {lat: pano.current.position.lat(), lng: pano.current.position.lng()})
    }
  }

  const onPovChanged = () => {
    // console.log("POV changed")
    if(pano.current){
      setMapPosition("pov", {pitch: pano.current.pov.pitch, heading: pano.current.pov.heading})
    }
    // setMapPosition("pov", {pitch: evt.pitch, heading: evt.heading})
  }

  // const onPanoChanged = (evt) => {
  //   console.log("Pano CHanged");
  //   setMapPosition("id", evt)
  // }

  return(
    <div style={{position: "relative"}}>
      <div className="filler"></div>
      <div className="descriptionOverlay">
        <h1>walk around to find an location and image perspective</h1>
      </div>
      <div className="streetView">
        {isLoaded && 
        <GoogleMap
          mapContainerStyle={{height: "100%"}}
          options={{disableDefaultUI: true}}
          zoom={15}
          center={startLocation}
        >
          <StreetViewPanorama 
            options={streetviewOptions}
            visible={true}
            position={startLocation}
            onLoad={(elm) => {pano.current=elm}}
            onPositionChanged={onPositionChanged}
            onPovChanged={onPovChanged}
          />
        </GoogleMap>}

        {/* <ReactStreetView 
          apiKey="AIzaSyDz-wPsGB_lG2dyNjUmHnR97jzA4QCZeF4"
          streetViewPanoramaOptions={streetviewOptions}
          onPositionChanged={onPositionChanged}
          onPovChanged={onPovChanged}
        /> */}
      </div>
    </div>
      
  );
}

export default Navigating;
