
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      to:'',
      content:'',
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
 showmessagebox(to){
  this.setState({
      ismessagehiddin: ! this.state.ismessagehiddin,
      to: to
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
        alert(data)
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
                         <th><a onClick={()=> this.showmessagebox(item.name)} >{item.name}</a></th>
                           </tr>
                       <tr>
                      <td>{item.select}</td>
                       </tr>

                       <tr>
                      <td>{item.post}</td>
                       </tr>
                      </table>
                       <br></br>
    		              </div>
    		               
    )}
         <center>
         <div>

            {this.state.ismessagehiddin ? null : <textarea id='home' onChange={this.onChange} value={this.state.content} name="content"/>}
            {this.state.ismessagehiddin ? null : <button id='home1' onClick={()=> this.addMessage(this.state.to,this.state.content)}>send</button>}
          </div>
          </center>
  </div>

)
 }
}

export default Home;