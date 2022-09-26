  // const [showPopup, setShowPopup] = React.useState(true);
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
  const currentUser =""
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [showPopup, setShowPopup] = React.useState(true);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setnewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -97.92,
    latitude: 39.38,
    zoom: 4
  });

  useEffect(() => {
    const getPins = async ()=>{
      try{
        const res = await fetch(this.state.get("/pins"))
        setPins(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getPins()
  }, []);

  const handleMarkerClick = (id, latitude, longitude) => {
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude:latitude, longitude:longitude})
  }

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lnglat
    setnewPlace({
      latitude,
      longitude,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      description,
      rating,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    }

    try {
      const res = await fetch.post(this.state.get("/pins", newPin));
      setPins([...pins, res.data]);
      setnewPlace(null);
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%"}}>
      <Map
          initialViewState={{ ...viewport }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          width="100%"
          height="100%"
          transitionDuration="200"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(Viewport) => setViewport(viewport)}
          onDblClick = {handleAddClick}
        >
        {pins.map((p) =>(
        <>
          <Marker
          longitude={p.longitude}
          latitude={p.latitude}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
          >
          <Room
          style={{fontSize:viewport.zoom * 10, color: currentUsername === p.username ?"tomato" : "slateblue", cursor: "pointer"}}
          onClick={()=>handleMarkerClick(p._id, p.latitude, p.longitude)}
          />
         </Marker>

        {p._id === currentPlaceId && (
         <Popup
         longitude={p.longitude}
         latitude={p.latitude}
         closeButton={true}
         closeOnClick={false}
         anchor="left"
         onClose={()=>setCurrentPlaceId(null)}
         >
          <div className ="card">
            <label> Place </label>
            <h2 className="place">{p.title}</h2>
            <label> Review </label>
            <p className="desc">{p.description}</p>
            <label> Rating </label>
            <div className="stars">
              {Array(p.rating).fill(<Star className="star" />)}
            </div>
            <label> Information</label>
            <span className="username"> Created by <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>

          </div>
          </Popup>
        )}
        </>
      ))}
      {newPlace && (
      <Popup
        longitude={newPlace.longitude}
        latitude={newPlace.latitude}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={()=>setnewPlace(null)}
        >
        <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              placeholder="enter a title"
              onChange={(e) =>setTitle(e.target.value)}
            />
            <label>Review</label>
            <textarea
              placeholder="Tell us about your trip"
              onChange={(e) =>setDescription(e.target.value)}
            />
            <label>Rating</label>
            <select onChange={(e) =>setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="submitButton" type="submit">AddPin</button>
          </form>
        </div>
      </Popup>
       )}
        </Map>
      </div>
  );
}

// comment //
// some thing testig
// I added the Popup


export default App
