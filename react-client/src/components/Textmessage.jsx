import React from 'react';

const Textmessage = (props) => (
  <div >
  
  
  {props.data.map(item => 
    <div className="container" id ='table2'>    

    <div >
    <h1>{item.From}</h1>
    <pre className="pre">{item.content}</pre>
    </div>
    <br></br>
    </div>
    
    )}  
  </div>
  )

export default Textmessage;
