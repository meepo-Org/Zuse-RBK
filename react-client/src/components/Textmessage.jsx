import React from 'react';

const Textmessage = (props) => (
  <div >
    
   
    {props.data.map(item => 
                      <div id='List'>    

                      <table id ='table'>
                    <tr>
                      <th>{item.From}</th>
      
                     </tr> 
                     <tr>
                      <td>{item.content}</td>
                       </tr>   

                      </table>
                     <br></br>
                      </div>
      
    )}  
  </div>
)

export default Textmessage;
