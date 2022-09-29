import React, { Component } from 'react'

class NewPin extends Component {
   constructor(props) {
     super(props)
     this.state = {name: ""}
   }
   // call this function on every keystroke (every creation)
   handleChange = (e) => {this.setState({name: e.target.value})}

   componentsDidMount(){ // this one use to check the handleSubmit is working // only oneTime
     this.handleSubmit() // we don't need to use fat arrow because its already bind that level of component // or because its called from this component like handleSubmit
   }
   // call this function when the user submits the form (handleSubmit do create the new item we handle over new form its responsibility to post that form in backend)(in form we doing post method)
   handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:3001/pins", {
          method: "POST",
          body: JSON.stringify({username: this.state.username}),
          headers: { "Content-Type": "application/json"}
        }).then (res => res.json())
        .then (resJson => {
          console.log("NewPin - resJson", resJson) 
          this.setState({username: ""}) // to go back on
        })
    }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">UserName: </label>
            <input 
              type="text" 
              id="username" 
              username="username" 
              onChange={this.handleChange} 
              value={this.state.username}
              placeholder="add a pin"
          />
            <input type="submit" value="Add a reason to Visit" />
        </form>   
      </>
    )
  }
}

export default NewPin
