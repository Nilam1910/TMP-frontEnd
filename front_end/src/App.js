import './App.css';
import React from 'react'
import {useState} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';


let baseURL = ""
if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

function App() {
  const [viewport, setViewport] = useState({
    width:"100%",
    height: "100%",
    longitude: -97.92,
    latitude: 39.38,
    zoom: 4
  })
  return (
    <Map
    initialViewState={{ ...viewport }}
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    width="100%"
    height="100%"
    transitionDuration="200"
    mapStyle="mapbox://styles/mapbox/streets-v9"
    onViewportChange={(Viewport) => setViewport(viewport)}
        
      >
        <div style={{ height: "100vh", width: "100%"}}></div>
      <Marker
      longitude={-97.4}
      latitude={38}
      offsetLeft={-3.5 * viewport.zoom}
      offsetTop={-10 * viewport.zoom}
      >
      <Room style={{fontSize:viewport.zoom * 10, color: "slateblue"}}/>
     </Marker>
     <Popup 
      longitude={-97.4} 
      latitude={38}
      closeButton={true}
      closeOnClick={false}
      anchor="top"  
     >  
      <div className ="card">
          <label> Place </label>
        <h2 className="place"> Manhattan </h2>
          <label> Review </label>
        <p className="desc"> I love central park!</p>
          <label> Rating </label>
        <div className="stars">
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
        </div>
        <label> Information</label>
        <span className="username"> Created by <b> Tony </b></span>
        <span className="date"> 1 hour ago </span>

      </div>
      </Popup>
      </Map>
  );
}




export default App
