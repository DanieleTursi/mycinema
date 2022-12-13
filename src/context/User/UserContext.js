import React, { createContext, useReducer } from "react";
import userReducer from "./UserReducer";

const UserContext = createContext('')


export const UserProvider = ({ children }) => {


    const initialState = {
        register: false,
        user: {},


    }
    const [state, dispatch] = useReducer(userReducer, initialState);


    const handleRegister = (firstName, sirName, email, password) => {
        const user = {
            firstName: firstName,
            sirName: sirName,
            email: email,
            password: password
        }
        dispatch({
            type: 'REGISTER_USER',
            payload: user
        })
        console.log(user);
    }


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



    return <UserContext.Provider value={{

        handleRegisterClick,
        handleRegister,
        register: state.register,

    }}>{children}</UserContext.Provider>
}

export default UserContext;

