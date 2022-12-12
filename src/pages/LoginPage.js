import { useEffect, useState } from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
const LoginPage = () => {

    const [user, setUser] = useState({});
    function handleCallbackResponse(response) {
        console.log("Encodede JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject)
        setUser(userObject)
    }
    function handleSignOut(event) {
        setUser({});
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.prompt();
    }, [])




    return (
        <MainWrapper>

            <div id='signInDiv'></div>
            <LoginButton>Login with email</LoginButton>

        </MainWrapper>
    )
}

export default LoginPage


const MainWrapper = styled.div`
height:350px;
width:100%;
display:flex;
flex-direction:column ;
align-items:center;
justify-content:center;

`;

const LoginButton = styled.div`
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