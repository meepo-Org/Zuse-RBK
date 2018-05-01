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
import FreeProducts from './FreeProducts.jsx';
import Products from './Products.jsx';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extra:[],
      myposts:[]

    };
    this.submit = this.submit.bind(this);
    this.Logout = this.Logout.bind(this);
  }
// when the user clicks on the FreeProducts/home buttons states will be set with data.
submit() {  
  $.ajax({ 
    type:'GET',
    url: '/Home',
    success: (data) => {
      var myname=this.props.name;
      var mine=data.filter(function(post) {return post.name==myname})
      console.log(mine);
      this.setState({myposts:mine});
      this.setState({extra:data});
    },
  });
}

Logout() {
  
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
    <div>

    <div className="jumbotron">
    <div className="container text-center">
    <h1>Second Hand Store</h1>      
    <p>Reduce.Reuse.Recycle</p>
    </div>
    </div>
    
    <Router>
    
    <div>
    
    <nav className="navbar-inverse navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>                        
    </button>
    
    </div><center>
    <div className="collapse navbar-collapse" id="myNavbar">
    <ul className="nav navbar-nav">
    <li><Link onClick={this.submit} to="/Home" style={{color: 'white',paddingLeft: 13,textDecoration: 'none'}}>Home</Link></li>
    <li><Link  to="/Products" >Products</Link></li>
    <li> <Link onClick={this.submit} to="/FreeProducts" style={{color: 'white',paddingLeft: 13,textDecoration: 'none'}}>FreeProducts</Link></li>
    <li><Link to="/Login" onClick={this.Logout} style={{color: 'white',paddingLeft: 13,textDecoration: 'none'}}>Logout</Link></li>
    </ul>
    
    </div>
    </center>
    
    </div>
    </nav>
    
    <div className="content">
    <Route path="/Home" render={()=><Home extraa={this.state.extra} name={this.props.name}/> } />
    <Route path="/Products" render={()=><Products extraa={this.state.extra} name={this.props.name}/> } />
    <Route path="/FreeProducts" render={()=><FreeProducts name={this.props.name} userPosts={this.state.myposts} rerender={this.submit}/> } />
    
    </div>

    </div>
    
    </Router>
    </div>
    )

}
}

export default Account;












