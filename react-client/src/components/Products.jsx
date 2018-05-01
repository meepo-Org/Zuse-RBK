import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
    this.onChange = this.onChange.bind(this);
    this.itemEnter = this.itemEnter.bind(this);
  }
  itemEnter() {
    console.log(this.state.item)
    $.ajax({
     url: '/Product',
     type: 'POST',
     data: this.state,
     success: (data) => {
      this.setState({data:data})
      if(data===""){
       alert("This Email is already taken, Try another one")
     }
   }
 });
  }
  onChange(e){
   // var item = this.state.item;
   // var name = e.target.name;
   // var value = e.target.value;
   // item.name = value;
   // this.setState({item}); 
    this.setState({
     [e.target.name]: e.target.value 
   });
  
 }
 render(){

  return (

    <div>
    <div className = "container">
    <input type="text" name="itemName" placeholder="Item Name" value={this.state.itemName} onChange={this.onChange}/>
    <input type="text" name="itemDisc" placeholder="Item Discription" value={this.state.itemDisc} onChange={this.onChange}/>
    <button onClick={this.itemEnter} >ADD</button>

    </div>


    <div className="container">    
    <div className="row">
    <div className="col-sm-4">
    <div  className="panel panel-default">
    <div className="panel-heading">100% Plastic</div>
    <div className="panel-body"><img src="https://img.edilportale.com/product-thumbs/b_RADIUS-Recycle-Bin-Green-Furniture-Concept-231771-rel9f4d1dd9.jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Recycled Wood</div>
    <div className="panel-body"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiQaAbfJDabEWFbP7Epq296-dWysYGbgildhRX8b5-zT1-1c_" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Recycled Wood</div>
    <div className="panel-body"><img src="http://www.igreenspot.com/wp-content/uploads/janson-and-company-eco-products2.jpg" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    </div>
    </div>
    </div>

    <div className="row">
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
