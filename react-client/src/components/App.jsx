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
import AboutUs from './AboutUs.jsx';
import Products from './Products.jsx';
import Contact from './Contact.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
//The code will depend on the data value which will be set through successful ajax to decide what to render.
dataa:"",
showAboutUsComponent:false,
showProductsComponent:false,
showContactComponent:false,
showMainComponent:true
};

this.showSignup=this.showSignup.bind(this);
this.showNav=this.showNav.bind(this);

}

showSignup() {
  this.setState({
   dataa:"changed"
 });
}
showNav(e){
  this.setState({
    showAboutUsComponent:false,
    showProductsComponent:false,
    showContactComponent:false,
    showMainComponent:false
  })
  this.setState({
    [e.target.name]: true
  });


};

render() {
  if(this.state.dataa==""){
   return (

    <div>
    <div className="jumbotron">
    <div className="container text-center">
    <h1>Second Hand Store</h1>      
    <p>Reduce.Reuse.Recycle</p>
    </div>
    </div>

    <nav className=" navbar-inverse navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>                        
    </button>

    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
    <ul className="nav navbar-nav">
    <li>  <a className="navbar-brand" href="#"name="showMainComponent" onClick={this.showNav}>Main</a></li>
    <li ><a href='#' name="showAboutUsComponent" onClick={this.showNav}>AboutUs</a></li>

    <li><a href="#" name="showProductsComponent" onClick={this.showNav}>Products</a></li>

    <li><a href="#" name="showContactComponent" onClick={this.showNav}>Contact</a></li>
    </ul>
  {/*Router is needed so it can route to different components depending on the link(ex:Sign up here)the user clicked on*/} 
  <ul className="nav navbar-nav navbar-right" >
  <Router history={browserHistory}>
  <li><Link className="icon-bar"  style={{color: 'white',paddingLeft: 13,textDecoration: 'none'}}  onClick={this.showSignup} to="/Signup">Signup</Link></li>

  </Router>
  <Router history={browserHistory}>
  <li><Link className="text-light " onClick={this.showSignup} to="/Login" style={{color: 'white',paddingLeft: 13,textDecoration: 'none'}}>Login</Link></li>
  </Router>
  </ul>
  </div>
  </div>
  </nav>
  {this.state.showMainComponent ? <Main/>:null}
  {this.state.showContactComponent ? <Contact/>:null}
  {this.state.showAboutUsComponent ? <AboutUs/>:null }
  {this.state.showProductsComponent? <Products/>: null}


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
//The Main componant can be put in different file like the Contact,AboutUs..etc. 
class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      type:'',
      suggestions: []
    };
    this.submit=this.submit.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange (e) {
    this.setState({
     [e.target.name]: e.target.value 
   });
  }
  //data is stored in suggest schema which is the input value in Profile.jsx
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

  };

  render(){
    return(
      <div>
      <div className="container">
      <center>
      <form>
      <div className="form-group">
      <label for="sel1">Material Type</label>
      <br></br>
      <br></br>
      <select className="form-control" id="sel1" id='select' onChange={this.onChange} value={this.state.type} name="type">
      <option value="type">type</option>
      <option value="plastic">plastic</option>
      <option value="clothes">clothes</option>
      <option value="wood">wood</option>
      <option value="iron">iron</option>
      </select>
      </div>
      </form>
      </center>
      </div>
      <br></br>
      <br></br>
      <center>
      <button className="btn btn-default"  type="button" onClick={()=> this.submit(this.state.type)}>Show suggestions</button>
    {/*submitlike and typelike were passed to suggestionList component becuase they were needed in the like button functionality*/} 
    <SuggestionList suggestions={this.state.suggestions} submitlike={this.submit} typelike={this.state.type}/>
    </center>
    </div>
    )
  }
}

export default App;
