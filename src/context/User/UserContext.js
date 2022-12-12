import React, { createContext, useReducer } from "react";


const UserContext = createContext('')


export const UserProvider = ({ children }) => {



    return <UserContext.Provider value={{}} >{children}</UserContext.Provider>
}

export default UserProvider;