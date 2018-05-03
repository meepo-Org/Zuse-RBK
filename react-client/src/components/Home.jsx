import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Well , Modal , Button} from "react-bootstrap"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      to:'',
      content:'',
      input:'',
      ismessagehiddin:true,
      products : []
      
    };
    
    this.onChange=this.onChange.bind(this);
    this.showmessagebox=this.showmessagebox.bind(this);
    this.addMessage=this.addMessage.bind(this);

    $.ajax({ 
      type:'GET',
      url: '/Products',
      success: (data) => {
        this.setState({products:data});

      }
    });
  }

  onChange (e) {
    this.setState({
     [e.target.name]: e.target.value 
   });
  }

// if any user can reuse any stuff he can press on the donar name and message him.
showmessagebox(to,content){
  this.setState({
    ismessagehiddin: ! this.state.ismessagehiddin,
    to: to,
    content:content
  });
}

addMessage(to,content) {

  $.ajax({ 
    type:'POST',
    url: '/Message',
    data:{
     From:this.props.name,
     to:to,
     content:content
   },
   success: (data) => {

    this.showmessagebox("","");
    this.setState({input:''});
    alert("Your message is sent");
  },
});
}

render(){
 return (
  <div>
       
 <div className="container" >    
    
  { this.state.products.map(item =>

    <div className="col-sm-4 col-xs-12">
    <div  className="panel panel-default" >
    <div className="panel-heading">{item.productName} <br></br> <p>suplied by {item.name}</p></div>
    <div className="panel-body"><img src={item.productImg} className="img-responsive" width="300" height="300" /></div>
    <div className="panel-footer">{item.productDisc}</div>

    <div className="panel-footer">
    <Button className='btn btn-success' onClick={()=> this.handleShow(item.name , item.productName)} > Buy </Button>
    </div>
    </div>
    </div>
    )}
<Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <Well>
              <div className="container">
                 Visa Information
              </div>
            </Well>
            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.handleClose(this.state.input)}>Pay</Button>
          </Modal.Footer>
        </Modal>
  {this.props.extraa.map(item => 
   <div className="container" id ='table2'>  
   <div>  
   <div className="col-sm-4 col-xs-12">
   <div className="panel panel-default text-center">
   <div className="panel-heading">
   <h1>{item.select}</h1>
   <img src={item.stuffImg} className="img-responsive" width="300" height="300" />

   </div>
   <div className="panel-body">
   <p><strong>POST</strong> {item.post}</p>
   </div>
   <div className="panel-footer">
   <h3>Message</h3>
   <h4></h4>
   <button onClick={()=> this.showmessagebox(item.name,item.post)} className="btn btn-lg">📤{item.name}</button>

   {this.state.ismessagehiddin ? null : 
    (this.state.content==item.post)?<div>
    <textarea className="form-control" onChange={this.onChange} value={this.state.input} name="input"/>
    <button className='btn btn-success' onClick={()=>  this.addMessage(this.state.to,this.state.input)}>send</button>  
    </div>
    :null}

    </div>
    </div>      
    </div> 
    </div>
    </div>
    )}
  
    </div>
  </div>
  

  )
}
}

export default Home;