
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
   
   <h1>{item.select}</h1>    
   <pre className="pre"><b>{item.post}</b></pre>
   <h2 onClick={()=> this.showmessagebox(item.name,item.post)} >📤{item.name}</h2>
   </div>
   <br></br>
   
   <div>

   {this.state.ismessagehiddin ? null : (this.state.content==item.post)?<div><textarea id='home' onChange={this.onChange} value={this.state.input} name="input"/><button id='home1' onClick={()=> this.addMessage(this.state.to,this.state.input)}>send</button>  </div>:null}
   
   </div>
   </div>
   )}
  
  </div>

  )
}
}

export default Home;