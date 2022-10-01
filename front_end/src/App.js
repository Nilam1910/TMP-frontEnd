import './App.css';
import React, { Component } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star }from '@material-ui/icons';
import { format } from 'timeago.js';
import NewPin from "./components/NewPin"


let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = "Your heroku backend url here"
}
console.log("Current base URL: ", baseURL)

class App extends Component {
  constructor(props){
		super(props)
			this.state = {
				pins: [],
        viewport: {
          width: "100%",
          height: "100%",
          longitude: -97.92,
          latitude: 39.38,
          zoom: 4
        },currentLocation: null,
			}
	}
  
  // componentDidMount - runs only once when the comp is mounted for the first time
	componentDidMount() {
		this.getPins()
    this.handleViewportChange()
    this.handlePopUp()
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
  
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };
  handleAddPin = (pin) => {
    const copyPins = [...this.state.pins]
    copyPins.unshift(pin)
    this.setState({pins: copyPins})
  }
 
  handlePopUp = (id) => {
    console.log("handle popup triggered")
    this.setState({
      currentLocation: id
    })
  }

  handlePopUpTwo = () => {
    console.log("handle popup triggered")
    this.setState({
      currentLocation: null
    })
  }
  render(){
    const { viewport } = this.state;
    return (
      <div style={{ height: "100vh", width: "100vw"}}>
        <Map
            initialViewState={{ ...viewport }}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={this.handleViewportChange}
          >
            {/* <NewPin handleAddPin={this.handleAddPin}/> */}
          {this.state.pins.map((pins, i) => {
            return (
              <>
                <Marker
                  key={pins._id}
                  longitude={pins.longitude}
                  latitude={pins.latitude}
                  offsetLeft={-viewport.zoom * 5}
                  offsetTop={-viewport.zoom * 10}
                  onClick={() => this.handlePopUp(pins._id)}
                  >
                  <Room 
                  style={{fontSize:viewport.zoom * 10,
                    // color:pins.username === currentUser ? "skyblue" : "Red",
                    color: "red",
                    cursor: "pointer",
                  }}
                  // onClick={()=>this.handleAddPin(pins._id)}
                  />
                </Marker>
                {/* {console.log("showpopup", this.state.showPopup)} */}
                {/* {pins._id === currentPlacedId &&} */}
                {pins._id === this.state.currentLocation && (
                <Popup
                longitude={pins.longitude}
                latitude={pins.latitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => this.handlePopUpTwo()}
                // onClose={() => togglePopup(false)}
                anchor= "top"
                >
                  <div className="card">
                    <label>Title</label>
                      <h2 className="place">{pins.title}</h2>
                    <label>Description</label>
                      <p className="desc">{pins.description}</p>
                    <label>Rating</label>
                      <div className="stars">
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                      </div>
                      <label> Information</label>
                      <span className="username"> Created by: <b>{pins.username}</b></span>
                      <span className="date">{format(pins.createdAt)}</span>
                    </div>  
                </Popup>
              )} 
 
                  {/* <tr key = {pins._id}>
                  <td>{pins.name}</td>
                </tr> */}

              </>
          )
        })}
        <NewPin handleAddPin={this.handleAddPin}/> 
          </Map>
        </div>
    );
  }
}

// comment //
// some thing testig
// I added the Popup


export default App
