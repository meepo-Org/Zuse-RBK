import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      to:'',
      content:'',
      input:'',
      ismessagehiddin:true
      
    };
    
    this.onChange=this.onChange.bind(this);
    this.showmessagebox=this.showmessagebox.bind(this);
    this.addMessage=this.addMessage.bind(this);
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



  {this.props.extraa.map(item => 
   <div className="container" id ='table2'>  
   <div>  
     <div  className="container-fluid">
  <div className="row slideanim">
    <div className="col-sm-4 col-xs-12">
      <div className="panel panel-default text-center">
        <div className="panel-heading">
          <h1>{item.select}</h1>
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
   </div>
  </div>
   )}
  
  </div>
  

  )
}
}

export default Home;