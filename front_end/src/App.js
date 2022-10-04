import './App.css';
import React, { Component } from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star}from '@material-ui/icons';
import { format } from 'timeago.js';
import NewForm from "./components/NewForm"
import 'mapbox-gl/dist/mapbox-gl.css';


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
        },currentLocation: "",
        newPlace: null, // has to equal with line 102 consol.log()
			}
	}
  
  // componentDidMount - runs only once when the comp is mounted for the first time
	componentDidMount() {
		this.getPins()
    // this.handleViewportChange()
    // this.handlePopUp()
    // this.handleAddPin()
    // this.handleAddClick()
    // this.handleMarkerPin()
	}
  getPins = () => {
    fetch(baseURL + '/pins')
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return  []
      }
    }).then(data => {
      this.setState({pins: data.pins})
      console.log(this.state.pins)
    })
  }

  
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleAddForm = (pin) => {
    console.log("handleAddFormWorking")
    const copyPins = [...this.state.pins]
    copyPins.unshift(pin)
    this.setState({pins: copyPins})
    
  }
 
  handlePopUp = (id) => {
    // console.log("handle popup triggered")
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

  // handleMarkerClick = (_id,lat,lng) => {
  //   this.setState({
  //     currentPlaceId:(_id),
  //     viewport:({...this.state.viewport, latitude:lat, longitude:lng})
  //   })
  // }

  handleAddClick = (e) => {
    // console.log(e.lngLat.lat
    //   )
    const {lng, lat} = e.lngLat
    this.setState({
      newPlace: {
        logitude:lng,
        latitude:lat }
    })
    console.log(lng, lat)
    console.log(this.state.newPlace)
  }

  render(){
    const { viewport, pins } = this.state;
    return (
      <div style={{ height: "100vh", width: "100vw"}}>
        <Map
            ref={this.mapRef}
            initialViewState={{ ...viewport }}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={(nextViewport) => this.setState({nextViewport})}
            onClick={this.handleAddClick}
            // onDbiClick = {this.handleAddPin}
          >
            <NewForm handleAddForm={this.handleAddForm}/> 
            
          {this.state.pins.map((pins, i) => {
            return (
              <>
                <Marker
                  key={pins._id}
                  username={pins.username}
                  longitude={pins.longitude}
                  latitude={pins.latitude}
                  offsetLeft={-viewport.zoom * 5}
                  offsetTop={-viewport.zoom * 10}
                  onClick={() => this.handlePopUp()}
                  >
                  <Room 
                  style={{fontSize:viewport.zoom * 10,
                    // color:pins.username === currentUser ? "skyblue" : "Red",
                    color: "red",
                    cursor: "pointer",
                  }}
                  // onClick = {() => handleMarkerClick(pins._id,pins.lat,pins.lng)}
                  />
                </Marker>
              
                
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
              </>
          )
        })}
        {/* {this.state.newPlace && (
          <Popup
          longitude={this.state.newPlace.lng}
          latitude={this.state.newPlace.lat}
          closeButton={true}
          closeOnClick={false}
          onClose={() => this.setState.newPlaceId(null)}
          anchor= "top"
          >hello</Popup>
          )}  */}
         {/* <div className="buttons">
          <button className="button login">
            Add Pin
          </button>
          <button className="button login">
          Log in
          </button>
          <button className="button register" onClick={this.showRegisterPopup}>
          Register
          </button>
          <button className="button logout">
          Log out
          </button>
          </div>
          {this.state.showRegister && (
          <Register
          closeRegisterPopup={this.closeRegisterPopup}
          getPins={this.getPins}
          handleRegister={this.handleRegister}
          />
        )} */}
        
          </Map>
        </div>
    );
  }
}

// comment //
// some thing testig
// I added the Popup


export default App
