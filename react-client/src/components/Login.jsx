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
import Account from './Account.jsx';


class Login extends Component {

  constructor(props) {
   super(props);
   this.state = {
     states:{
       userName:"",
       passWord:""
     },
     data:""
   };
   this.onChange = this.onChange.bind(this);
   this.Login = this.Login.bind(this);
 }

 onChange (e) {
  var states = this.state.states;
  var name = e.target.name;
  var value = e.target.value;
  states[name] = value;
  this.setState({states});
 }

 Login() {
   $.ajax({
     url: '/Login',
     type: 'POST',
     data: this.state,
     success: (data) => {
      this.setState({data:data});
        if(data===""){
       alert("incorrect password")
      }
     }
   });
 }

 render(){
   //user page
  if(this.state.data!==""){
      return (
        <Router>
         
          <Route path="/user" render={()=><Account name={this.state.states.userName} />}/>
       
        </Router>
      )
    }
    //Log in page
    else {
   return (
     <center>
      <div id='Login'>
       <h1>Log in</h1>
       <input id='Logininput2' type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange}/><br/><br/><br/>
       <input id='Logininput2'type="password" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/>
       <br/><br/><br/>
       <Router>
          <Link to="/user"><button id="signinbutton" onClick={this.Login} >Login</button></Link>
         </Router>
      </div>
     </center>
   )
 }
}
  
}


export default Login;