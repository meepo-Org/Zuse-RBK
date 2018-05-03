import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Well } from "react-bootstrap"
import Textmessage from './Textmessage.jsx'

class Profile extends Component {
  constructor(props) {
   super(props);
   this.state = {
    message:[],
      showInbox:false ,
      location: '',
      Email: ''

  }
  this.onChange = this.onChange.bind(this);
  this.recieveMessage=this.recieveMessage.bind(this);
  this.getUserInfo = this.getUserInfo.bind(this);
   }


onChange (e) {
  this.setState({
   [e.target.name]: e.target.value 
 });
}
recieveMessage() {
  $.ajax({ 
    type:'POST',
    url: '/inbox',
    data:{
      name:this.props.name,
    },
    success: (data) => {

      this.setState({
        message:data,
        showInbox:!this.state.showInbox
      })
    },
  });
}

getUserInfo(username)
{
  $.ajax({
    type: 'POST',
    url: '/User',
    data: {
      userName: username
    },
    success: (data) => {
      console.log("User Info ", data);
      this.setState({
        location: data[0].location,
        Email: data[0].Email
      });
    }
  });
}


render() {  
  this.getUserInfo(this.props.name);
  if(this.state.showInbox){
   return (
    <div>
    <center>
    <div className='container '>
  
    <div id='message1'>
    <button className='btn'  onClick={this.recieveMessage}>📩inbox</button>
    <Textmessage data={this.state.message}/>
    <div>
    <div className='container text-center'>
    </div>
    </div>
    </div>
  
    </div>
    </center>
    </div>
    )}else{
    return (
     <div>
     <div className='container text-center'>
     <button className='btn'  onClick={this.recieveMessage}>📩inbox</button>    
    <Well>     
    <img id='iimg' width="300" height="300"  className = " img-circle" src="https://wallpaperbrowse.com/media/images/wUq2AY.jpg" ></img>
    <div className="media-body">
    <h4 className="media-heading"><b>{this.props.name}</b></h4><br></br>
    
    <h4>Location: {this.state.location}</h4>
    <h4>Email: {this.state.Email}</h4> </div>
     </Well>
     </div>
     </div>
     )}
  }
}

export default Profile;