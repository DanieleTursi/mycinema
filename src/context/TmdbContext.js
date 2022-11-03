
import { createContext, useReducer } from "react";
import tmdbReducer from './TmdbReducer'
const TmdbContext = createContext();

const TMDB_URL = process.env.REACT_APP_TMDB_URL;
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

export const TmdbProvider = ({ children }) => {
    const initialState = {
        movies: [{ title: 'loading' }, { title: 'loading' }, { title: 'loading' }],
        loading: false
    }
    const [state, dispatch] = useReducer(tmdbReducer, initialState);

    // Set Loading


    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }

    const getPopularMovies = async () => {
        setLoading();
        const params = new URLSearchParams({


            api_key: TMDB_KEY,

        })


        const response = await fetch(`${TMDB_URL}popular?${params}&language=en-US&page=1`);

        const movies = await response.json();

        await dispatch({
            type: 'POPULAR_MOVIES',
            payload: movies.results
        })
        console.log(movies);




    }



    return <TmdbContext.Provider value={{ getPopularMovies, movies: state.movies, loading: state.loading, }} >{children}</TmdbContext.Provider>
}


export default TmdbContext;