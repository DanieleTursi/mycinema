import { useEffect, useContext } from "react";

import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import TmdbContext from "../../context/TmdbContext";
const Main = () => {

  const { getPopular, getTop, topMovies, topSeries, series, loading, movies } = useContext(TmdbContext)

  useEffect(() => {
    getPopular()
    getTop();
  }, [])

  return (
    <MainWrapper>
      <CardWrapperHolder>
        {loading ? <p>...Loading</p> : <>
          <CardWrapper side='left' name='|| Most Popular ' movies={series} type='tv' />
          <CardWrapper side='right' name='Most Popular || ' movies={movies} type='movie' />
          <CardWrapper side='left' name='|| Top Rated ' movies={topSeries} type='tv' />
          <CardWrapper side='right' name='Top Rated ||' movies={topMovies} type='movie' /></>}

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