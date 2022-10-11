import React, { Component } from 'react'
import "./login.css"
import {  BiXCircle } from "react-icons/bi";
import {Navigate } from "react-router-dom"


  let baseURL = ""

    if(process.env.NODE_ENV === "development"){
    baseURL = "http://localhost:3001"
    } else {
    baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
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
          showLogin: true,
          showRegister: true,
          user:false
      }
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

    closeLoginPopup = () => {
      console.log("login popup closed")
      this.setState({
        showLogin: false,

      })
    }

    handleLogin = (e) => {
      e.preventDefault()
      console.log("eTarget", e.target.username.value, e.target.email.value, e.target.password.value)
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
        console.log("resJson", resJson)
        this.getPins()
      })
      this.setState({
       user: true
      })
    }




  render() {
    return (
      <div className = "loginContainer">
        {this.state.user && (<Navigate to ="/map" />)}
        <div className = "logo">
            Travel Pins
        </div>
            <h1 className="h1-login">Log In</h1>
          <form onSubmit={this.handleLogin} action= "/map">
            <label className="label1" htmlFor="name">Username: </label>
              <input id="username" name="username" className="username" type="text" placeholder="username" />
            <label className="label1" htmlFor="name">Email: </label>
              <input id="email" name="email" className="username" type="email" placeholder="email" />
            <label className="label1" htmlFor="name">Password: </label>
              <input id="password" name="password" className="username" type="password" placeholder="password" />
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
