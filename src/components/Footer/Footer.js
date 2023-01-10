import React from 'react'
import styled from "styled-components"
import { BiCopyright } from 'react-icons/bi'
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from 'react-icons/bs'

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        <BiCopyright /> 2022-Created by Nagy and Tursi
      </Copyright>
      <Socials>
        <BsInstagram size={'25px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsFacebook size={'25px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsTwitter size={'25px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsYoutube size={'25px'} style={{ margin: 10, cursor: 'pointer' }} />
      </Socials>
      <FooterLinks>
        <a href="">Press Room</a>
        <a href="">Conditions of Use</a>
        <a href="">Privacy Policy</a>
        <a href="">Help</a>
      </FooterLinks>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
width:100%;
padding: 20px 0;
display:flex ;
flex-direction:column;
justify-content: center;
align-items:center;
background:black;
color:white;
margin-top:20px;
`;

const Socials = styled.div`
display:flex ;
flex-direction:row;
justify-content: center;
align-items:center;
margin:10px;
`;


const Copyright = styled.div`
font-size:26px;
font-family: 'PT Sans Narrow', sans-serif;

@media screen and (max-width: 768px){
  font-size:20px;
}
`;

const FooterLinks = styled.div`
font-size:18px;
font-family: 'PT Sans Narrow', sans-serif;
cursor:pointer;

a{
  text-decoration:none;
  color:white;
  margin:20px;

  @media screen and (max-width: 768px){
   margin:0 10px;
   font-size:12px;
}
}


// @media screen and (max-width: 768px){
//     display:flex;
//     flex-direction:column;
//     justify-content:flex-start;
//     align-items:flex-start;
// }
`;

export default Footer