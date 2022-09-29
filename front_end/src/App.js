import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
import { format } from 'timeago.js';


let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

class App extends Component {
  constructor(props){
		super(props)
			this.state = {
				pins: [],
        viewport: {
          width: "100%",
          height: "100%",
          longitude: -97.92,
          latitude: 39.38,
          zoom: 4
        },
        currentPlaceId: null,
        setCurrentPlaceId: null,
			}
	}
  // componentDidMount - runs only once when the comp is mounted for the first time
	componentDidMount() {
		this.getPins()
	}

  getPins = () => {
		fetch(baseURL + '/pins')
			.then(res => {
				if(res.status === 200) {
					return res.json()
				} else {
					return []
				}
			}).then(data => {
				console.log('data', data)
				this.setState({pins: data.pins})
			})
	}

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleMarkerClick = (id, viewport, latitude, longitude) => {
    this.setState.setCurrentPlaceId(id)
    this.setState({
      viewport: {  ...this.state.viewport, ...viewport, latitude: latitude, longitude: longitude }
    })
  }

  render(){
    const { viewport } = this.state;
    return (
      <div style={{ height: "100vh", width: "100vw"}}>
        <Map
            initialViewState={{ ...viewport }}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={this.handleViewportChange}
          >
          {this.state.pins.map((pins, i) => {
            return (
              <>
                <Marker
                  longitude={pins.longitude}
                  latitude={pins.latitude}
                  offsetLeft={-viewport.zoom * 5}
                  offsetTop={-viewport.zoom * 10}
                >
                  <Room style={{fontSize:viewport.zoom * 10, color: "slateblue", cursor: "pointer"}}
                    onClick={() => this.handleMarkerClick(pins._id, pins.latitude, pins.longitude)}
                  />
                </Marker>
                {pins._id === this.state.currentPlaceId && (
                <Popup
                 longitude={pins.longitude}
                 latitude={pins.latitude}
                 closeButton={true}
                 closeOnClick={false}
                 anchor="left"
                 >
                  <div className ="card">
                    <label> Place </label>
                    <h4 className="place"> {pins.title} </h4>
                    <label> Review </label>
                    <p className="desc"> {pins.description}</p>
                    <label> Rating </label>
                    <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    </div>
                    <label> Information</label>
                    <span className="username"> Created by <b> {pins.username}</b></span>
                    <span className="date"> {format(pins.createdAt)} </span>
                  </div>
                </Popup>
              )}
              </>
        )
      })}
          </Map>
        </div>
    );
  }
}

// comment //
// some thing testig
// I added the Popup


export default App
