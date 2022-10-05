import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
import { format } from 'timeago.js';
import Login from "./components/Login"


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
        showPopup: false,
        currentLocation: null,
        showLogin: false,
        setCurrentUser: null ,
        showLogout: false,

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

  showLoginPopup = () => {
    console.log("login popup triggered")
    this.setState({
      showLogin: true
    })
  }

  closeLoginPopup = () => {
    console.log("login popup closed")
    this.setState({
      showLogin: false
      
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    console.log("etarget", e.target.username.value, e.target.email.value, e.target.password.value)
    console.log(baseURL)
    fetch(baseURL + '/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) return res.json()
      console.log(res)
    })
      .then(resJson => {
      console.log("resjson", resJson)
      this.getPins()
    })
    this.setState({
      setCurrentUser: true,
      showLogin: false,
      showLogout: true

    })
  }

  showLogoutButton = () => {
    console.log("shows logout button")
    this.setState({
      setCurrentUser: true,
      showLogout: true
    })
  }


   handleLogOut= () => {
     this.setState({
       showLogout: true,
    setCurrentUser: false,
    showLogin: false,
  
     }
     )
     
    }
    //  fetch(baseURL + "/users/signout"), {
    //    method: "DELETE",
    //  } .then ((response) => response.json())
    //  .then ((data) => {
    //    console.log(data)
    //  })  

   


  




  


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
         {this.setCurrentUser ? (
         <button className="button logout" onClick={this.handleLogOut}> 
          Log out
          </button> ) : (
          <div className="buttons">
          <button className="button login" onClick={this.showLoginPopup}>
          Log in
          </button>
          <button className="button register">
          Register
          </button>
          </div>
          )}
          {this.state.showLogin && (
          <Login
          closeLoginPopup={this.closeLoginPopup}
          getPins={this.getPins}
          handleLogin={this.handleLogin}
          handleLogOut={this.handleLogOut}
          

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
