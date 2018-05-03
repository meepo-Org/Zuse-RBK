import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SuggestionList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0
    };
    
    this.submit=this.submit.bind(this);
  }



  submit(id,count) {
    
    console.log(count)
    $.ajax({ 
      type:'PUT',
      url: '/SuggestionList',
      data:{
        id:id,
        count:count 
      },
      success: (data) => {
       this.props.submitlike(this.props.typelike)
       
     }
   });
  }

  render(){
   return (

    <div className="container ">
    
    {this.props.suggestions.map(suggestion => 
      <div id='table2'>    

      <div id ='table'id="suggestionPre">
      <h1>{suggestion.name}</h1>
      <pre className="pre">{suggestion.content}</pre>
      
      </div>
      
      <div className="counter">
      <p> likes {suggestion.count}</p>
      <button id='like' type="button" onClick={()=> this.submit(suggestion._id,suggestion.count+1)}>❤️Like</button>
      <button id='like' type="button" onClick={()=> this.submit(suggestion._id,suggestion.count-1)}>👎Unlike</button>
      <br></br>
      <br></br>
      <br></br>
      

      </div>
      </div>
      
      )}

    
    </div>

    )
 }
}


export default SuggestionList;


