import { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/User/UserContext';
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {

    const { register, handleGoogleLogin, login, registerFunc, user, loginError, registerError } = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {

        if (user != null) {
            navigate('/')
        }
    }, [user])
    const [firstName, setFirstName] = useState('');
    const [sirName, setSirName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorSpan, setErrorSpan] = useState('');





    const handleRegister = (e) => {
        e.preventDefault();
        const name = `${firstName} ${sirName}`
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (email != confirmEmail || password != confirmPassword) {
            if (email != confirmEmail) {
                setConfirmEmail('')
                setEmailError(true)
            }
            if (password != confirmPassword) {
                setConfirmPassword('');
                setPasswordError(true)
            }
        } else {
            if (password.match(passw)) {


                registerFunc(email, password, setErrorSpan, name);


                console.log(registerError)
            }
            else {
                alert('Password must include 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
                console.log(email, password)
            }

        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(loginEmail, loginPassword, setLoginPassword, setLoginEmail);
    }




    return (
        <MainWrapper>
            {register ?
                <RegisterForm onSubmit={handleRegister}>
                    <input type="text" placeholder='First name' onChange={(e) => { setFirstName(e.target.value) }} required value={firstName} />
                    <input type="text" placeholder='Sir name' onChange={(e) => { setSirName(e.target.value) }} required value={sirName} />
                    <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} required value={email} />
                    <input onClick={() => { setEmailError(false) }} type="email" placeholder='Confirm Email' required onChange={(e) => { setConfirmEmail(e.target.value) }} value={confirmEmail} />
                    {emailError && <span>*Email doesn`t match*</span>}
                    <input type="password" placeholder='Password' required onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <input onClick={() => { setPasswordError(false) }} type="password" placeholder='Confirm Password' required onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
                    {passwordError && <span>*Password doesn`t match*</span>}
                    <button type='submit'>Register</button>
                    <span>{errorSpan}</span>
                    <p>Password must include 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter</p>
                </RegisterForm> :
                <>
                    <LoginForm onSubmit={handleLogin}>
                        <input type="email" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} placeholder='Email' />
                        <input type="password" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value) }} placeholder='Password' />
                        <button type='submit'>Login</button>
                        <span>{loginError}</span>
                    </LoginForm>
                    <GoogleLoginButton onClick={handleGoogleLogin} >
                        <GoogleIcon />
                        <span>Sign in with Google</span>
                    </GoogleLoginButton>
                </>
            }




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

h5{
    margin: 10px 0;
}

input{
    width:80%;
    height:20px;
    margin-top:5px;
    border-radius:7px ;
    border:1px solid grey;
}
`;
const ButtonCss = css`
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
`;

const RegisterForm = styled.form`
width:350px;
height:500px;
/* border:1px dotted red; */
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

button{
   ${ButtonCss}
}
span{
margin-top:5px;    
width:80%;
font-size:12px;
text-align:center;
color:red;
font-weight:bold;
}
p{
    font-size:10px;
    max-width:280px;
    text-align:center;
}
`;
const LoginForm = styled.form`
width:350px;
height:150px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

button{
   ${ButtonCss}
}
span{
    color:red;
}
`;

const GoogleLoginButton = styled.div`
height:35px;
width:200px;
border-radius:4px;

display:flex;
align-items:center;
cursor:pointer;
justify-content:space-around;
box-shadow:0 1px  1px grey ;
&:hover{
    background:#ECF0F4;
}
span{
    font-weight:bold ;
    color:grey;
    font-size:14px;
    margin-right:10px;
}
`;

const GoogleIcon = styled(FcGoogle)`
width:20%;
height:70%;

`;