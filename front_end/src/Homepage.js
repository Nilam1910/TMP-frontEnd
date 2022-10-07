import React, { Component } from 'react'
import {Router, Link , Navigate, } from "react-router-dom"
import "./components/login.css"
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
        showLogin: true,
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
      showRegister: true,
      showLogin:false
    })
  }

  closeRegisterPopup = () => {
    console.log("register popup closed")
    this.setState({
      showRegister: false
    })
  }

  closeLoginPopup = () => {
    console.log("login popup closed")
    this.setState({
      showLogin: false,

    
    
    })
  }

  showLoginPopup = () => {
    console.log("login popup triggered")
    this.setState({
      showLogin: true,
      showRegister: false
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
        <h1> Welcome To Travel Pins</h1>
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
      {this.state.showLogin && (
        <Login
        closeLoginPopup={this.closeLoginPopup}
        getPins={this.props.getPins}
        handleLogin={this.props.handleLogin}
        handleLogOut={this.props.handleLogOut}
        showLoginPopup={this.props.showLoginPopup}
        
        />
      )}


    
      <button className="button register" onClick={this.showRegisterPopup}>
      Register
      </button>
    
      <button className="button register" onClick={this.showLoginPopup}>
      Login
      </button>

      </div>
     
      
      
    )
  }
}

export default Homepage