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

  }
  this.onChange = this.onChange.bind(this);
  this.recieveMessage=this.recieveMessage.bind(this);

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



render() {  
  if(this.state.showInbox){
   return (
    <div>
    <center>
    <div className='container '>
    <Well>  
    <div id='message1'>
    <button className='btn'  onClick={this.recieveMessage}>📩inbox</button>
    <Textmessage data={this.state.message}/>
    </div>
    </Well>
    </div>
    </center>
    </div>
    )}else{
    return (
     <div>
     <div className='container text-center'>
     <button className='btn'  onClick={this.recieveMessage}>📩inbox</button>
     <Well>     
     <img id='iimg' width="300" height="300"  className = " img-circle" src="https://pre00.deviantart.net/080b/th/pre/i/2011/072/4/5/__recycle___wallpaper_by_osallivan-d3bk883.jpg" ></img>
     <div className="media-body">
     <h4 className="media-heading">Profile Name</h4>
     <p>Discription</p>
     </div>
     </Well>
     </div>
     </div>
     )}
  }
}

export default Profile;