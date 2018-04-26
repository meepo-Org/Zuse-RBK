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
import SuggestionList from './SuggestionList.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      suggestions: [],
      type:'',
      dataa:""
    };
    this.submit=this.submit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.showSignup=this.showSignup.bind(this)
  }

  onChange (e) {
    this.setState({
       [e.target.name]: e.target.value 
        });
  }
 
  submit(type) {
    $.ajax({ 
      type:'POST',
      url: '/suggestions',
      data:{
        type:type,
      },
      success: (data) => {
        this.setState({
          suggestions:data
        })
      }
    });

  }

  showSignup() {
    this.setState({
       dataa:"changed"
     });
  }

  render() {
    if(this.state.dataa==""){
     return (
      
        <div>
        <Router history={browserHistory}>
            <div id='Signin'>
             <Link id='Link1' style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}  onClick={this.showSignup} to="/Signup">Signup</Link>
             <Link id='Link2'onClick={this.showSignup} to="/Login" style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>Login</Link>
            
             </div>
           </Router>
             <center>
          <h1 id='h1'>Reduce.Reuse.Recycle</h1>
          <select id='select' onChange={this.onChange} value={this.state.type} name="type">
          <option value="type">type</option>
          <option value="plastic">plastic</option>
          <option value="clothes">clothes</option>
          <option value="wood">wood</option>
          <option value="iron">iron</option>
          </select>
  
          <br></br>
          <br></br>
          <button id='submit' style={{width: 70 }} onClick={()=> this.submit(this.state.type)}>Show suggestions</button>
          <SuggestionList suggestions={this.state.suggestions} submitlike={this.submit} typelike={this.state.type}/>
            
        
        </center>
        </div>
     );
    }

    else{
      return (
        <Router history={browserHistory}>
       <Switch>
         
          <Route path="/Signup" component={Signup}/>
          <Route path="/Login" component={Login}/>
           
       </Switch>
       </Router>
      )
    }
  }
}
 
export default App;
