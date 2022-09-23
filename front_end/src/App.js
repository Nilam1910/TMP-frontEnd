import './App.css';
import React, { Component } from 'react'

let baseURL = ""
if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

class  App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pins:[]
    }
  }
  
  render() {
    return (
      <div>
        <h1>Travel Pins</h1>
      </div>
    )
  }
}

export default App

