import { useContext } from "react";
import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import CardWrapperPeople from "../CardWrapper/CardWrapperPeople";
import TmdbContext from "../../context/TmdbContext";

const SearchResultPage = () => {
  const { searchMovies, searchTV, searchPeople, searchLoading } = useContext(TmdbContext);
  console.log(searchMovies);

  return (
    <>
      {searchLoading ? <p>...Loading</p> : searchTV.length === 0 && searchMovies.length === 0 && searchPeople.length === 0  ? <NoResult> No Result</NoResult> :
        <SearchResultWrapper>
          {searchTV.length > 0 ? <CardWrapper side='other' name='|| Result ' movies={searchTV} type='tv' /> : <></>}
          {searchMovies.length > 0 ? <CardWrapper side='center' name='Result || ' movies={searchMovies} type='movie' /> : <></>}
          {searchPeople.length > 0 ? <CardWrapperPeople side='center' name='Result in || ' people={searchPeople} type='tv' /> : <></>}
        </SearchResultWrapper>
       }</>
  )
}

export default SearchResultPage

const SearchResultWrapper = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const NoResult= styled.h1`
text-align:center;
font-size: 22px;
`


