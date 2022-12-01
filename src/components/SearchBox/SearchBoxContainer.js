import React from 'react'
import { useEffect, useContext } from 'react'
import TmdbContext from "../../context/TmdbContext";
import SearchBox from './SearchBox';
import styled from 'styled-components';
import noImage from '../../assets/images/noImage.png'

const SearchBoxContainer = () => {
  const { getLatestMovies, latestMovies, loadingLatest } = useContext(TmdbContext);
  const startFunction = async () => {
    await getLatestMovies();
  }

  useEffect(() => {
    startFunction()
  }, [])

  const genNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const x = genNum(0, 20)

  if (latestMovies.length > 0) {
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


const SearchBoxWrapper = styled.div`
display:flex;
align-items:flex-end;
justify-content:center;
padding:20px;
height:300px;
width:100%;
background-image:${props => props.bg == null ? `url(${noImage})` : `url(https://www.themoviedb.org/t/p/original${props.bg})`};
background-size: cover;
background-repeat: no-repeat;
background-position: center;
font-family: 'Gochi Hand', cursive;

h1{
    color:gold;
    text-shadow:1px 1px 1px black;
    font-style:italic;
    margin:100px;
    font-size:30px;
}
`

const ReleaseDate = styled.h1`
color:gold;
text-shadow:1px 1px 1px black;
font-style:italic;
margin:100px;
font-family: 'Gochi Hand', cursive;

&:before {
    color: white;
    font-size:24px;
    content:"Release: ";
  }

`
