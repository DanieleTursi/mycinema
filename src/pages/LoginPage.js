import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import LoginButton from '../components/Button/LoginButton';
import UserContext from '../context/User/UserContext';


const LoginPage = () => {

    const { register } = useContext(UserContext)

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
            { theme: "outline", size: "large",}
        )
        google.accounts.id.prompt();
    }, [])




    return (
        <MainWrapper>
            {!register ? <LoginButton name='Login with email'></LoginButton> :
                <LoginButton name='Register'></LoginButton>
            }

            <div>Or</div>
            <div id='signInDiv'></div>


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

