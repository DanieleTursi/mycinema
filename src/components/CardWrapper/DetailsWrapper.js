import React from 'react'
import TmdbContext from "../../context/TmdbContext";
import styled from "styled-components"

const DetailsWrapper = () => {
  return (
    <Container>
     {props.movies.map((movie, idx) => (
        <Card page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
     ))}
    </Container>
  )
}

export default DetailsWrapper

const Container = styled.div`
display:flex;
flex-direction:row;
width: 300px;
margin-top:20px;
`;