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
import List from './List.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Account from './Account.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
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
      url: '/items',
      data:{
        type:type,
        
      },
      success: (data) => {
        console.log(data)
      },
    });

    $.ajax({
      type:'GET',
      url: '/items', 
      success: (data) => {
        this.setState({
          items:data
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
        <center>
        <div>
        <Router history={browserHistory}>
            <div>
             <Link id='Link1' style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}} onClick={this.showSignup} to="/Signup">Signup</Link>
             <Link onClick={this.showSignup} to="/Login" style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>Login</Link>
             <Link onClick={this.showSignup} to="/Account" style={{color: 'black',paddingLeft: 13,textDecoration: 'none'}}>user</Link>
             </div>
           </Router>
          <h1 id='h1'>Recycling</h1>
          <input name='type' onChange={this.onChange} placeholder="What to recycle?"/>
          <br></br>
          <br></br>
          <button  style={{width: 70 }} onClick={()=> this.submit(this.state.type)}>Submit </button>
          <List items={this.state.items}/>
            
        </div>
        </center>
     );
    }

    else{
      return (
        <Router history={browserHistory}>
       <Switch>
         
          <Route path="/Signup" component={Signup}/>
          <Route path="/Login" component={Login}/>
           <Route path="/Account" component={Account}/>
           
       </Switch>
       </Router>
      )
    }
  }
}
 
export default App;