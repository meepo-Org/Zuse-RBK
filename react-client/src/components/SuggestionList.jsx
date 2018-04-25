import React from 'react';

const SuggestionList = (props) => (
  <div >
    
   
    {props.suggestions.map(suggestion => 
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
                      </div>
      
    )}  
  </div>
)

export default SuggestionList;