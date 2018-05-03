import React from 'react';
import {Well } from "react-bootstrap"

const Textmessage = (props) => (
  <div >
  
  
  {props.data.map(item => 
    <div className="container" id ='table2'>    
    <Well>
      
    <div >
    <h1>Message From {item.From}</h1>
    <pre className="pre">{item.content}</pre>
    </div>
    <br></br>
    </Well>
    </div>
    
    )}  
  </div>
  )

export default Textmessage;
