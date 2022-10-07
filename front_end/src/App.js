import './App.css';

import React, { Component} from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import Login from "./components/Login"
import Register from "./components/Register"
import NewForm from "./components/NewForm"




let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
}
console.log("Current base URL: ", baseURL)

class App extends Component {
  constructor(){
		super()
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

        },
        showPopup: false,
        showLogin: false,
        setCurrentUser: null ,
        showLogout: false,
        currentLocation: null,
        showRegister: false,
        showEdit: false

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

  showRegisterPopup = () => {
    console.log("register popup triggered")
    this.setState({
      showRegister: true
    })
  }

  closeRegisterPopup = () => {
    console.log("register popup closed")
    this.setState({
      showRegister: false
    })
  }

  handleRegister = (e) => {
  e.preventDefault()
  console.log("etarget", e.target)
  fetch(baseURL + '/users/register', {
    method: 'POST',
    body: JSON.stringify({
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    this.getPins()
  })
  this.setState({
    showRegister:false
  })
}

showLoginPopup = () => {
      console.log("login popup triggered")
      this.setState({
        showLogin: true,

      })
    }

closeLoginPopup = () => {
  console.log("login popup closed")
  this.setState({
  showLogin: false

  })
}

handleLogin = (e) => {
    e.preventDefault()
    console.log("etarget", e.target.username.value, e.target.email.value, e.target.password.value)
    console.log(baseURL)
    fetch(baseURL + '/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) return res.json()
      console.log(res)
    })
      .then(resJson => {
      console.log("resjson", resJson)
      this.getPins()
    })
    this.setState({
      setCurrentUser: true,
      showLogin: false,
      showLogout: true

    })
  }

  showLogoutButton = () => {
      console.log("shows logout button")
      this.setState({
        setCurrentUser: true,
        showLogout: true
      })
    }

    handleLogOut= () => {
      this.setState({
        showLogout: true,
        setCurrentUser: false,
        showLogin: false,
      })
    }

 deletePin = (id) => {
    fetch(baseURL + '/pins/' + id, {
      method: 'DELETE'
    }).then( res => {
      const copyPins = [...this.state.pins]
      const findIndex = this.state.pins.findIndex(pin => pin._id === id)
      copyPins.splice(findIndex, 1)
      this.setState({
        pins: copyPins
      });
    });
  }

  handleAddPin = (pin) => {
    console.log("handleAddFormWorking")
    const copyPins = [...this.state.pins]
    copyPins.unshift(pin)
    this.setState({
      pins: copyPins,
      showPopup: false,
      showForm: false
    })
  }

  showFormPopup = () => {
    console.log("form popup triggered")
    this.setState({
      showForm: true
    })
  }

  closeFormPopup = () => {
    console.log("form popup closed")
    this.setState({
      showForm: false
    })
  }

  showEditPopup = () => {
    console.log("form popup triggered")
    this.setState({
      showEdit: true
    })
  }

  closeEditPopup = () => {
    console.log("form popup closed")
    this.setState({
      showEdit: false
    })
  }

  editPin = (e, id) => {
    e.preventDefault()
  fetch(baseURL +'/pins/' + id, {
    method: 'PUT',
    body: JSON.stringify({
      title: e.target.title.value,
      description: e.target.description.value,
      rating: parseFloat(e.target.rating.value),
      longitude: parseFloat(e.target.longitude.value),
      latitude: parseFloat(e.target.latitude.value)
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then (res => {
    if(res.ok) return res.json()
  })
  .then (resJson => {
    console.log("EditPin - resJson", resJson)
    this.handleEdit(resJson)
  })
}

  handleEdit = (pin) => {
    console.log("handleEditFormWorking")
    const copyPins = [...this.state.pins]
    copyPins.unshift(pin)
    this.setState({
      pins: copyPins,
    })

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


                  onClick={() => this.handlePopUp(pins._id, pins.latitude, pins.longitude)}
                >
                </Marker>
                 {console.log("showpopup", this.state.showPopup)}
                {pins._id === this.state.currentLocation && (
                <Popup
                 longitude={pins.longitude}
                 latitude={pins.latitude}
                 closeButton={true}
                 closeOnClick={false}
                 onClose={() => this.handlePopUpTwo()}
                 anchor="left"
                 >
                  <div className ="card">
                    <label> Place </label>
                    <h4 className="place"> {pins.title} </h4>
                    <label> Review </label>
                    <p className="desc"> {pins.description}</p>
                    <label> Rating </label>
                    <div className="stars">
                    {/* {Array(pins.rating).fill(<Star className="star" />)} */}

                    </div>
                    <label> Information</label>
                    <span className="username"> Created by: <b> {pins.username}</b></span>
                  
                  </div>
                  <button
                  className="buttonDelete"
                  onClick={() => this.deletePin(pins._id)}
                  >
                  Delete Pin
                  </button>
                  <button
                    className="buttonEdit"
                    onClick={this.showEditPopup}
                  >
                    Edit Pin
                  </button>
                </Popup>
              )}
              </div>
        )
      })}
      <div className="buttons">
      <button
      className="button login"
      onClick={this.showFormPopup}
      >
        Add Pin
      </button>
      <button
      className="button login"
      onClick={this.showLoginPopup}
      >
      Log in
      </button>
      <button className="button register" onClick={this.showRegisterPopup}>
      Register
      </button>
      <button
      className="button logout"
      onClick={this.handleLogOut}
      >
      Log out
      </button>
      </div>
      {this.state.showLogin && (
        <Login
        closeLoginPopup={this.closeLoginPopup}
        getPins={this.getPins}
        handleLogin={this.handleLogin}
        handleLogOut={this.handleLogOut}
        />
        )}


      {this.state.showRegister && (
      <Register
      closeRegisterPopup={this.closeRegisterPopup}
      getPins={this.getPins}
      handleRegister={this.handleRegister}
      />
    )}
    {this.state.showForm && (
      <NewForm
      handleAddPin={this.handleAddPin}
      closeFormPopup={this.closeFormPopup}
        />
    )}
     
      </Map>
    </div>
);
}
}

export default App