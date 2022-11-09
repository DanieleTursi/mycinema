import { useEffect, useState, useContext } from "react";

import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import TmdbContext from "../../context/TmdbContext";
const Main = () => {

  const { getPopularMovies, getPopularShows, getTopShows, getTopMovies, topMovies, topSeries, series, loading, movies } = useContext(TmdbContext)


  useEffect(() => {
    getPopularMovies();
    getPopularShows();
    getTopShows();
    getTopMovies();
  }, [])





  return (
    <MainWrapper>
      <CardWrapperHolder>
        <CardWrapper side='left' name='Most Popular Shows' movies={series} type='tv' />
        <CardWrapper side='right' name='Most Popular Movies' movies={movies} type='movie' />
        <CardWrapper side='left' name='Top Rated Shows' movies={topSeries} type='tv' />
        <CardWrapper side='right' name='Top Rated Movies' movies={topMovies} type='movie' />
      </CardWrapperHolder>

    </MainWrapper>
  )


}
export default Main


const MainWrapper = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
`;

const CardWrapperHolder = styled.div`
width:95%;
height:90%;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`;