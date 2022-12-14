import { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/Button/LoginButton';
import UserContext from '../context/User/UserContext';
import { StyledButton } from '../components/Button/Button'

const LoginPage = () => {

    const { register, handleRegister, handleLogin, handleGoogleLogin, showNavButtons } = useContext(UserContext)
    const navigate = useNavigate();



    useEffect(() => {
        /* global google */

        if (!showNavButtons) {
            navigate('/');
        }

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(document.getElementById("signInDiv"),
            { theme: "outline", size: "large", }
        )
        google.accounts.id.prompt();
    }, [])

    const [firstName, setFirstName] = useState('');
    const [sirName, setSirName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const resetForm = () => {
        setFirstName('');
        setSirName('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setConfirmEmail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (email != confirmEmail || password != confirmPassword) {
            if (email != confirmEmail) {
                setConfirmEmail('Email doesn`t match')
                setEmailError(true)
            }
            if (password != confirmPassword) {
                setConfirmPassword('');
                setPasswordError(true)
            }
        } else {
            if (password.match(passw)) {

                console.log('registered');
                handleRegister(firstName, sirName, email, password);
                resetForm();

            }
            else {
                alert('Password must include 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
                console.log('Wrong')
            }

        }


    }
    const handleErrorFix = (e) => {
        if (e.target.type === 'email' && emailError === true) {
            setConfirmEmail('');
            setEmailError(false);
        }
        if (e.target.type === 'password' && passwordError === true) {
            setConfirmPassword('');
            setPasswordError(false);

        }
    }

    return (
        <MainWrapper>
            {!register ? <LoginButton name='Login with email'></LoginButton> :
                <RegisterForm onSubmit={handleSubmit}>
                    <input type='text' onChange={(e) => { setFirstName(e.target.value) }} value={firstName} placeholder='First name' required />
                    <input type='text' onChange={(e) => { setSirName(e.target.value) }} value={sirName} placeholder='Sir name' required />
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder='Email' required />
                    <ConfirmEmail onClick={(e) => {
                        handleErrorFix(e)
                    }}
                        type="email" er={emailError} onChange={(e) => { setConfirmEmail(e.target.value) }} value={confirmEmail} placeholder='Confirm Email' />
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder='Password' />
                    <ConfirmPassword
                        onClick={(e) => {
                            handleErrorFix(e)
                        }}
                        type="password" er={passwordError} onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} placeholder='Confirm Password' />
                    <button type="submit">Register</button>

                    <span>Password must include 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter</span>
                </RegisterForm>
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
const RegisterForm = styled.form`
width:350px;
height:500px;
/* border:1px dotted red; */
display:flex;
flex-direction:column;
align-items:center;

input{
    width:80%;
    height:20px;
    margin-top:5px;
    border-radius:7px ;
    border:1px solid grey;
}
button{
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
}
span{
margin-top:10px;    
width:80%;
font-size:12px;
text-align:center;
}
`;

const ErrorColors = css`
color:red;
border:1px solid red;

`;


const ConfirmEmail = styled.input`
width:80%;
    margin-top:5px;
    ${props => props.er && ErrorColors}
    
`;

const ConfirmPassword = styled.input`
width:80%;
    margin-top:5px;

    ${props => props.er && ErrorColors}
`;