import React, { createContext, useReducer } from "react";
import userReducer from "./UserReducer";

const UserContext = createContext('')


export const UserProvider = ({ children }) => {


    const initialState = {
        register: false,


    }
    const [state, dispatch] = useReducer(userReducer, initialState);

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
        register: state.register,

    }}>{children}</UserContext.Provider>
}

export default UserContext;

