import React, { Component } from 'react'

class NewPin extends Component {
   constructor(props) {
     super(props)
     this.state={
     name: "",
     title: "",
     description: "",
     rating:parseInt(""),
     longitude:parseInt(""),
     latitude:parseInt(""),
    }
   }
   // call this function on every keystroke (every creation)
   handleChange = (e) => {this.setState({
     name: e.target.value,
     title: e.target.value,
     description: e.target.value,
     rating: e.target.value,
     longitude: e.target.value,
     latitude: e.target.value
   })
 }

   // call this function when the user submits the form (handleSubmit do create the new item we handle over new form its responsibility to post that form in backend)(in form we doing post method)
   handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/pins", {
          method: "POST",
          body: JSON.stringify({
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            rating: this.state.rating,
            longitude: this.state.longitude,
            latitude: this.state.latitude
          }),
          headers: { "Content-Type": "application/json"}
        }).then (res => res.json())
        .then (resJson => {
          console.log("NewPin - resJson", resJson)
          this.props.handleAddPin(resJson)
          this.setState({
            username: "",
            title: "",
            description: "",
            rating:parseInt(""),
            longitude: parseInt(""),
            latitude:parseInt("")
          }) // to go back on
        })
    }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Username: </label>
        <input id="name" name="username" className="username" type="text" placeholder="username" onChange={this.handleChange} value={this.state.username} />
        <label htmlFor="name">Title: </label>
        <input  id="title" name="title" type="text" placeholder="title" onChange={this.handleChange} value={this.state.title} />
        <label htmlFor="name">Rating: </label>
        <input id="rating" name="rating" type="number" placeholder="rating" onChange={this.handleChange} value={this.state.rating} />
        <input className="registerButton" type="submit" value="Create Pin" />
        </form>
      </>
    )
  }
}
// creating the a things the database going to send a things back to us amd now that it exists in the database so i we have to pass it to the app an the app will take a responsibility of updating state to do that we need mechanism for app to take on the responsibility
export default NewPin
