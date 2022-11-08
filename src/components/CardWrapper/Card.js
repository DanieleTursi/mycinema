import React from 'react'
import styled from 'styled-components'
const Card = (props) => {
 
  return (
    <Container bg={props.bg}></Container>
  )
}

export default Card


const Container = styled.div`

  width: 200px;
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:url(https://www.themoviedb.org/t/p/original${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

`;