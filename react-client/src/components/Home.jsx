
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
 showmessagebox(to,content){
  this.setState({
      ismessagehiddin: ! this.state.ismessagehiddin,
      to: to,
     content:content
    });
 }

 addMessage(to,content) {
    //console.log(select,post,this.props.name);
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
    		               <div id ='homehome'>  
    		              <table id ='table2'>  
    		               <tr>
                         <th><a onClick={()=> this.showmessagebox(item.name,item.post)} >{item.name}</a></th>
                           </tr>
                       <tr>
                      <td>{item.select}</td>
                       </tr>

                       <tr>
                      <td>{item.post}</td>
                       </tr>
                      </table>
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