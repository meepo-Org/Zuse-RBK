import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  Link,
  Switch,
  browserHistory,
  BrowserRouter as Router
} from "react-router-dom";
import {Well , Modal , Button  ,Popover , Tooltip , OverlayTrigger} from "react-bootstrap"
import Paid from './Paid.jsx';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
     productName:'',
     productDisc:'',
     productImg : '' ,
     products: [] ,
     show: false , 
     to :'',
     input : ''
   }
   this.handleShow = this.handleShow.bind(this);
   this.handleClose = this.handleClose.bind(this);

   this.onChange = this.onChange.bind(this);
   this.itemEnter = this.itemEnter.bind(this);
   // this.handleLoad = this.handleLoad.bind(this);

     $.ajax({ 
        type:'GET',
        url: '/Products',
        success: (data) => {
      this.setState({products:data});
          
        }
      });
 }
 handleClose(content) {
  this.setState({ show: false });

    $.ajax({ 
    type:'POST',
    url: '/Message',
    data:{
     From:this.props.name,
     to:this.state.to,
     content:content
   },
   success: (data) => {
     console.log(data)
    this.showmessagebox("","");
    // this.setState({input:''});
    // alert("Your message is sent");
  },
});
}

handleShow(to  , pro) {
  this.setState({ show: true , to : to , productName : pro});
}



 itemEnter(productName , productDisc , productImg) {
  $.ajax({
   url: '/Products',
   type: 'POST',
   data:{
    productName:productName,
    productDisc:productDisc,
    productImg : productImg,
    name:this.props.name,
    userType:this.props.userType
  },
  success: (data) => {
    this.setState({data:data})
    if(data===""){
     alert("This Email is already taken, Try another one")
   }
 }
});
  $.ajax({ 
    type:'GET',
    url: '/Products',
    success: (data) => {
      this.setState({products:data});

    }
  });
}
onChange(e){
  this.setState({
   [e.target.name]: e.target.value 
 });
}

render(){
      const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    this.state.input = this.props.name + " bought form you " +this.state.productName
  return (

    <div >
  {this.props.name ?
    <div className = "container">
    <div className='row'>
    <Well>
    <div className='col-sm-4 input-group'>
    <input className='form-control' type="text" name="productName" placeholder="Item Name" value={this.state.itemName} onChange={this.onChange}/>
    </div>
      
    <div className='col-sm-4 input-group'>

    <input className='form-control' type="text" name="productDisc" placeholder="Item Discription" value={this.state.itemDisc} onChange={this.onChange}/>
    </div>
    <div className='col-sm-4 input-group'>
    
    <input className='form-control' type="text" value={this.state.productImg} name="productImg" onChange={this.onChange} placeholder="enter image URL here"></input>
    </div>
    <button className='btn ' onClick={()=> this.itemEnter(this.state.productName,this.state.productDisc , this.state.productImg)}>ADD</button>
    </Well>
    </div>
    </div>
    : null}

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

   <div className="container" >    
    <div className="row">
    { this.state.products.map(item =>

      <div className="col-sm-4">
      <div  className="panel panel-default" >
      <div className="panel-heading">{item.productName} <br></br> <p>suplied by {item.name}</p></div>
      <div className="panel-body"><img src={item.productImg} className="img-responsive" width="300" height="300" /></div>
      <div className="panel-footer">{item.productDisc}</div>

      <div className="panel-footer">
      <Button bsStyle="primary" className='btn' onClick={()=> this.handleShow(item.name , item.productName)} > Buy </Button>
      </div>
      </div>
      </div>
      )}

    

    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Recycled Wood</div>
    <div className="panel-body"><img width="300" height="300"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiQaAbfJDabEWFbP7Epq296-dWysYGbgildhRX8b5-zT1-1c_" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Recycled Wood</div>
    <div className="panel-body"><img src="http://www.igreenspot.com/wp-content/uploads/janson-and-company-eco-products2.jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    <div className="panel-footer"><button>Buy</button></div>
    </div>
    </div>

    <div className="col-sm-4">
    <div className="panel panel-default">
    <div className="panel-heading">100% Plastic</div>
    <div className="panel-body"><img src="http://images.nitrosell.com/product_images/5/1223/641344.jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Wood</div>
    <div className="panel-body"><img src="http://4.bp.blogspot.com/-8VEQvHTvMu0/Ue1hPvnWEcI/AAAAAAAAvxc/5MBt0coQAI4/s1600/Cardboard+furniture+A+fresh+new+product+straight+from+London%E2%80%99s+most+reputed+Gilles+Miller+Studio+is+a+bookshelf+that+doubles+up+as+a+sculpture+adorning+ones%E2%80%99+living+room+or+office+space..jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Wood&Plastic</div>
    <div className="panel-body"><img src="https://i.pinimg.com/736x/91/af/28/91af28b4feb98beb269760ae7a2dc06d.jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    </div>
    </div>
    </div>

    )}
}


export default Products;
