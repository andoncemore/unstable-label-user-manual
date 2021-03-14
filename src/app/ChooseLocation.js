import React, {useState, useRef} from 'react';
// import WrappedMap from "./Map"
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import './ChooseLocation.css';

const ChooseLocation = ({isLoaded, setStartLocation, startLocation}) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null)

  function draggingEnded(evt){
    console.log({lat: evt.latLng.lat(), lng: evt.latLng.lng()});
    setStartLocation({lat: evt.latLng.lat(), lng: evt.latLng.lng()})
    // updateLocation("pos", {lat: evt.latLng.lat(), lng: evt.latLng.lng()})
  }

  function autocompletePicked(){
    console.log(autocomplete.getPlace())
    if(autocomplete !== null){
      if("geometry" in autocomplete.getPlace()){
        let loc = autocomplete.getPlace().geometry.location;
        // console.log({lat:loc.lat(), lng: loc.lng()});
        setStartLocation({lat:loc.lat(), lng: loc.lng()})
      }
      else{
        inputRef.current.value = "";
      }
      // 
    }
  }

  

  return(
    <div style={{position: "relative"}}>
      <div className="filler"></div>
      <div className="mapChooser">
        {isLoaded &&
          <GoogleMap
            mapContainerStyle={{height: "100%"}}
            options={{disableDefaultUI: true}}
            zoom={15}
            center={startLocation}
          >
            <Marker 
              position={startLocation}
              draggable={true}
              onDragEnd={draggingEnded}
            />
            <Autocomplete 
              onLoad={(elm) => setAutocomplete(elm)}
              onPlaceChanged={autocompletePicked}
              types={["geocode"]}
            >
              <input ref={inputRef} type="text" placeholder="Search for Neighborhoods" />
            </Autocomplete>
          </GoogleMap>
        }

        {/* <LoadScript
          googleMapsApiKey="AIzaSyDz-wPsGB_lG2dyNjUmHnR97jzA4QCZeF4"
          libraries={libraries}
        >
          <GoogleMap
            zoom={15}
            options={{disableDefaultUI: true}}
            mapContainerStyle={{height: "100%"}}
            center={{lat: 42.345573,lng: -71.098326}}
          >
            <Marker
              position={{lat: 42.345573,lng: -71.098326}}
              draggable={true}
              onDragEnd={draggingEnded}
            />
            <Autocomplete 
              onLoad={(elm) => setAutocomplete(elm)}
              onPlaceChanged={autocompletePicked}
              types={["(regions)"]}
            >
              <input type="text" placeholder="Search" />
            </Autocomplete>
          </GoogleMap>
        </LoadScript> */}
      </div>
    </div>
  );
}

export default ChooseLocation;


