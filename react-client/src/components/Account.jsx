import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  Link,
  Switch,
  browserHistory,
  BrowserRouter as Router
} from "react-router-dom";
import Home from './Home.jsx';
import Profile from './Profile.jsx';
//import Message from './Message.jsx';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extra:[]
     };
     this.submit = this.submit.bind(this);
    this.Logout = this.Logout.bind(this);
   }


  submit() {
    //console.log(select,post,this.props.name);
    $.ajax({ 
      type:'GET',
      url: '/Home',
      success: (data) => {
        this.setState({extra:data})
      },
    });
  }
  Logout() {
    //console.log(select,post,this.props.name);
    $.ajax({ 
      type:'GET',
      url: '/Logout',
      success: (data) => {
       window.location.href="index.html"
      },
    });
  }

  render(){
   
    return (
      
    <Router>
     
      <div>
     
      <div id='line'>
           <Link onClick={this.submit} to="/Home" style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>Home</Link>
           <Link to="/Profile" style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>Profile</Link>
          
          <Link to="/Login" onClick={this.Logout} style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>Logout</Link>
          </div>

          <div className="content">
            
            <Route path="/Home" render={()=><Home extraa={this.state.extra} name={this.props.name}/> } />
            <Route path="/Profile" render={()=><Profile name={this.props.name}/> } />
           
          </div>

      
      
       
 
      </div>

      
     </Router>
     )

  }
}
   	 
   

export default Account;