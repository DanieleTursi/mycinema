import React from 'react'
import { useEffect, useContext, useState } from 'react'
import TmdbContext from "../../context/TmdbContext";
import SearchBox from './SearchBox';
import styled, { keyframes } from 'styled-components';
import noImage from '../../assets/images/noImage.png'

const SearchBoxContainer = () => {
  const { getLatestMovies, latestMovies, loadingLatest } = useContext(TmdbContext);
  const [loading, setLoading] = useState(true)
  const startFunction = async () => {

    await getLatestMovies();
    setLoading(false);
  }

  useEffect(() => {
    startFunction()
  }, [])

  const genNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const x = genNum(0, latestMovies.length - 1)

  if (!loading) {
    return (<>
      <SearchBoxWrapper bg={latestMovies[x].backdrop_path}>
        <SearchBox />
        <h1>{latestMovies[x].original_title.toUpperCase()}</h1>

        <ReleaseDate>{latestMovies[x].release_date.split("-").reverse().join("-")}</ReleaseDate>
      </SearchBoxWrapper>
    </>
    )
  }
  else {
    <h1>Loading...</h1>
  }
}



export default SearchBoxContainer

const MoveUpDown = keyframes`
from {
  background-position: 0 0;
}
to {
  background-position: 0% 50%;
}
  `
const SearchBoxWrapper = styled.div`
display:flex;
justify-content:space-evenly;
padding:20px;
height:300px;
max-width:100%;
background-image:${props => props.bg == null ? `url(${noImage})` : `url(https://www.themoviedb.org/t/p/original${props.bg})`};
background-position: center;
background-repeat: no-repeat;
background-size:cover;
font-family: 'Gochi Hand', cursive;
animation: ${MoveUpDown} 30s linear infinite alternate;
position:relative;


h1{
    color:#F5C030;
    text-shadow:1px 1px 1px black;
    font-style:italic;
    font-size:30px;
    align-self:flex-end;
}

@media (max-width:768px){
  height:200px;
  background-size:cover;
  flex-direction:column;
  justify-content:flex-end;
  align-items:center;

  h1{
    font-size:20px ;
    align-self:center ;
    margin:0;
  }
}

`

const ReleaseDate = styled.h1`
color:gold;
text-shadow:1px 1px 1px black;
font-style:italic;
font-family: 'Gochi Hand', cursive;

&:before {
    color: white;
    font-size:24px;
    content:"Release: ";
  }


@media (max-width:768px){


  &:before {
      font-size:18px;
      }
}
`
