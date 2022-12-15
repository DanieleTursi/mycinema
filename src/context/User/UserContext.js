import React, { createContext, useReducer, useEffect } from "react";
import userReducer from "./UserReducer";
import jwt_decode from 'jwt-decode';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";


const UserContext = createContext('')


export const UserProvider = ({ children }) => {
    const initialState = {
        register: false,
        userRegister: {},
        showNavButtons: true,
        user: null,
        loginError: null,
        registerError: null,

    }
    const [state, dispatch] = useReducer(userReducer, initialState);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser != null) {
                dispatch({
                    type: 'USER_LOGGED_IN',
                    payload: currentUser,
                })
            }


        });
    }, []);



    // Register

    const handleRegister = (firstName, sirName, email, password) => {
        const user = {
            firstName: firstName,
            sirName: sirName,
            email: email,
            password: password,
            initials: firstName.charAt(0) + sirName.charAt(0)
        }
        dispatch({
            type: 'REGISTER_USER',
            payload: user
        })

        console.log(user);

    }
    const registerFunc = async (email, password, setErrorSpan, name) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });

            dispatch({
                type: 'LOGIN',
                error: null,
            })
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {

                setErrorSpan('*Email already in use*')
            } else {
                setErrorSpan(error.message)
            }
        }
    }

    // Login
    const login = async (loginEmail, loginPassword, setLoginPassword,
        setLoginEmail) => {

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            dispatch({
                type: 'LOGIN',
                error: null
            })
            setLoginPassword('');
            setLoginEmail('');
        } catch (error) {
            console.log(error.message);

            if (error.message === 'Firebase: Error (auth/user-not-found).') {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: 'User not found',
                })
            } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: 'Wrong Password',
                })
            }
            else {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: error.message,
                })
            }


        }
    }
    // Google login

    const handleGoogleLogin = async () => {
        signInWithGoogle().then((result) => {
            const userObject = {
                name: result.user.displayName,
                email: result.user.email,
                profilePic: result.user.photoURL,
            }
            console.log(userObject)
            dispatch({
                type: 'LOGIN',
                payload: userObject
            })
        })
            .catch((error) => {
                console.log(error)
            })



    }



    // display on Login page register form

    const handleRegisterClick = (name) => {
        if (name === 'register') {
            dispatch({
                type: 'SET_REGISTER_CLICKED',
                payload: true,
            })
        } else {
            dispatch({
                type: 'SET_REGISTER_CLICKED',
                payload: false,
            })
        }
    }

    // Logout

    const handleLogout = async () => {
        const confirm = window.confirm('Are you sure you want to logout?')
        if (confirm) {


            await signOut(auth)

            dispatch({
                type: 'LOGOUT',
                payload: null,
            })
        }
    }


    return <UserContext.Provider value={{

        handleRegisterClick,
        handleRegister,
        handleGoogleLogin,
        registerFunc,
        handleLogout,
        login,
        loginError: state.loginError,
        showNavButtons: state.showNavButtons,
        register: state.register,
        user: state.user,
        registerError: state.registerError,



    }}>{children}</UserContext.Provider>
}

export default UserContext;

