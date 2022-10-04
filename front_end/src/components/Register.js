import "./register.css"
import {Room, Cancel }from '@material-ui/icons';
import React, { Component, useEffect, useState, useRef } from 'react'
import App from '../App.js'

let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      success:false,
      setSuccess:false,
      error: false,
      setError: false
    }
  }

    render() {
    return (
      <div className="registerContainer">
        <div className="logo">
        <Room />
        Travel Pins
        </div>
        <h1 className="h1-register">CREATE AN ACCOUNT</h1>
        <form onSubmit={this.props.handleRegister}>
          <label className="label1" htmlFor="name">Username: </label>
          <input id="name" name="username" className="username" type="text" placeholder="username" />
          <label className="label1" htmlFor="name">Email: </label>
          <input  id="email" name="email" className="email" type="email" placeholder="email" />
          <label className="" htmlFor="name">Password: </label>
          <input id="password" name="password" className="password" type="password" placeholder="password" />
          <input className="registerButton" type="submit" value="Register" />
        </form>
        <Cancel
        className="registerCancel"
        onClick={this.props.closeRegisterPopup}
        />
      </div>
    )
  }
}

export default Register
