import { useEffect, useContext } from "react";

import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
const Main = () => {

  const { getPopular, getTop, topMovies, topSeries, series, loading, movies } = useContext(TmdbContext)
  const { handleResize } = useContext(SizeContext)

  useEffect(() => {
    getPopular()
    getTop();
    handleResize();
  }, [])

  return (
    <MainWrapper id='mainWrapper'>
      <CardWrapperHolder>
        {loading ? <p>...Loading</p> : <>
          <CardWrapper side='left' name='|| Most Popular ' movies={series} type='tv' />
          <CardWrapper side='right' name='Most Popular || ' movies={movies} type='movie' content={"MOVIES"} />
          <CardWrapper side='left' name='|| Top Rated ' movies={topSeries} type='tv' />
          <CardWrapper side='right' name='Top Rated ||' movies={topMovies} type='movie' content={"MOVIES"} /></>}

      </CardWrapperHolder>

    </MainWrapper>
  )


}
export default Main


const MainWrapper = styled.div`
max-width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;


`;

const CardWrapperHolder = styled.div`
width:90%;
height:100%;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`;