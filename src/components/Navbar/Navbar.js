import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React, { useContext } from 'react'
import styled from "styled-components"
import Button, { ButtonStyle } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/User/UserContext';

const Navbar = (props) => {


  const { handleRegisterClick } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <Logo onClick={() => { navigate('/') }}>MYCINEMA</Logo>
      <ButtonsContainer>
        <ButtonStyle to='/login' onClick={() => { handleRegisterClick('login') }} >Login</ButtonStyle>
        <ButtonStyle to='/login' onClick={() => { handleRegisterClick('register') }} >Register</ButtonStyle>
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
   display:flex;
   justify-content:flex-end;


   @media screen and (max-width: 768px){
    width:50%;
    margin:0;
}

`;

const Logo = styled.h1`
font-size: 42px;
text-shadow: 3px 3px 3px gray;
font-family: 'Gochi Hand', cursive;
color:white;
margin-left:20px;
cursor:pointer;


@media screen and (max-width: 768px){
    font-size:32px ;
}
`

export default Navbar