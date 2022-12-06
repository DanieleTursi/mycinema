import React from 'react'
import styled from "styled-components"

const Button = ({ text }) => {
  return (
    <StyledButton>{text}</StyledButton>
  )
}

const StyledButton = styled.button`
color:black;
background:white;
border:white;
width:150px;
height:25px;
border-radius: 8px;
font-family: 'Kaushan Script', cursive;
margin:10px;
cursor:pointer;

&:hover{
  background:lightgray;
}

@media screen and (max-width: 768px){
  width:80px;
`
export default Button