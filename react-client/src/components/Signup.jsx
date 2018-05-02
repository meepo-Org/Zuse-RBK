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
import Login from './Login.jsx';

class Signup extends Component {
  constructor(props) {
   super(props);
   this.state = {
     states:{
      userName:"",
      passWord:"",
      Email:"",
      userType:"normal",
      location:""
    },
    data:"" 
  }
  this.onChange = this.onChange.bind(this);
  this.Signup = this.Signup.bind(this);
}

onChange (e) {
  console.log('e value ',e.target.value)
 var states = this.state.states;
 var name = e.target.name;
 var value = e.target.value;
 states[name] = value;
 this.setState({states}); 
}

Signup() {

 
 $.ajax({
   url: '/Signup',
   type: 'POST',
   data: this.state,
   success: (data) => {
    this.setState({data:data})
    if(data===""){
     alert("This Email is already taken, Try another one")
   }
   
 }
});
}

render() {
    //log in page
    if(this.state.data!==""){
      return (
        <Router>
        
        <Route path="/Login" component={Login}/>
        
        </Router>
        )
    }
    //sign up page
    else {
      return (
       <center>
       <div id='Signup'>
       <h1 style={{color:'white'}}>Sign up</h1>
       <br></br>
      <select id='Signupinput4' type="text" name="userType" value={this.state.userType}  onChange={this.onChange}>
      <option value="normal" selected="selected">normal</option>
      <option value="supplier">supplier</option>
      </select><br/><br/>
       <input id='Signupinput1' type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange} /><br/><br/>
       <input id='Signupinput2' type="text" name="Email" placeholder="Email" value={this.state.Email} onChange={this.onChange}/><br/><br/>
       <input id='Signupinput3' type="password" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/><br/>
       <input id='Signupinput5' type="text" name="location" placeholder="location" value={this.state.location} onChange={this.onChange}/>

       <br/><br/><br/>
       <Router>
       <Link to= "/Login"><button id="signupbutton" class="btn btn-success"onClick={this.Signup} ><b>SignUp</b></button></Link>
       </Router>
       </div>
       </center>
       )
    }
  }
}

export default Signup;