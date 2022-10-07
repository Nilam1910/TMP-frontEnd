import "./newForm.css"
import React, { Component } from 'react'
import {  BiXCircle } from "react-icons/bi";



class NewForm extends Component {
   constructor(props) {
     super(props)
     this.state = {
       username: "",
       title: "",
       description: "",
       rating: "",
       longitude: "",
       latitude:"",
      
     }
   }
   componentsDidMount(){ // this one use to check the handleSubmit is working // only oneTime
    this.handleSubmit()
    this.handleChange() // we don't need to use fat arrow because its part of inheritance,or other way because its already bind that level of component // or because its called from this component like handleSubmit
  }
    // call this function on every keystroke (every creation)

    //  call this function when the user submits the form (handleSubmit do create the new item we handle over new form its responsibility to post that form in backend)(in form we doing post method)
   handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/pins`, {
          method: "POST",
          body: JSON.stringify({
            username: e.target.username.value,
            title: e.target.title.value,
            description: e.target.description.value,
            rating: parseFloat(e.target.rating.value),
            longitude: parseFloat(e.target.longitude.value),
            latitude: parseFloat(e.target.latitude.value)
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then (res => {
          if(res.ok) return res.json()
        })
        .then (resJson => {
          console.log("NewForm - resJson", resJson)
          this.props.handleAddPin(resJson)
          
        })
      }
     
  render() {
    return (
      <div className="formContainer">
        <div className="logo">
          Travel Pins
        </div>
          <p className="h1-register">CREATE A PIN</p>
        <form onSubmit={this.handleSubmit}>

          <label className="label" htmlFor="username"> UserName: </label>
            <input
              className="username"
              type="text"
              id="name"
              name="username"
              placeholder="Enter Username"
            />
          <label className="label1" htmlFor="title"> Title: </label>
            <input
              className="username"
              type="text"
              id="title"
              name="title"
              placeholder="enter location of the place"
          />
          <label className="label1" htmlFor="description"> Description: </label>
            <input
              className="username"
              type="text"
              id="description"
              name="description"
              placeholder="enter a description of your trip!"
            />
          <label className="label1" htmlFor="rating"> Rating: </label>
            <input
            className="username"
            id="rating"
            name="rating"
            placeholder="enter your rating "
            />
          <label className="label1" htmlFor="longitude"> Longitude: </label>
            <input
              className="username"
              id="longitude"
              name="longitude"
              placeholder="enter the longitude"
            />
          <label className="label1" htmlFor="latitude"> Latitude: </label>
            <input
              className="username"
              id="latitude"
              name="latitude"
              placeholder="enter the latitude"
            />
            <input class ="create" type="submit" value="Create a Pin" /> 
          </form>
              <BiXCircle
                className="loginCancel"
                onClick={this.props.closeLoginPopup}
              />  

      </div>
    )
  }
}
// creating the a things the database going to send a things back to us and now that it exists in the database so i we have to pass it to the app an the app will take a responsibility of updating state to do that we need mechanism for app to take on the responsibility

export default NewForm
