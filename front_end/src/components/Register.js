import "./register.css"
import React, { Component } from 'react'
import {Navigate } from "react-router-dom"
import {  BiXCircle } from "react-icons/bi";

  let baseURL = ""

  if(process.env.NODE_ENV === "development"){
    baseURL = "http://localhost:3001"
  } else {
    baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
  }
  console.log("Current base URL: ", baseURL)

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      success:false,
      setSuccess:false,
      error: false,
      setError: false,
      navigate: true,
      user: false,
      showRegister: true,
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

  handleRegister = (e) => {
    e.preventDefault()
    console.log("eTarget", e.target)
    fetch(baseURL + '/users/register', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      this.getPins()
      this.setState({
        user:true
      })
    })
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

      <div className="registerContainer">
        {this.state.user && (<Navigate to ="/map" />)}
          <div className="logo">
            Travel Pins
          </div>
        <h1 className="h1-register">CREATE AN ACCOUNT</h1>
        <form  onSubmit={this.handleRegister} >
          <label className="label1" htmlFor="name">Username: </label>
            <input id="username" name="username" className="username" type="text" placeholder="username" />
          <label className="label1" htmlFor="name">Email: </label>
            <input  id="email" name="email" className="email" type="email" placeholder="email" />
          <label className="" htmlFor="name">Password: </label>
            <input id="password" name="password" className="password" type="password" placeholder="password" />
          <input className="registerButton" type="submit" value="Register" />
        </form>
          <BiXCircle
            className="registerCancel"
            onClick={this.props.closeRegisterPopup}
          />
      </div>
    )
  }
}


export default Register
