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
import Products from './Products.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      products:"",
//The code will depend on the data value which will be set through successful ajax to decide what to render.
dataa:"",
showProductsComponent:false,
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
    showProductsComponent:false,
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
    <li ><a href='#About'>AboutUs</a></li>
    <li><a href="#Contact" >Contact</a></li>

    <li><a href="#" name="showProductsComponent" onClick={this.showNav}>Products</a></li>


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

      <div className="jumbotron text-center">
      <h1>TOGETHER WE WILL MAKE A CHANGE.</h1>      
      <p>Reduce.Reuse.Recycle</p>
      <form>
      </form>
      </div>

  {this.state.showMainComponent ? <Main/>:null}
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
    </div>
    <br/>
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
      <br/>

      <div className="container">
        <p><strong>FOR YOUR RESIDENCE</strong><br/>
Finding the right residential waste and recycling solutions provider is an important decision. At Waste Management, we reward that decision by providing a wide range of exceptional services and products.</p>
      </div>

     <div id='About' className="container-fluid bg-grey">
      <div className="container">

      <div className="row">
      <div className="col-sm-4">
      <span className="glyphicon  glyphicon-tree-conifer logo slideanim"></span>
      </div>
      <div className="col-sm-8">
      <h2>About Us</h2><br/>
        <p >Some years back, nobody paid much attention to the accumulation of waste 
  in homes and landfills. It became so vast that the authorities started getting
  concerned the phenomenon could create a disaster. A solution had to be found, 
  but one that is kind to humans and the environment. That’s how recycling was born.
  Recycling is the process of converting waste into new, useful products. 
  Waste materials that can be recycled include plastic bottles, paper, cardboard,
  food and drink cans, trays, tabs, food and beverages cartons, and aluminum foils. 
  Although recycling has been going on for the past few years, recycling efforts need 
  to be increased considering the amount of waste disposed of every day.
  </p>
  <p>
  Several reasons exist as to why we should promote recycling. Recycling helps us to 
  convert our old products into new useful products. In other words, it is good for 
  the environment. Since we are saving resources and are sending less trash to the landfills, 
  it helps in reducing air and water pollution. Listed below are few reasons why we should all 
  recycle old products</p>
      </div>
      </div>
      </div>
      </div>
      <br/>
            <div id="Contact">
  <form id="contact-form" method="post" action="contact.php" role="form">

  <div className="controls container">

  <div className="row">
  <div className="col-md-6">
  <div className="form-group">
  <label for="form_name">Firstname *</label>
  <input id="form_name" type="text" name="name" className="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."/>
  <div className="help-block with-errors"></div>
  </div>
  </div>
  <div className="col-md-6">
  <div className="form-group">
  <label for="form_lastname">Lastname *</label>
  <input id="form_lastname" type="text" name="surname" className="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required."/>
  <div className="help-block with-errors"></div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-md-6">
  <div className="form-group">
  <label for="form_email">Email *</label>
  <input id="form_email" type="email" name="email" className="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required."/>
  <div className="help-block with-errors"></div>
  </div>
  </div>
  <div className="col-md-6">
  <div className="form-group">
  <label for="form_phone">Phone</label>
  <input id="form_phone" type="tel" name="phone" className="form-control" placeholder="Please enter your phone"/>
  <div className="help-block with-errors"></div>
  </div>
  </div>
  </div>
  <div className="row">
  <div className="col-md-12">
  <div className="form-group">
  <label for="form_message">Message *</label>
  <textarea id="form_message" name="message" className="form-control" placeholder="Message for me *" rows="4" required="required" data-error="Please,leave us a message."></textarea>
  <div className="help-block with-errors"></div>
  </div>
  </div>
  <center>
  <div className="col-md-12">
  <input type="submit" className="btn btn-success btn-send" value="Send message"/>
  </div>
  </center>
  </div>
  <br></br>
  <br></br>
  <br></br>
  </div>

  </form>
  </div>
  <br/>
<footer className="text-center">
  <a className="up-arrow" href="#" data-toggle="tooltip" title="TO TOP">
    <span className="glyphicon glyphicon-chevron-up"></span>
  </a><br/>
  <p> Copyright</p> 
</footer>
    </div>
    )
  }
}

export default App;
