import "./editPin.css"
import React, { Component } from 'react'
import {BiXCircle } from "react-icons/bi";

let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}

class EditPin extends Component {
   constructor(props) {
     super(props)
     this.state = {
       title: this.props.pins[this.props.pinindex].title,
       description: this.props.pins[this.props.pinindex].description,
       rating: this.props.pins[this.props.pinindex].rating,
       longitude: this.props.pins[this.props.pinindex].longitude,
       latitude:this.props.pins[this.props.pinindex].latitude
     }
   }

   handleSubmit = (e, index) => {
        e.preventDefault()
        console.log(e)
        fetch(baseURL +'/pins/' + this.props.pins[index]._id, {
            method: 'PUT',
            body: JSON.stringify({
              title: e.target.title.value,
              description: e.target.description.value,
              longitude: parseFloat(e.target.longitude.value),
              latitude: parseFloat(e.target.latitude.value)
            }),
            headers: {
              'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(resJson => {
          this.props.pins[index].title = e.target.title.value
          this.props.pins[index].description = e.target.description.value
          this.props.pins[index].longitude = e.target.longitude.value
          this.props.pins[index].latitude = e.target.latitude.value
        })
        .catch(err => (console.log(err)))
    }

  render() {
    {console.log(this.props.pinindex)}
    return (
      <div className="formContainer">
      <h1 className="h1-register">Edit PIN</h1>
        <form onSubmit={(e)=>{this.handleSubmit(e, this.props.pinindex)}}>
          <label className="label1" htmlFor="title"> Title: </label>
            <input
              className="username"
              type="text"
              id="title"
              name="title"
              defaultValue={this.state.title}
              onChange={(e) => this.setState.title = e.target.value}
              placeholder="enter a title"
          />
          <label className="label1" htmlFor="description"> Description: </label>
            <input
              className="username"
              type="text"
              id="description"
              defaultValue={this.state.description}
              onChange={(e) => this.setState.description = e.target.value}
              name="description"
              placeholder="enter a description of your trip!"
          />
          <label className="label1" htmlFor="longitude"> Longitude: </label>
            <input
              className="username"
              id="longitude"
              defaultValue={this.state.longitude}
              onChange={(e) => this.setState.longitude = e.target.value}
              name="longitude"
              placeholder="enter the longitude"
          />
          <label className="label1" htmlFor="latitude"> Latitude: </label>
            <input
              className="username"
              defaultValue={this.state.latitude}
              onChange={(e) => this.setState.latitude = e.target.value}
              id="latitude"
              name="latitude"
              placeholder="enter the latitude"
          />
            <input type="submit" value="Edit Pin" />
            <BiXCircle
            className="registerCancel"
            onClick={this.props.closeEditPopup}
            />
        </form>
      </div>
    )
  }
}
// creating the a things the database going to send a things back to us amd now that it exists in the database so i we have to pass it to the app an the app will take a responsibility of updating state to do that we need mechanism for app to take on the responsibility
export default EditPin
