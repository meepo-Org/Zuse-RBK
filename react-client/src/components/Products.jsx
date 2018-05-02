import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
     productName:'',
     productDisc:'',
     productImg : '' ,
     products: [] 
   }
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
     console.log("this prps productjsx",this.props)
 }

 itemEnter(productName , productDisc , productImg) {
  console.log(this.this.props)
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
  return (

    <div className="prod">

  {this.props.name ?


    <div className = "container" >
    <input type="text" name="productName" placeholder="Item Name" value={this.state.itemName} onChange={this.onChange}/>
    <input type="text" name="productDisc" placeholder="Item Discription" value={this.state.itemDisc} onChange={this.onChange}/>
    <input type="text" value={this.state.productImg} name="productImg" onChange={this.onChange} placeholder="enter image URL here"></input>
    <button id="signinbutton" onClick={()=> this.itemEnter(this.state.productName,this.state.productDisc , this.state.productImg)}>ADD</button>

    </div>
    : null}
    <div className="container" >    
    <div className="row">
          { this.state.products.map(item =>
              
    <div className="col-sm-4">
    <div  className="panel panel-default" >
    <div className="panel-heading">{item.productName} <br></br> <p>suplied by {item.name}</p></div>
    <div className="panel-body"><img src={item.productImg} className="img-responsive" /></div>
    <div className="panel-footer">{item.productDisc}</div>
    <div className="panel-footer"><button className='btn'>Buy</button></div>
    </div>
    </div>
     )}
    
   
    <div className="col-sm-4"> 
    <div className="panel panel-default">
    <div className="panel-heading">Recycled Wood</div>
    <div className="panel-body"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiQaAbfJDabEWFbP7Epq296-dWysYGbgildhRX8b5-zT1-1c_" className="img-responsive" /></div>
    <div className="panel-footer">Buy it Now</div>
    <div className="panel-footer"><button className='btn'>Buy</button></div>
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
