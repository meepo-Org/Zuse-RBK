import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Well} from "react-bootstrap"
class Profile extends Component {
  constructor(props) {
   super(props);
   this.state = {

   }
   this.onChange = this.onChange.bind(this);

 }

 onChange (e) {

 }



 render() {
  return(
    <div>
    <div className='container text-center'>


    <Well>     
    <img id='iimg' width="300" height="300"  className = " img-circle" src="https://pre00.deviantart.net/080b/th/pre/i/2011/072/4/5/__recycle___wallpaper_by_osallivan-d3bk883.jpg" ></img>
    <div className="media-body">
    <h4 className="media-heading">Profile Name</h4>
    <p>Discription</p>
    </div>
    </Well>
    </div>
    </div>
    )
}
}

export default Profile;