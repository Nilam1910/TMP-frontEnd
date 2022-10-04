import { Star } from '@material-ui/icons'
import React, { Component } from 'react'

class NewForm extends Component {
   constructor(props) {
     super(props)
     this.state = {value: ""}
   }
   
   componentsDidMount(){ // this one use to check the handleSubmit is working // only oneTime
    this.handleSubmit()
    this.handleChange() // we don't need to use fat arrow because its part of inheritance,or other way because its already bind that level of component // or because its called from this component like handleSubmit
  }
  // call this function on every keystroke (every creation)
  handleChange = (e) => {
    this.setState({
      value: e.target.value})}
  //  call this function when the user submits the form (handleSubmit do create the new item we handle over new form its responsibility to post that form in backend)(in form we doing post method)
   handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/pins", {
          method: "POST",
          body: JSON.stringify({ name: this.state.username
            // latitude: this.state.latitude,
            // longitude: this.state.longitude
          }),
          headers: { "Content-Type": "application/json"}
        }).then (res => res.json())
        .then (resJson => {
          console.log("NewForm - resJson", resJson) 
          this.props.handleAddForm(resJson)
          // const NewPin = {
          //   username: "currentUsername",
          //   title: "",
          //   desc: "",
          //   rating: "star",
          //   latitude: "newPlace.lat",
          //   longitude: "newPlace.lng"
          // }
        }).catch (error => console.error({"Error" : error}))
      }
            
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            UserName: 
            <input 
              type="text"
              value={this.state.value}
              onChange={this.handleChange} 
              // placeholder="add a pin"
          />
          </label>
            <input type="submit" value="Submit" />
        </form>   
      </>
    )
  }
}
// creating the a things the database going to send a things back to us amd now that it exists in the database so i we have to pass it to the app an the app will take a responsibility of updating state to do that we need mechanism for app to take on the responsibility
export default NewForm
