import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Well, Image , Col } from 'react-bootstrap';
import Textmessage from './Textmessage.jsx'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 

      select:'',
      post:'',
      type:'',
      content:'',
      message:[],
      showInbox:false 

    };

    this.submit=this.submit.bind(this);
    this.onChange=this.onChange.bind(this);
    this.addsuggest=this.addsuggest.bind(this);
    this.recieveMessage=this.recieveMessage.bind(this);
    this.deletepost=this.deletepost.bind(this);
  }

  onChange (e) {
    this.setState({
     [e.target.name]: e.target.value 
   });
  }
// you can either add add not used stuff post or recycling idea
  submit(select,post) {
    $.ajax({ 
      type:'POST',
      url: '/Stuff',
      data:{
        select:select,
        post:post,
        name:this.props.name
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

  recieveMessage() {
    $.ajax({ 
      type:'POST',
      url: '/inbox',
      data:{
        name:this.props.name,
      },
      success: (data) => {

        this.setState({
          message:data,
          showInbox:!this.state.showInbox
        })
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

  render(){
   if(this.state.showInbox){
     return (
      <div>
      <center>
      <div id='message1'>
      <button id="signinbutton" onClick={this.recieveMessage}>📩inbox</button>
      <Textmessage data={this.state.message}/>
      </div>
      </center>
      </div>
      )}else
     {return (
       <div>
       <center>
       <button id="signinbutton" onClick={this.recieveMessage}>📩inbox</button>     
       <table id='tab'>
       <tr>
       <th>
       <div id='profile1' className='container'>
       <h1>Second Hand Stuff</h1>
       <select id='AddSuggest' onChange={this.onChange} value={this.state.select} name="select">
       <option value="type">type</option>
       <option value="plastic">plastic</option>
       <option value="clothes">clothes</option>
       <option value="wood">wood</option>
       <option value="iron">iron</option>
       </select>
       <br></br>
       <br></br>

       <textarea id='AddSuggesttextarea' name="post" placeholder="post" value={this.state.post} onChange={this.onChange} rows="4" cols="50">
       </textarea>
       <br></br>
       <br></br>

       <button id="signinbutton" onClick={()=> this.submit(this.state.select,this.state.post)}>post</button>
       </div>
       </th>
       <th>
       <div id='profile2' className='container'>

       <h1>Add Suggest</h1>

       <select id='AddSuggest' onChange={this.onChange} value={this.state.type} name="type">
       <option value="type">type</option>
       <option value="plastic">plastic</option>
       <option value="clothes">clothes</option>
       <option value="wood">wood</option>
       <option value="iron">iron</option>
       </select>
       <br></br>
       <br></br>
       <textarea id='AddSuggesttextarea' name="content" placeholder="content" value={this.state.content} onChange={this.onChange} rows="4" cols="50">
       </textarea>
       <br></br>  
       <br></br>
       <button id="signinbutton" onClick={()=> this.addsuggest(this.state.type,this.state.content)}>suggest</button>
       </div>
       </th>
       </tr>
       </table>
       <center>
       <h1>My Inventory</h1> </center>
       <div className="container" id ='table2'>  

       <div className="container"> 
       {this.props.userPosts.map(item => 
         <div> 
         <center>  
         <h2>{item.select}</h2>
         <pre className="pre">{item.post}</pre>
         <button onClick={()=> this.deletepost(item._id)}>🗑 delete From Home</button>
         <br></br>
         <br></br>
         <br></br>
         </center>
         </div>

         )}
       </div>

       <br></br>


       </div>

       </center>
       </div>
       )}

   }
 }


 export default Profile;







