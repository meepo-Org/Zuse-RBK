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
      if(this.state.data!==""){
       history.pushState({},'','/Account')
       window.location.reload()
        }
        else{
        history.pushState({},'','/Account')
        }
        //window.location.reload()
         this.setState({data:data});
         alert(data)
         console.log(data)
     }
   });
 }

 render(){
  if(this.state.data!==""){
      return (
        <Router>
         
          <Route path="/Account" component={Account}/>
       
        </Router>
      )
    }
    //sign up page
    else {
   return (
     <center>
      <div>
       <h1>Log in</h1>
       <input type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange}/><br/><br/><br/>
       <input type="text" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/>
       <br/><br/><br/>
    
          <button onClick={this.Login} >Login</button>
               </div>
     </center>
   )
 }
}
  
}


export default Login;