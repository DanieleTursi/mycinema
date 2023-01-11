import React from 'react'
import styled from 'styled-components'


const UserDetails = (props) => {
  return (
    <Wrap>
      <Details>
        <h4>User Details:</h4>
        <h3>Name: <span>{props.user?.name || props.user?.displayName}</span></h3>
        <h3>Email: <span>{props.user?.email}</span></h3>

      </Details>
      <ImageWrapper image={props.user?.photoUrl
      } />
    </Wrap>
  )
}

export default UserDetails

const Wrap = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
`;

const Details = styled.div`
  width:500px;
  display:flex;
  flex-direction:column;
  margin: 10px 100px;

  h4{
    text-align:center;
    font-size:22px;
    border-bottom: 1px solid black;
    font-family: 'Kaushan Script', cursive;
  }

  h3{
    margin:5px 20px;
    color:red;
    font-size:18px;
    font-family: 'PT Sans Narrow', sans-serif;
  }

  span{
    color:black;
  }

  
  
`
const ImageWrapper = styled.div`
width:100px;
height:100px;
border:1px solid #000;
border-radius:7px;
background-image:url(${props => props.image});
background-size:cover;

`;