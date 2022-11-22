import {useState} from 'react';
import styled from "styled-components"
import { FiSearch } from 'react-icons/fi'

const SearchBox = () => {
    const [value, setValue] = useState('');
    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
    const URL = 'https://api.themoviedb.org/3/'
    const params = new URLSearchParams({
      api_key: TMDB_KEY,
    })
    const [resultMovie,setResultMovie] = useState([])
    const [resultSeries,setResultSeries] = useState([])

    const handleClick= async (value) => {
      if(value.length > 0){
        const resMovie= await fetch(`${URL}search/movie?${params}&language=en-US&query=${value}&page=1`)
        const dataMovie = await resMovie.json()
        setResultMovie(dataMovie)
        const resSeries= await fetch(`${URL}search/tv?${params}&language=en-US&query=${value}&page=1`)
        const dataSeries = await resSeries.json()
        setResultSeries(dataSeries)
        console.log(dataMovie, dataSeries)
          }
      else{
        setResultMovie([]);
        setResultSeries([]);
      }
    }
   
    const handleSubmit=(event)=>{
      event.preventDefault()
      handleClick(value)
    }
 
  return (
    <Styledform onSubmit={handleSubmit}>
     <input
        type="text"
        id="search"
        name="search"
        onChange={(event)=> setValue(event.target.value)}
        value={value}
      />
   <button type="submit">
		<span><FiSearch/></span>
	</button>
  {/* <div className='box'>{result.map((result,index) => (
    <a href="#" key= {index}>
      <div>
        {result}
      </div>
    </a>))}
  </div> */}
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




