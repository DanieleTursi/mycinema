import {useState } from 'react';
import styled from "styled-components"
import { FiSearch } from 'react-icons/fi'

const Searchbar = () => {
    const [message, setMessage] = useState('');
  
    

    const handleChange = event => {
      setMessage(event.target.value);

      
  
      console.log('value is:', event.target.value);
    };
  return (
    <Styledform action="">
     <input
        type="text"
        id="message"
        name="message"
        pattern=".*\S.*" 
        onChange={handleChange}
        value={message}
      />
   <button type="submit">
		<span><FiSearch/></span>
	</button>
  </Styledform>
  )
}

export default Searchbar

const Styledform=styled.form`
text-align:center;
border-radius:7px;

input{
    height:30px;
    width:200px;
    border:2.2px solid black;
    border-radius:7px 0 0 7px;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size:18px;
}

input:hover{
    background:lightgray;
    
}

button{
    height:39px;
    border-radius:0 7px 7px 0;
    border:1.5px solid white;
    color:white;
    background:black;
    cursor:pointer;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size:18px;
}

button:hover{
    transform:scale(1.03);
}
`




