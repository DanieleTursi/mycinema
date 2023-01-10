import React, { createContext, useReducer } from "react";
import sizeReducer from "./SizeReducer";


const SizeContext = createContext('')


export const SizeProvider = ({ children }) => {


    const initialState = {

        isSmall: false,
        handleResize: handleResize,
        cardItems: 2,
        trailersCount: 3
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
        if (window.innerWidth > 500 && window.innerWidth < 768) {
            dispatch({
                type: 'SET_CARD_ITEMS',
                payload: 3,
            })
        } else {
            dispatch({
                type: 'SET_CARD_ITEMS',
                payload: 2,
            })
        }
        if (window.innerWidth < 1700 && window.innerWidth > 1100) {
            dispatch({
                type: 'SET_TRAILERS_COUNT',
                payload: 2
            })
        } else if (window.innerWidth > 1700) {
            dispatch({
                type: 'SET_TRAILERS_COUNT',
                payload: 3
            })
        } else if (window.innerWidth < 1100) {
            dispatch({
                type: 'SET_TRAILERS_COUNT',
                payload: 1
            })
        }
    }
    React.useEffect(() => {


        window.addEventListener('resize', handleResize)
    }, [state.isSmall])



    return <SizeContext.Provider value={{ isSmall: state.isSmall, handleResize: state.handleResize, cardItems: state.cardItems, trailersCount: state.trailersCount }}>{children}</SizeContext.Provider>

}

export default SizeContext;