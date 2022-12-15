import React, { useContext } from 'react'
import styled, { css } from "styled-components"
import Button, { ButtonStyle } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/User/UserContext';

const Navbar = (props) => {


  const { handleRegisterClick, showNavButtons, handleLogout, user } = useContext(UserContext);



  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <Logo onClick={() => { navigate('/') }}>MYCINEMA</Logo>
      <ButtonsContainer>
        {showNavButtons === true ? <>
          <ButtonStyle to='/login' onClick={() => { handleRegisterClick('login') }} >Login</ButtonStyle>
          <ButtonStyle to='/login' onClick={() => { handleRegisterClick('register') }} >Register</ButtonStyle>
        </>
          : <LoggedContainer>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <UserImage image={user?.picture}>{user?.initials}</UserImage>
          </LoggedContainer>
        }


      </ButtonsContainer>

    </NavbarContainer>
  )
}
export default Navbar


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

const LoggedContainer = styled.div`
display:flex;
margin-right:20px;
`;


const LogoutButton = styled.button`
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


`;
const ImageCss = css`
background-image:url(${props => props.image});
background-size:cover;
`

const UserImage = styled.div`
width:50px;
height:50px;
border-radius:50%;
${props => props.image && ImageCss}
color:#fff;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #fff;
cursor:pointer;
`;