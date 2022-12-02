import React from 'react'
import TmdbContext from "../../context/TmdbContext";
import styled from "styled-components"
import CardDetails from './CardDetails';

const DetailsWrapper = (props) => {
    const { loading } = useContext(TmdbContext);


    if (!loading) {
  return (
    <Container>
     {props.movies.map((movie, idx) => (
        <CardDetails page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
     ))}
    </Container>
  )
}
else {
    return <h1>Loading</h1>
}
}

export default DetailsWrapper

const Container = styled.div`
display:flex;
flex-direction:row;
width: 300px;
margin-top:20px;
`;