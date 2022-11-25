import { useEffect, useContext } from "react";
import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import TmdbContext from "../../context/TmdbContext";

const SearchResultPage = () => {
  const { searchMovies,searchTV, searchPeople } = useContext(TmdbContext)
  return (
    <div>
      <CardWrapper side='left' name='|| Shows ' movies={searchTV} type='tv' />
      <CardWrapper side='right' name='|| Movies ' movies={searchMovies} type='movies' />
      <CardWrapper side='right' name='|| Most People ' movies={searchPeople} type='tv' />
    </div>
  )
}

export default SearchResultPage
