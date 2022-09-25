import './App.css';
import React, { Component } from 'react'
import {useState} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
// Changed how we imported the icons


let baseURL = ""
if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    longitude: -97.92,
    latitude: 39.38,
    zoom: 4
  })
  return (
   
    <Map
        initialViewState={{ ...viewport }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        transitionDuration="200"
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >

      <Marker
      longitude={-97.4}
      latitude={38}
      offsetLeft={-3.5 * viewport.zoom}
      offsetTop={-10 * viewport.zoom}
      >
      <Room style={{fontSize:viewport.zoom * 10}}/>
     </Marker>


     <Popup 
     longitude={-97.4} 
     latitude={38}
     closeButton={true}
     closeOnClick={false}
     anchor="left"  
     >  
      <div className ="card">
        <label> Place </label>
        <h4 className="place"> Manhattan </h4>
        <label> Review </label>
        <p className="desc"> I love central park!</p>
        <label> Rating </label>
        <div className="stars">
        <Star/>
        <Star/>
        <Star/>
        <Star/>
        <Star/>
        </div>
        <label> Information</label>
        <span className="username"> Created by <b> Tony </b></span>
        <span className="date"> 1 hour ago </span>
        
      </div>
      </Popup>


      </Map>
  );
}

// comment //
// some thing testig
// I added the Popup 


export default App
