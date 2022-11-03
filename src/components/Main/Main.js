import { useEffect, useState, useContext } from "react";

import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import TmdbContext from "../../context/TmdbContext";
const Main = () => {

  const { getPopularMovies, loading, movies } = useContext(TmdbContext)


  useEffect(() => {
    getPopularMovies();
  }, [])





  return (
    <MainWrapper>
      <CardWrapperHolder>
        <CardWrapper side='left' name='Most Popular Shows' movies={movies} />
        <CardWrapper side='right' name='Most Popular Movies' movies={movies} />
        <CardWrapper side='left' name='Just Relased Shows' movies={movies} />
        <CardWrapper side='right' name='Just Relased Movies' movies={movies} />
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