import { useContext, useEffect } from "react";
import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";
import CardWrapperPeople from "../CardWrapper/CardWrapperPeople";
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import useLocalStorage from "../../hooks/useLocalStorage";




const SearchResultPage = () => {
  const { searchMovies, searchTV, searchPeople, searchLoading, getSearch } = useContext(TmdbContext);
  const { handleResize } = useContext(SizeContext)

  const [showResult, setShowResult] = useLocalStorage('value', '');

  useEffect(() => {
    getSearch(showResult);
    handleResize();
  }, [])

  return (
    <>
      {searchLoading ? <p>...Loading</p> : searchTV.length === 0 && searchMovies.length === 0 && searchPeople.length === 0 ? <NoResult> No Result</NoResult> :
        <SearchResultWrapper>
          {searchTV.length > 0 ? <CardWrapper side='other' name='|| Result ' movies={searchTV} type='tv' /> : <></>}
          {searchMovies.length > 0 ? <CardWrapper side='center' name='Result || ' movies={searchMovies} type='movie' /> : <></>} 
          <People>
          {searchPeople.length > 0 ? <CardWrapperPeople side='center' name='Result in || ' people={searchPeople} type='person' /> : <></>}
          </People>
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

const People = styled.div`
height:500px;
width:100%;
display:flex;
flex-direction:column ;
align-items:center;

@media (max-width:768px){
  flex-direction:row ;
}
`;


const NoResult = styled.h1`
text-align:center;
font-size: 22px;
`


