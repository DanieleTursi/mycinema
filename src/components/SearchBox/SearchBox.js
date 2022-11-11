import {useState,useEffect } from 'react';
import styled from "styled-components"
import { FiSearch } from 'react-icons/fi'

const SearchBox = () => {
    const [value, setValue] = useState('');
    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
    const URL = 'https://api.themoviedb.org/3/'
    const lang = '&language=en-US&page=1';
    const params = new URLSearchParams({
      api_key: TMDB_KEY,
    })
    const [result,setResult] = useState([])

    useEffect(() => {
      if(value.length > 0){
        fetch(`${URL}movie/popular?${params}${lang}`).then(
          response => response.json()
          .then(responseData=> {
            setResult([]);
            let searchQuery= value;
            // for (const key in responseData){
            //   let res = responseData[key].name();
            //   if (res.slice(0,searchQuery.length).indexOf(searchQuery) !== -1){
            //      setResult((prevResult) => {
            //       return[ ...prevResult,responseData[key].name]
            //      })
            //   }
            // }
            console.log(response);
          }).catch(error=>{
            console.log(error);
          })
        )
      }else{
        setResult([]);
      }
    }, [value])

    

 
  return (
    <Styledform action="">
     <input
        type="text"
        id="search"
        name="search"
        onChange={(event)=> setValue(event.target.value)}
        value={value}
      />
   <button type="submit" >
		<span><FiSearch/></span>
	</button>
  <div className='box'>{result.map((result,index) => (
    <a href="#" key= {index}>
      <div>
        {result}
      </div>
    </a>))}
  </div>
  </Styledform>
  )
}

export default SearchBox

const Styledform=styled.form`
text-align:center;
border-radius:7px;

.box{
  color:black;
}

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




