import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React from 'react'
import styled from "styled-components"
import Button from '../Button/Button';


const Navbar = (props) => {

  return (
    <NavbarContainer>
      <Logo>MYCINEMA</Logo>
      <ButtonsContainer>
        <Button text='LOG IN' />
        <Button text='REGISTER' />
      </ButtonsContainer>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
width:100%;
height:70px;
display:flex ;
justify-content: space-between;
align-items:center;
background:black;
margin-bottom:20px;
`;

const ButtonsContainer = styled.div`
   margin-right:20px;
   justify-content:flex-end;
`;

const Logo = styled.h1`
font-size: 42px;
text-shadow: 3px 3px 3px gray;
font-family: 'Gochi Hand', cursive;
color:white;
margin-left:20px;
cursor:pointer;
`

export default Navbar