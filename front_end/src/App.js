import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star}from '@material-ui/icons';
import { format } from 'timeago.js';
import Register from "./components/Register"
import NewForm from "./components/NewForm"


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
        showForm: false
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

 deletePin = (id) => {
    fetch(baseURL + '/pins/' + id, {
      method: 'DELETE'
    }).then( res => {
      const copyPins = [...this.state.pins]
      const findIndex = this.state.pins.findIndex(pin => pin._id === id)
      copyPins.splice(findIndex, 1)
      this.setState({
        pins: copyPins
      });
    });
  }

  handleAddForm = (pin) => {
    console.log("handleAddFormWorking")
    const copyPins = [...this.state.pins]
    copyPins.unshift(pin)
    this.setState({pins: copyPins})
  }

  showFormPopup = () => {
    console.log("form popup triggered")
    this.setState({
      showForm: true
    })
  }

  closeFormPopup = () => {
    console.log("form popup closed")
    this.setState({
      showForm: false
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
                  onClick={() => this.handlePopUp(pins._id, pins.latitude, pins.longitude)}
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
                    <span className="username"> Created by: <b> {pins.username}</b></span>
                    <span className="date"> Created When: <b> {format(pins.createdAt)}</b> </span>
                  </div>
                  <button
                  className="buttonDelete"
                  onClick={() => this.deletePin(pins._id)}
                  >
                  Delete Pin
                  </button>
                </Popup>
              )}
              </div>
        )
      })}
          <div className="buttons">
          <button
          className="button login"
          onClick={this.showFormPopup}
          >
            Add Pin
          </button>
          <button className="button login">
          Log in
          </button>
          <button className="button register" onClick={this.showRegisterPopup}>
          Register
          </button>
          <button className="button logout">
          Log out
          </button>
          </div>
          {this.state.showRegister && (
          <Register
          closeRegisterPopup={this.closeRegisterPopup}
          getPins={this.getPins}
          handleRegister={this.handleRegister}
          />
        )}
        {this.state.showForm && (
        <NewForm
        handleAddForm={this.handleAddForm}
        closeFormPopup={this.closeFormPopup}
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
