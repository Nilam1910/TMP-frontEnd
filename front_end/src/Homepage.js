import React, { Component } from 'react'
import { Link  } from "react-router-dom"
import Register from './components/Register'
import Login from "./components/Login"



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


 

  handleRegister = (e) => {
    e.preventDefault()
    console.log("etarget", e.target)
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
      console.log("resjson", resJson)
      this.getPins()
      
    })
   
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

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }




  render() {
    return (
      <div>
        <h1> This is the homepage !!!!!!!</h1>
        <Link to ="/map"> Map </Link>

      {this.state.showRegister
       && (
      <Register
      // closeRegisterPopup={this.closeRegisterPopup}
      getPins={this.getPins}
      handleRegister={this.handleRegister}
      
      />
    )}
     {this.state.showLogin && (
        <Login
        closeLoginPopup={this.closeLoginPopup}
        getPins={this.getPins}
        handleLogin={this.handleLogin}
        
        />
        )}
     
      
      </div>
    )
  }
}

export default Homepage