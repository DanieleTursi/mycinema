import { useState, useContext } from 'react';
import styled from "styled-components"
import { FiSearch } from 'react-icons/fi'
import TmdbContext from "../../context/TmdbContext";
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const SearchBox = () => {
  const [value, setValue] = useState('');
  const { getSearch, getLatestMovies } = useContext(TmdbContext)
  const [showResult, setShowResult] = useLocalStorage('value', '');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    getSearch(value)
    navigate('/searchresult');
    setValue('')
    setShowResult(value)
  }

  return (
    <Styledform onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        name="search"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <button type="submit">
        <span><FiSearch /></span>
      </button>
    </Styledform>
  )
}

export default SearchBox

const Styledform = styled.form`
text-align:center;
border-radius:7px;
position:absolute;
top:10px;
border:1px solid #fff;

.box{
  color:black;
}

input{
    height:30px;
    width:200px;
    border:1px solid black;
    border-radius:7px 0 0 7px;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size:18px;
}
input:hover{
    background:lightgray;
    
}
button{
    height:34px;
    border-radius:0 7px 7px 0;
    border:none;
    // border:1.5px solid white;
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

