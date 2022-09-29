import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
// import { format } from 'timeago.js';
import NewPin from "./components/NewPin"


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
    });
  };
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
            <NewPin />
          {this.state.pins.map((pins, i) => {
            return (
              <>
                <Marker
                  longitude={pins.longitude}
                  latitude={pins.latitude}
                  offsetLeft={-viewport.zoom * 5}
                  offsetTop={-viewport.zoom * 10}
                >
                </Marker>
                  <Room style={{fontSize:viewport.zoom * 10, color: "slateblue"}}/>
                  <tr key = {pins._id}>
                    <td>{pins.name}</td>
                  </tr>
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
