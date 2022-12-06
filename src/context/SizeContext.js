import React, { createContext, useReducer } from "react";
import sizeReducer from "./SizeReducer";


const SizeContext = createContext('')


export const SizeProvider = ({ children }) => {


    const initialState = {

        isSmall: false,
        handleResize: handleResize,

    }
    const [state, dispatch] = useReducer(sizeReducer, initialState);


    function handleResize() {

        if (window.innerWidth < 768) {

            dispatch({
                type: 'SET_SCREEN_SMALL',
                payload: true,
            })
        }
        else {

            dispatch({
                type: 'SET_SCREEN_SMALL',
                payload: false,
            })
        }


    }
    React.useEffect(() => {


        window.addEventListener('resize', handleResize)
    }, [state.isSmall])



    return <SizeContext.Provider value={{ isSmall: state.isSmall, handleResize: state.handleResize }}>{children}</SizeContext.Provider>

}

export default SizeContext;