import React, { Component } from 'react'
import {Router, Link , Navigate, } from "react-router-dom"
import "./components/login.css"
import "./homePage.css"
import Register from './components/Register'
import Login from "./components/Login"
import {BiXCircle } from "react-icons/bi";




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
        showRegister: false,
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

  render() {
    return (
      <div>
        <h1> This is the homepage !!!!!!!</h1>
        <Link to ="/map"> Map </Link>

      {/* {this.state.showLogin && (
        <Login
        getPins={this.getPins}
        handleLogin={this.handleLogin}
        />
        )} */}




      {this.state.showRegister
       && (
      <Register
      getPins={this.props.getPins}
      handleRegister={this.props.handleRegister}
      closeRegisterPopup={this.closeRegisterPopup}
      showRegisterPopup={this.props.showRegisterPopup}

     />
     )}

      <button className="button register" onClick={this.showRegisterPopup}>
      Register
      </button>

      </div>



    )
  }
}

export default Homepage
