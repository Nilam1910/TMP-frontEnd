import React, { Component } from 'react'
import {Router, Link , Navigate, } from "react-router-dom"
import "./components/login.css"
import Register from './components/Register'
import Login from "./components/Login"
import {BiXCircle } from "react-icons/bi";
import './homePage.css';




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
          <img className="bg-image" src="https://images.pexels.com/photos/227433/pexels-photo-227433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="header-title1">
            <h1> Welcome To Travel Pins</h1>
          </div>
          <div className="registerDiv">
            <h2 className="h2-register" >The place to store your favroite destinations.</h2>
            <h3 className="h3-register">Rate it and Remember it forver.</h3>
            <h5 className="h4-register">Are you ready? Register to create your account.</h5>
            <button className="btn btn-secondary btn" onClick={this.showRegisterPopup}>
            Register
            </button>
          </div>

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




      <button className="btn btn-primary" onClick={this.showLoginPopup}>
      Login
      </button>

      </div>



    )
  }
}

export default Homepage
