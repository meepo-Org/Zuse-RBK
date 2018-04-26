import React, { Component } from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SuggestionList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0
    };
    // this.incrementCount=this.incrementCount.bind(this);
    // this.DecrementCount=this.DecrementCount.bind(this);
   this.submit=this.submit.bind(this);
}

// incrementCount(){
//     this.setState({
//       count: this.state.count + 1
//     });
//         }


//         DecrementCount(){
//     this.setState({
//       count: this.state.count - 1
//     });
//   }

  submit(id,count) {
    
    // console.log(id)
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

  <div>
   
                       {this.props.suggestions.map(suggestion => 
                      <div id='List'>    

                      <table id ='table'>
                    <tr>
                      <th>{suggestion.name}</th>
      
                     </tr> 
                     <tr>
                      <td>{suggestion.content}</td>
                       </tr>   
                      
                      </table>
                     <br></br>
                       <div className="counter">
        <p> likes {suggestion.count}</p>
        <button id='like' type="button" onClick={()=> this.submit(suggestion._id,suggestion.count+1)}>❤️Like</button>
        <button id='like' type="button" onClick={()=> this.submit(suggestion._id,suggestion.count-1)}>👎Unlike</button>
        
          </div>
                      </div>
                       
    )}

        
  </div>

)
 }
}


export default SuggestionList;


// import React from 'react';

// const List = (props) => (
//   <div >
    
   
//     {props.items.map(item => 
//                       <div id='List'>    

//                       <table id ='table'>
//                     <tr>
//                       <th>{item.name}</th>
      
//                      </tr> 
//                      <tr>
//                       <td>{item.content}</td>
//                        </tr>   

//                       </table>
//                      <br></br>
//                       </div>
      
//     )}  
//   </div>
// )
// <button id='like' type="button" onClick={this.DecrementCount}>👎Unlike</button>
// export default List;