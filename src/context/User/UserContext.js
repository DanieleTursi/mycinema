import React, { createContext, useReducer } from "react";
import userReducer from "./UserReducer";
import jwt_decode from 'jwt-decode';



const UserContext = createContext('')


export const UserProvider = ({ children }) => {



    const initialState = {
        register: false,
        userRegister: {},
        showNavButtons: true,
        user: {},

    }
    const [state, dispatch] = useReducer(userReducer, initialState);

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
        handleLogin(user);
    }
    // Login
    function handleLogin(data) {
        dispatch({
            type: 'LOGIN',
            payload: data
        })


    }
    // Google login

    function handleGoogleLogin(response) {

        var userObject = jwt_decode(response.credential);
        console.log(userObject)
        dispatch({
            type: 'LOGIN',
            payload: userObject
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

    const handleLogout = () => {
        const confirm = window.confirm('Are you sure you want to logout?')
        if (confirm) {
            dispatch({
                type: 'LOGOUT',
                payload: {},
            })
        }
    }


    return <UserContext.Provider value={{

        handleRegisterClick,
        handleRegister,
        handleGoogleLogin,
        handleLogin,
        handleLogout,
        showNavButtons: state.showNavButtons,
        register: state.register,
        user: state.user,


    }}>{children}</UserContext.Provider>
}

export default UserContext;

