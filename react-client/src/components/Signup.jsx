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
      Email:""
     },
     data:"" 
   }
   this.onChange = this.onChange.bind(this);
   this.Signup = this.Signup.bind(this);
  }

  onChange (e) {
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
      console.log(""===data)
      if(this.state.data!==""){
       history.pushState({},'','/Login')
       window.location.reload()
        }
        else{history.pushState({},'','/Login')}
        //window.location.reload()
         this.setState({data:data});
         alert(data)
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
        <div>
         <h1>Sign up</h1>
         <input type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange} /><br/><br/><br/>
         <input type="text" name="Email" placeholder="Email" value={this.state.Email} onChange={this.onChange}/><br/><br/><br/>
         <input type="text" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/>
         <br/><br/><br/>
         <Router>
          <button onClick={this.Signup} >Signup</button>
         </Router>
        </div>
       </center>
      )
    }
  }
}
 
export default Signup;