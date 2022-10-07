import React, { Component } from 'react'
import {  Link } from "react-router-dom"
import Register from './components/Register'
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

