import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Textmessage from './Textmessage.jsx'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
      select:'',
      post:'',
      type:'',
      content:'',
       message:[]
     
    };

    this.submit=this.submit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.addsuggest=this.addsuggest.bind(this);
    this.recieveMessage=this.recieveMessage.bind(this);
    this.deletemessage=this.deletemessage.bind(this);
}

    onChange (e) {
    this.setState({
       [e.target.name]: e.target.value 
        });
  }

  submit(select,post) {
    //console.log(select,post,this.props.name);
    $.ajax({ 
      type:'POST',
      url: '/Profile',
      data:{
        select:select,
        post:post,
        name:this.props.name
      },
      success: (data) =>
      {
          this.props.deletePost()
      },
    });
  }

addsuggest(type,content) {
    //console.log(select,post,this.props.name);
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

  recieveMessage() {
    //console.log(select,post,this.props.name);
    $.ajax({ 
      type:'POST',
      url: '/inbox',
      data:{
        name:this.props.name,
      },
      success: (data) => {
       
        this.setState({
          message:data,
        })
      },
    });
  }

  deletemessage(id) {
    
    // console.log(id)
    $.ajax({ 
      type:'DELETE',
      url: '/delete',
      data:{
        id:id
      },
      success: (data) => {
       this.props.deletePost()
      
      }
    });
}
   

render(){
   return (
    <div>
    <center>
  <div id='message1'>
  <button id="signinbutton" onClick={this.recieveMessage}>inbox</button>
  <Textmessage data={this.state.message}/>
  </div>

    <table id='tab'>
    <tr>
    <th>
    <div id='profile1' >
    <h1>Not Used</h1>
    
<select id='select' onChange={this.onChange} value={this.state.select} name="select">
  <option value="type">type</option>
  <option value="plastic">plastic</option>
  <option value="clothes">clothes</option>
  <option value="wood">wood</option>
  <option value="iron">iron</option>
       </select>
  <br></br>
  <br></br>
  
  <textarea id='textarea' name="post" placeholder="post" value={this.state.post} onChange={this.onChange} rows="4" cols="50">
  </textarea>
     <br></br>
     <br></br>
     
  <button id="signinbutton" onClick={()=> this.submit(this.state.select,this.state.post)}>post</button>
  </div>
  </th>
  <th>
  <div id='profile2'>
  <h1>Add Suggest</h1>
  
  <select id='select' onChange={this.onChange} value={this.state.type} name="type">
  <option value="type">type</option>
  <option value="plastic">plastic</option>
  <option value="clothes">clothes</option>
  <option value="wood">wood</option>
  <option value="iron">iron</option>
       </select>
  <br></br>
  <br></br>
  <textarea id='textarea' name="content" placeholder="content" value={this.state.content} onChange={this.onChange} rows="4" cols="50">
  </textarea>
     <br></br>
     <br></br>
  <button id="signinbutton" onClick={()=> this.addsuggest(this.state.type,this.state.content)}>suggest</button>
  </div>
  </th>
  </tr>
  </table>

   {this.props.userPosts.map(item => 
                    <div id ='homehome'>  
                    <table id ='table2'>  
                     <tr>
                       <th>{item.name}</th>
                         </tr>
                       <tr>
                    <td>{item.select}</td>
                     </tr>
                     <tr>
                    <td>{item.post}</td>
                     </tr>
                    </table>
                     <br></br>
                    
                      <button onClick={()=> this.deletemessage(item._id)}>delete From Home</button>
                       </div>
    )}
  </center>
  </div>
  )

 }
}


export default Profile;







