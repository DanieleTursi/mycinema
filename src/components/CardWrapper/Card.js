import React from 'react'
import styled from 'styled-components'
const Card = (props) => {

  return (
    <Container bg={props.bg}>{props.title}</Container>
  )
}

export default Card


const Container = styled.div`

  width: 250px;
  height: 200px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:url(https://www.themoviedb.org/t/p/original${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

`;