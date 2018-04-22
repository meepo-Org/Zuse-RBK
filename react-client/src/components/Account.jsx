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
import Signup from './Signup.jsx';


class Account extends Component {

  constructor(props) {
   super(props);
   this.state = {
     states:{
       post:""
     },
     data:""
   };
   this.onChange = this.onChange.bind(this);
   this.submit = this.submit.bind(this);
 }

 onChange (e) {
  var states = this.state.states;
  var name = e.target.name;
  var value = e.target.value;
  states[name] = value;
  this.setState({states});
 }

 submit() {
   $.ajax({
     url: '/Login',
     type: 'POST',
     data: this.state,
     success: (data) => {
      if(this.state.data!==""){
       history.pushState({},'','/Account')
       window.location.reload()
        }
        else{history.pushState({},'','/Account')}
        //window.location.reload()
         this.setState({data:data});
         alert(data)
         console.log(data)
     }
   });
 }


render(){
  


   return (

   	 <Router>
     <center>
      <div>

     

          <div className="content">
            
            <Route path="/Login" component={Login}/>
            <Route path="/Signup" component={Signup}/>
          </div>

       <h1>User</h1>
       <select>
  <option value="select">select</option>
  <option value="plastic">plastic</option>
  <option value="clothes">clothes</option>
  <option value="wood">wood</option>
  <option value="iron">iron</option>
       </select>
  <br/><br/><br/>
  <textarea name="post" placeholder="post" value={this.state.post} onChange={this.onChange} rows="4" cols="50">
  </textarea>
       <br/><br/><br/>
  <button onClick={this.submit}>post</button><br/>
 
      </div>

     </center>
     </Router>
   )
 }
  
}

 
export default Account;