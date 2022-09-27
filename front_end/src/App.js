import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
import { formatMs } from '@material-ui/core';
import { format } from 'timeago.js';


let baseURL = ""
if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

function App() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -97.92,
    latitude: 39.38,
    zoom: 4
  });

  return (
    <div style={{ height: "100vh", width: "100vw"}}>
      <Map
          initialViewState={{ ...viewport }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          width="100%"
          height="100%"
          transitionDuration="200"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(Viewport) => setViewport(viewport)}
        >
        <>
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
           anchor="left"
           >
            <div className ="card">
              <label> Place </label>
              <h4 className="place"> Manhattan </h4>
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
        </>
        </Map>
      </div>
  );
}

// comment //
// some thing testig
// I added the Popup


export default App
