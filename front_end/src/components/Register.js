import "./register.css"
import {Room }from '@material-ui/icons';
import React, { Component } from 'react'


let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

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
        <form onSubmit={this.props.handleRegister} action="/map">
          <label className="label1" htmlFor="name">Username: </label>
          <input id="username" name="username" className="username" type="text" placeholder="username" />
          <label className="label1" htmlFor="name">Email: </label>
          <input  id="email" name="email" className="email" type="email" placeholder="email" />
          <label className="" htmlFor="name">Password: </label>
          <input id="password" name="password" className="password" type="password" placeholder="password" />
          <input className="registerButton" type="submit" value="Register" />
         
        </form>
        <form onSubmit={this.props.handleLogin} action="/map">
          <input  className="registerButton" type="submit" value="Login" />
          </form>
        {/* <Cancel
        className="registerCancel"
        onClick={this.props.closeRegisterPopup}
        /> */}
      </div>
    )
  }
}

export default Register
