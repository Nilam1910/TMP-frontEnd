import React, { Component } from 'react'
import "./components/login.css"
import Register from './components/Register'
import Login from "./components/Login"
// import {BiXCircle } from "react-icons/bi";
import './homePage.css';
import ContactForm from './components/ContactForm';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
    showEdit: false,
    showContactForm: false
  }
}

    showContactFormPopup= () =>{
      console.log("contactForm popup triggered")
      this.setState({
        showContactForm: true
      })
    }

    closeContactFormPopup = () => {
      console.log("ContactForm popup closed")
      this.setState({
        showContactForm: false
      })
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

render() {
return (
<div>
<div>
<>
<img className="bg-image" src="https://images.pexels.com/photos/227433/pexels-photo-227433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt= ""/>
</>
<div className="header-title1">
<h1> Welcome To Travel Pins</h1>
</div>
<div className="registerDiv">
<h2 className="h2-register" >The place to store your favorite destinations.</h2>
<h3 className="h3-register">Rate it and Remember it forever.</h3>
<h5 className="h4-register">Are you ready? Register to create your account.</h5>
<button className="btn btn-secondary btn" onClick={this.showRegisterPopup}>
Register
</button>
</div>
</div>

          <div className="header-title2">
            <h1> Welcome To Travel Pins</h1>
          </div>
          <div className="contactFormDiv">
            <button className="btn btn-secondary1 btn" onClick={this.showContactForm}>
            Contact
            </button>
          </div>



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

        {this.state.showContactForm && (
          <ContactForm
          handleContactForm={this.handleContactForm} // from ContactForm
          closeContactFormPopup={this.closeContactFormPopup}
          showContactFormPopup={this.props.showContactFormPopup}
          />
        )}
          <div>
          <button className="btn btn-danger"  onClick={this.showContactFormPopup}>Contact</button>
          </div>
      </div>
    )

}
}

export default Homepage

