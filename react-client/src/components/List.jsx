import React from 'react';

const List = (props) => (
  <div>
    <h4 > Signup/Login for donating/selling the product or 
    <br/>sharing your Do It Yourself experiance with us! </h4>
   
    {props.items.map(item => 
    		              <div>    
    		               <h1>Username:</h1><h3>{item.username}</h3>
                       <img src="{item.image}" />
                       <h1>Description:</h1><h3>{item.Description}</h3>
    		              </div>
    )}
  </div>
)

export default List;