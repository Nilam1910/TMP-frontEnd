import React, {Component} from 'react'
import { BiXCircle } from "react-icons/bi";
import {Navigate } from "react-router-dom"
import"./ContactForm.css"

let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
}
console.log("Current base URL: ", baseURL)

class ContactForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
        success:false,
        setSuccess:true,
        error: false,
        setError: false,
        navigate: true,
        user: false,
        showContactForm: true
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

  handleContactForm = (e) => {
    e.preventDefault()
    console.log("eTarget", e.target)
    fetch(baseURL + "/user/register",{
        method: "POST",
        body: JSON.stringify({
            username:e.target.username.value,
            email: e.target.email.value,
            message: e.target.message.value
          }),
        headers: {
          "Content-Type" : "application/json"
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

  showContactFormPopup = () => {
    console.log("Contact Popup Triggered")
    this.setState({
      showContact: true
    })
  }

  closeContactFormPopup = () => {
    console.log("ContactForm popup closed")
    this.setState({
      showContactForm: false
    })
  }

  render() {
    return (

      <div className="contactFormContainer">
        {this.state.user && (<Navigate to ="/map" />)}
        <div className="logo-c">Provide Your Info Here</div>
          <h1 className="h-contactForm">Contact Form</h1>
        <form  onSubmit={this.handleContactForm} >
          <label className="label1" htmlFor="name">Username: </label>
              <input className="username" id="username" name="username"  type="text" placeholder="username" />
          <label className="label1" htmlFor="name">Email: </label>
              <input  id="email" name="email" className="username" type="email" placeholder="email" />
          <label className="lab-mess" htmlFor="name">Message: </label>
              <input className="message" id="message" name="message"  type="message" placeholder="message" />
            <input className="contactFormButton" type="submit" value="Submit" />
        </form>
        <BiXCircle
          className="contactFormCancel"
          onClick={this.props.closeContactFormPopup}
        />
      </div>
    )
  }
}

export default ContactForm

