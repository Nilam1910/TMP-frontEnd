import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
import { format } from 'timeago.js';
import Register from "./components/Register"


let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

class App extends Component {
  constructor(){
		super()
			this.state = {
				pins: [],
        viewport: {
          width: "100%",
          height: "100%",
          longitude: -97.92,
          latitude: 39.38,
          zoom: 4
        },
        showPopup: false,
        currentLocation: null,
        showRegister: false,
        newPlace: null,
        setNewPlace: null,
        name: "",
        title: "",
        description: "",
        rating:parseInt(""),
			}
      this.closeRegisterPopup = this.closeRegisterPopup.bind(this)
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


  // handlePopupThree = (id) => {
  //   currentlocation(id)
  // }

  handlePopUp = (id) => {
    console.log("handle popup triggered")
    this.setState({
      currentLocation: id
    })
  }

  handlePopUpTwo = () => {
    console.log("handle popup triggered")
    this.setState({
      currentLocation: null
    })
  }

  showRegisterPopup = () => {
    console.log("register popup triggered")
    this.setState({
      showRegister: true
    })
  }

  closeRegisterPopup = () => {
    console.log("register popup closed")
    this.setState({
      showRegister: false
    })
  }

  handleRegister = (e) => {
  e.preventDefault()
  console.log("etarget", e.target)
  fetch(baseURL + '/users/register', {
    method: 'POST',
    body: JSON.stringify({
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    this.getPins()
  })
}

  handlAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    this.setState({
      setNewPlace: ({latitude, longitude})
    })
  }

  handleAddPin = (pin) => {
		const copyPins = [...this.state.pins]
		copyPins.unshift(pin)
		this.setState({pins: copyPins})
	}

  handleSubmit = (e) => {
     e.preventDefault();
     fetch("http://localhost:3001/pins", {
         method: "POST",
         body: JSON.stringify({
           username: this.state.username,
           title: this.state.title,
           description: this.state.description,
           rating: this.state.rating,
           longitude: this.state.longitude,
           latitude: this.state.latitude
         }),
         headers: { "Content-Type": "application/json"}
       }).then (res => res.json())
       .then (resJson => {
         console.log("NewPin - resJson", resJson)
         this.handleAddPin(resJson)
         this.setState({
           username: "",
           title: "",
           description: "",
           rating:parseInt(""),
           longitude: this.newPlace.latitude,
           latitude: this.newPlace.longitude
         }) // to go back on
       })
   }

   handleChange = (e) => {this.setState({
     name: e.target.value,
     title: e.target.value,
     description: e.target.value,
     rating: e.target.value,
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
            onViewportChange={() => this.handleViewportChange()}
            onDblClick={this.handleAddClick}
          >
          {this.state.pins.map((pins, index) => {
            // console.log(pins)
            return (
              <div key={pins._id}>
                <Marker
                  longitude={pins.longitude}
                  latitude={pins.latitude}
                  offsetLeft={-viewport.zoom * 5}
                  offsetTop={-viewport.zoom * 10}
                  onClick={() => this.handlePopUp(pins._id)}
                >
                </Marker>
                // {console.log("showpopup", this.state.showPopup)}
                {pins._id === this.state.currentLocation && (
                <Popup
                 longitude={pins.longitude}
                 latitude={pins.latitude}
                 closeButton={true}
                 closeOnClick={false}
                 onClose={() => this.handlePopUpTwo()}
                 anchor="left"
                 >
                  <div className ="card">
                    <label> Place </label>
                    <h4 className="place"> {pins.title} </h4>
                    <label> Review </label>
                    <p className="desc"> {pins.description}</p>
                    <label> Rating </label>
                    <div className="stars">
                    {Array(pins.rating).fill(<Star className="star" />)}

                    </div>
                    <label> Information</label>
                    <span className="username"> Created by <b> {pins.username}</b></span>
                    <span className="date"> {format(pins.createdAt)} </span>
                  </div>
                </Popup>
              )}
              </div>
        )
      })}

          <button className="button logout">
          Log out
          </button>
          <div className="buttons">
          <button className="button login">
          Log in
          </button>
          <button className="button register" onClick={this.showRegisterPopup}>
          Register
          </button>
          </div>
          {this.state.showRegister && (
          <Register
          closeRegisterPopup={this.closeRegisterPopup}
          getPins={this.getPins}
          handleRegister={this.handleRegister}
          />
        )}
          </Map>
        </div>
    );
  }
}

// comment //
// some thing testig
// I added the Popup


export default App
