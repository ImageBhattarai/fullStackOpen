import React from 'react';

const Person = (props) => (
    <div>
       {props.person.name}: {props.person.number} 
       <button onClick={props.deleteHandler}>Delete</button>
    </div>
)
    
export default Person;