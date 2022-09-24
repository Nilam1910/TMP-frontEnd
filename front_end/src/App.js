import './App.css';
import React, { Component } from 'react'
import {useState} from 'react';
import Map, {Marker} from 'react-map-gl';
import Room from '@mui/icons-material/Room';

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
      offsetLeft={-20}
      offsetTop={-10}
      >
      <Room />
     </Marker>
      </Map>
  );
}

// comment //



export default App
