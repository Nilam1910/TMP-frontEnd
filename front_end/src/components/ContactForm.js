import React from 'react'
// import {BiXCircle } from "react-icons/bi"



//    let baseURL = ""

//    if(process.env.NODE_ENV === "development"){
//       baseURL = "http://localhost:3001"
//    } else {
//       baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
//    }
//    console.log("Current base URL: ", baseURL)


// class ContactForm extends Component {
//    constructor(props) {
//      super(props)
//      this.state = {
//       success:false,
//       setSuccess:false,
//       user: false,
//       showContactForm:true
//      }
//    }

  

   // handleContactForm = (e) => {
   //    e.preventDefault()
   //    console.log("eTarget", e.target)
   //    fetch(baseURL + "/user/register",{
   //    method: "POST",
   //    body: JSON.stringify({
   //          username:e.target.username.value,
   //          email: e.target.email.value,
   //          message: e.target.message.value
   //       }),
   //       headers: {
   //          "Content-Type" : "application/json"
   //       }
   //    }).then(res => res.json())
   //    .then(resJson => {
   //       console.log(resJson)
   //       this.setState({
   //          user:true
   //       })
   //    })
   // }

//    handleSubmit = (e) => {
//       e.preventDefault();
//       fetch(`${process.env.REACT_APP_BACKEND_URL}/pins`, {
//           method: "POST",
//           body: JSON.stringify({
//             name: e.target.username.value,
//             email: e.target.email.value,
//             message: e.target.message.value,
            
//           }),
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }).then (res => {
//           if(res.ok) return res.json()
//         })
//         .then (resJson => {
//           console.log("ContactForm - resJson", resJson)
//           this.props.handleContactForm(resJson) // in homePage.js
          
//         })
//       }
     
//    showContactFormPopup = () => {
//       console.log("Contact Popup Triggered")
//       this.setState({
//          showContact: true
//       })
//    }

//    closeContactFormPopup = () => {
//       console.log("ContactForm popup closed")
//       this.setState({
//          showContactForm: false
//       })
//    }

 
   
//   render() {
//     return (
//       <div className="registerContainer">
//         <div className="logo">Contact Us</div>
//          <h1 className="h1-register">Send your info</h1>
//       <form  onSubmit={this.handleContactForm} >
//         <label className="label1" htmlFor="name">Username: </label>
//           <input id="username" name="username" className="username" type="text" placeholder="username" />
//         <label className="label1" htmlFor="name">Email: </label>
//           <input  id="email" name="email" className="email" type="email" placeholder="email" />
//         <label className="" htmlFor="name">Message: </label>
//           <input id="message" name="message" className="password" type="message" placeholder="message" />
//         <input className="registerButton" type="submit" value="ContactForm" />
//       </form>
//         <BiXCircle
//           className="registerCancel"
//           onClick={this.props.closeContactFormPopup}
//         />
//     </div>
//       // <div className="container mt-5">
//       //     <h2 className="mb-3">React Contact Form Component Example</h2>
//       //     <form onSubmit={this.onSubmit}>
//       //       <div className="mb-3">
//       //         <label className="form-label" htmlFor="name">
//       //           Name
//       //         </label>
//       //         <input className="form-control" type="text" id="name" required />
//       //       </div>
//       //       <div className="mb-3">
//       //         <label className="form-label" htmlFor="email">
//       //           Email
//       //         </label>
//       //         <input className="form-control" type="email" id="email" required />
//       //       </div>
//       //       <div className="mb-3">
//       //         <label className="form-label" htmlFor="message">
//       //           Message
//       //         </label>
//       //         <textarea className="form-control" id="message" required />
//       //       </div>
//       //       <button className="btn btn-danger" type="submit" value="formStatus" />
//       //       </button>
//       //     </form>
//       //   </div>
    
//     )
//   }
// }

  const ContactForm = () => {
      const [formStatus, setFormStatus] = React.useState('Send')
      const onSubmit = (e) => {
        e.preventDefault()
        setFormStatus('Submitting...')
        const { name, email, message } = e.target.elements
        let conFom = {
          name: name.value,
          email: email.value,
          message: message.value,
        }
        console.log(conFom)
      }
      return (
        <div className="container mt-5">
          <h2 className="mb-3">React Contact Form Component Example</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" type="email" id="email" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea className="form-control" id="message" required />
            </div>
            <button className="btn btn-danger" type="submit" >
               {formStatus}
            </button>
          </form>
        </div>
      )
    }

export default ContactForm
