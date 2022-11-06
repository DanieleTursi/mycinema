import React from 'react'
import styled from "styled-components"
import { BiCopyright } from 'react-icons/bi'
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from 'react-icons/bs'

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        <BiCopyright /> Created by Nagy and Tursi
      </Copyright>
      <Socials>
        <BsInstagram size={'30px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsFacebook size={'30px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsTwitter size={'30px'} style={{ margin: 10, cursor: 'pointer' }} />
        <BsYoutube size={'30px'} style={{ margin: 10, cursor: 'pointer' }} />
      </Socials>
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
`;

export default Footer