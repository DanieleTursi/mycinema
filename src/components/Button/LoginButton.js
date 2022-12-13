import { checkPropTypes } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const LoginButton = (props) => {
    return (
        <Button>{props.name}</Button>
    )
}

export default LoginButton



const Button = styled.div`
width:198px;
height:38px;
border:1px solid #dadce0;
border-radius:4px ;
margin:5px 0;
display:flex;
align-items:center;
justify-content:center;
font-weight:500;
font-size:14px;
cursor:pointer;
font-family: "Open Sans",arial,sans-serif;
transition-duration: 0.218s;
transition-timing-function: ease;
transition-delay: 0s;

&:hover{
    background-color:#F1F5FA ;
}
`;