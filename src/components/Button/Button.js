import React from 'react'
import styled from "styled-components"
import { NavLink } from 'react-router-dom';
const Button = ({ text, actor }) => {





  return (
    <StyledButton >{text}</StyledButton>
  )
}

const StyledButton = styled.button`
color:black;
background:white;
border:1px solid black;
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

export const ButtonStyle = styled(NavLink)`
color:black;
background:white;
border:1px solid black;
width:150px;
height:25px;
border-radius: 8px;
font-family: 'Kaushan Script', cursive;
margin:10px;
cursor:pointer;
text-decoration:none;
text-align:center;

&:hover{
  background:lightgray;
}

@media screen and (max-width: 768px){
  width:80px;
`

export default Button