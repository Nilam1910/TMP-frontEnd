import "./newform.css"
import { Star, Cancel } from '@material-ui/icons'
import React, { Component } from 'react'


class NewForm extends Component {
   constructor(props) {
     super(props)
     this.state = {username: ""}
   }
   componentsDidMount(){ // this one use to check the handleSubmit is working // only oneTime
    this.handleSubmit()
    this.handleChange() // we don't need to use fat arrow because its part of inheritance,or other way because its already bind that level of component // or because its called from this component like handleSubmit
  }
  // call this function on every keystroke (every creation)
  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  //  call this function when the user submits the form (handleSubmit do create the new item we handle over new form its responsibility to post that form in backend)(in form we doing post method)
   handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/pins", {
          method: "POST",
          body: JSON.stringify({
            username: this.state.username,
            title: this.state.value,
            description: this.state.value,
            rating: this.state.value,
            longitude: this.state.value,
            latitude: this.state.value
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then (res => res.json())
        .then (resJson => {
          console.log("NewForm - resJson", resJson)
          this.props.handleAddForm(resJson)
          this.setState({username: ''})
        })
      }
  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
          <label className="label1" htmlFor="username"> UserName: </label>
            <input
              className="username"
              type="text"
              id="name"
              username="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="add a pin"
          />
            <input type="submit" value="Create a Pin" />
            <Cancel
            className="registerCancel"
            onClick={this.props.closeFormPopup}
            />
        </form>
      </div>
    )
  }
}
// creating the a things the database going to send a things back to us amd now that it exists in the database so i we have to pass it to the app an the app will take a responsibility of updating state to do that we need mechanism for app to take on the responsibility
export default NewForm
