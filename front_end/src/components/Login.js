import React, { Component } from 'react'
import {BiXCircle } from "react-icons/bi";
import "./login.css"

  let baseURL = ""

    if(process.env.NODE_ENV === "development"){
    baseURL = "http://localhost:3001"
    } else {
    baseURL = "Your heroku backend url here"
    }
    console.log("Current base URL: ", baseURL)

  class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
          success:false,
          error: false,
          setError: false,
          setSuccess: true,
      }
    }

  render() {
    return (
      <div className = "loginContainer">
        <h1 className="h1-login">Log In</h1>
          <form onSubmit={this.props.handleLogin}>
            <label className="label1" htmlFor="name">Username: </label>
              <input id="username" name="username" className="username" type="text" placeholder="username" />
            <label className="label1" htmlFor="name">Email: </label>
              <input id="email" name="email" className="email" type="email" placeholder="email" />
            <label className="password" htmlFor="name">Password: </label>
              <input id="password" name="password" className="password" type="password" placeholder="password" />
              <input className="loginButton" type="submit" value="Login" />
          </form>
            <BiXCircle
            className="loginCancel"
            onClick={this.props.closeLoginPopup}
            />
      </div>


    )
  }
}




export default Login
