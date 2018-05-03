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
      products:"",
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
  $.ajax({ 
    type:'GET',
    url: '/Products',
    success: (data) => {
      this.setState({products:data});

    }
  });
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

    <div >
    <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>                        
    </button>
    <ul className="navbar-nav mr-auto nav ">
    <li>  <a className="navbar-brand" href="#"name="showMainComponent" onClick={this.showNav}>Main</a></li>
    <li ><a href='#' name="showAboutUsComponent" onClick={this.showNav}>AboutUs</a></li>

    <li><a href="#" name="showProductsComponent" onClick={this.showNav}>Products</a></li>

    <li><a href="#" name="showContactComponent" onClick={this.showNav}>Contact</a></li>

    </ul>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
    <form className=" ">
  {/*Router is needed so it can route to different components depending on the link(ex:Sign up here)the user clicked on*/} 
  <ul className="nav navbar-nav navbar-right" >
  <Router history={browserHistory}>
  <li><Link className="icon-bar"   onClick={this.showSignup} to="/Signup">Signup</Link></li>

  </Router>
  <Router history={browserHistory}>
  <li><Link className="text-light " onClick={this.showSignup} to="/Login" >Login</Link></li>
  </Router>
  
  </ul>
  </form>
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
  //data is stored in suggest schema which is the input value in FreeProducts.jsx
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
      <div >

      <div className="jumbotron text-center">
      <h1>TOGETHER WE WILL MAKE A CHANGE.</h1>      
      <p>Reduce.Reuse.Recycle</p>
      <form>
      </form>
      </div>

      <div className="container">

      <center>
      <form>
      <div className="form-group">
      <h2>Material Type</h2><br/>
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
      <br></br>
      <br></br>
      <center>
      <button bsStyle="success" className="btn btn-success"  type="button" onClick={()=> this.submit(this.state.type)}>Show suggestions</button>
    {/*submitlike and typelike were passed to suggestionList component becuase they were needed in the like button functionality*/} 
    <SuggestionList   suggestions={this.state.suggestions} submitlike={this.submit} typelike={this.state.type}/>
    </center>
    </div><br/>
      <div className="container-fluid bg-grey">
      <div className="container">

      <div className="row">
      <div className="col-sm-4">
      <span className="glyphicon glyphicon-globe logo slideanim"></span>
      </div>
      <div className="col-sm-8">
      <h2>THINK GREEN</h2><br/>
      <h4><strong>What Can I Recycle?:</strong> 
      Through advances in recycling technology, you have more options than ever. And it's a good thing because we need to conserve as much of our resources as possible..</h4><br/>
      <p><strong>Where Can I Recycle?:</strong> Find a Waste Management drop-off recycling facility near you.</p>
      </div>
      </div>
      </div>
      </div>

    </div>
    )
  }
}

export default App;
