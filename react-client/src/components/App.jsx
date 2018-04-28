// the main component 
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
// import all the component to render them 
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

        <nav className="navbar navbar-inverse">
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
      <div class="container">
  <center>
  <form>
    <div class="form-group">
      <label for="sel1">Material Type</label>
      <br></br>
      <br></br>
      <select class="form-control" id="sel1" id='select' onChange={this.onChange} value={this.state.type} name="type">
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
          <SuggestionList suggestions={this.state.suggestions} submitlike={this.submit} typelike={this.state.type}/>
            
        </center>
     
</div>

      )
  }

}

 
export default App;
