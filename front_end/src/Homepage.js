import React, { Component } from 'react'
import {  Link } from "react-router-dom"
import Register from './components/Register'
// import Login from "./components/Login"
import {  BiXCircle } from "react-icons/bi";

import "./homePage.css"



  let baseURL = ""

  if(process.env.NODE_ENV === "development"){
    baseURL = "http://localhost:3001"
  } else {
    baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
  }
  console.log("Current base URL: ", baseURL)



class Homepage extends Component {
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
        showLogin: false,
        setCurrentUser: null ,
        showLogout: false,
        currentLocation: null,
        showRegister: true,
        showEdit: false
			}
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

  // handleRegister = (e) => {
  //   e.preventDefault()
  //   console.log("eTarget", e.target)
  //   fetch(baseURL + '/users/register', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username: e.target.username.value,
  //       email: e.target.email.value,
  //       password: e.target.password.value
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(resJson => {
  //     console.log(resJson)
  //     this.getPins()
  //   })
  // }

  // handleLogin = (e) => {
  //   e.preventDefault()
  //   console.log("eTarget", e.target.username.value, e.target.email.value, e.target.password.value)
  //   console.log(baseURL)
  //   fetch(baseURL + '/users/signin', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       username: e.target.username.value,
  //       email: e.target.email.value,
  //       password: e.target.password.value
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => {
  //     if (res.ok) return res.json()
  //     console.log(res)
  //   })
  //     .then(resJson => {
  //     console.log("resjson", resJson)
  //     this.getPins()
      
  //   })
   
  // }


  // getPins = () => {
	// 	fetch(baseURL + '/pins')
	// 		.then(res => {
	// 			if(res.status === 200) {
	// 				return res.json()
	// 			} else {
	// 				return []
	// 			}
	// 		}).then(data => {
	// 			console.log('data', data)
	// 			this.setState({pins: data.pins})
	// 		})
	// }

  // handleViewportChange = viewport => {
  //   this.setState({
  //     viewport: { ...this.state.viewport, ...viewport }
  //   })
  // }

  render() {
    return (
      <div className="mainPage">
        <h1 className="homePage" > This is the homepage !!!!!!! </h1>
      <Link className="map" to ="/map"> Map </Link>

        {this.state.showRegister && (
        <Register
          getPins={this.getPins}
          handleRegister={this.handleRegister}
          closeRegisterPopup={this.closeRegisterPopup}
          showRegisterPopup={this.props.showRegisterPopup}
        />
      )}
    
      {/* {this.state.showLogin && (
        <Login
          closeLoginPopup={this.closeLoginPopup}
          getPins={this.getPins}
          handleLogin={this.handleLogin}
        />
      )} */}
       <button className="button register" onClick={this.showRegisterPopup}>
        Register
      </button>
          
        <BiXCircle
          className="loginCancel"
          onClick={this.props.closeLoginPopup}
         />
      </div>
    )
  }
}

export default Homepage

