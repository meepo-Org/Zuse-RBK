import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Well, Image , Col } from 'react-bootstrap';
import Textmessage from './Textmessage.jsx'

class FreeProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { 

      select:'',
      post:'',
      type:'',
      content:'',
      message:[],
      stuffImg: '',
      prodName: '',
      prodOwner: '',
      senderLocation: ''
    };
    //var location1 = '';
    //this.location1 = this.location1.bind(this);
    this.submit=this.submit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.addsuggest=this.addsuggest.bind(this);
    this.deletepost=this.deletepost.bind(this);
    this.getSenderLocation = this.getSenderLocation.bind(this);
  }

  onChange (e) {
    this.setState({
     [e.target.name]: e.target.value 
   });
  }
// you can either add add not used stuff post or recycling idea
  submit(select,post, stuffImg, prodName) {
    $.ajax({ 
      type:'POST',
      url: '/FreeProducts',
      data:{
        select:select,
        post:post,
        name:this.props.name,
        stuffImg: stuffImg,
        prodName: prodName,
        prodOwner: this.props.name
      },
      success: (data) => {
          // whenever something changed we need to rerender the whole array.
          this.props.rerender()
        },
      });
  }

  addsuggest(type,content) {
    $.ajax({ 
      type:'POST',
      url: '/Suggest',
      data:{
        type:type,
        content:content,
        name:this.props.name
      },
      success: (data) => {
        alert(data)
      },
    });
  }

  deletepost(id) {
    $.ajax({ 
      type:'DELETE',
      url: '/delete',
      data:{
        id:id
      },
      success: (data) => {
       this.props.rerender()

     }
   });

  }

  showmessagebox(to,content){
  this.setState({
    ismessagehiddin: ! this.state.ismessagehiddin,
    to: to,
    content:content
  });
}

getSenderLocation(senderName)
{ var tmp = this;
  $.ajax({
    type: 'POST',
    url: '/Sender',
    data: {
      userName: senderName
    },
    success: (data) => {
      //console.log("Sender location ", data);
      this.setState({
        senderLocation: data[0].location
      });
    }
  });

}

addMessage(to,content, location) {
  //console.log("loccc" , this.state.senderLocation)
  this.getSenderLocation(this.props.name);
  var message = "From: " + this.props.name + "\n To: " + to + "\n Sender Location: " + location +
  "\n Message Details: \n" +
  "Product Type: " + content.select + "\n Product Name: " + content.prodName + "\n Product Description: " + content.post;


  $.ajax({ 
    type:'POST',
    url: '/Message',
    data:{
     From:this.props.name,
     to:to,
     content:message
   },
   success: (data) => {
     
    //this.showmessagebox("","");
    //this.setState({input:''});
    alert("Your message is sent");
  },
});
}

  render(){
  return (
       <div>
       
       <div className='container '>
       <div className='row'>
       <div className="col-sm-6">
       <Well>
       <div className= 'form-group '>         
       <h1>Second Hand Stuff</h1>
       <select className ="form-control"  onChange={this.onChange} value={this.state.select} name="select">
       <option value="type">type</option>
       <option value="plastic">plastic</option>
       <option value="clothes">clothes</option>
       <option value="wood">wood</option>
       <option value="iron">iron</option>
       </select>
       </div>
       <br></br>
       <br></br>
         
        <label for="usr">Product Name :</label>
       
       <input className="form-control" type="text" value={this.state.prodName} name="prodName" onChange={this.onChange} placeholder="Product Name"></input>
        <label for="usr">Image :</label>
       
       <input className="form-control"  type="text" value={this.state.stuffImg} name="stuffImg" onChange={this.onChange} placeholder="enter image URL here"></input>
       <br></br>
        <label for="usr">POST :</label>

       <textarea className="form-control"  name="post" placeholder="post" value={this.state.post} onChange={this.onChange} rows="4" cols="50">
       </textarea>
       <br></br>
       <br></br>

       <button className="btn btn-success" onClick={()=> this.submit(this.state.select,this.state.post, this.state.stuffImg, this.state.prodName)}>post</button>
       </Well>
       </div>
       <div className="col-sm-6">
       <Well>

        <div className=' form-group '>
       <h1>Add Suggest</h1>

       <select className ="form-control"  onChange={this.onChange} value={this.state.type} name="type">
       <option value="type">type</option>
       <option value="plastic">plastic</option>
       <option value="clothes">clothes</option>
       <option value="wood">wood</option>
       <option value="iron">iron</option>
       </select>
       <br></br>
       <br></br>
        <label for="usr">Content :</label>

       <textarea className="form-control" name="content" placeholder="content" value={this.state.content} onChange={this.onChange} rows="4" cols="50">
       </textarea>
       <br></br>  
       <br></br>
       <button className="btn btn-success" onClick={()=> this.addsuggest(this.state.type,this.state.content)}>suggest</button>
       </div>
       </Well>
       </div>
       </div>
      
       
       <h1>My Inventory</h1> 
       <div className="container" >  

       <div> 
       {this.props.extraa.map(item => 
         <div> 
         <Well>
         <div>  
           <h1>{item.select}</h1>  
           <h3>Product Name: {item.prodName}</h3>  
           <pre className="pre"><b>{item.post}</b></pre>
           <img src={item.stuffImg} width="200" height="200"></img><br></br>
            <button className='btn btn-info' onClick={()=> this.deletepost(item._id)}>🗑 Delete this Product</button>
            <button className='btn btn-success' onClick={()=> this.addMessage(this.state.to, item, this.state.input)}>I want to get this Product</button> 


           <h2 onClick={()=> this.showmessagebox(item.name,item.post)} >Supplied By: {item.name}</h2>
         </div>
         <br></br>
         <div>
            {this.state.ismessagehiddin ? null : 
            (this.state.content==item.post)?
            <div>
              <textarea id='home' onChange={this.onChange} value={this.state.input} name="input" placeholder="Enter your location here .."/>
              <button className='btn ' onClick={()=> this.addMessage(this.state.to, item, this.state.input)}>send</button> 
            </div>  :null}
         </div>
         </Well>
         </div>

         )}
       </div>

       <br></br>


       </div>
       </div>

       </div>
       )
}

 }


 export default FreeProducts;







