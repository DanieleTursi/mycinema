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
        <h1>{latestMovies[x].original_title.toUpperCase()}</h1>
        <SearchBox />
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
background-position: 0px 0px;
background-repeat: no-repeat;
font-family: 'Gochi Hand', cursive;
animation: ${MoveUpDown} 30s linear infinite alternate;



h1{
    color:gold;
    text-shadow:1px 1px 1px black;
    font-style:italic;
    font-size:30px;
    align-self:flex-end;
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

`
