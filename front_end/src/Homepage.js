import React, { Component } from 'react'
import App from "./App"
import {Router, Link} from "react-router-dom"

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1> This is the homepage !!!!!!!</h1>
        <Link to ="/map"> Map </Link>
      
      </div>
    )
  }
}

export default Homepage