
import { createContext, useReducer } from "react";
import tmdbReducer from './TmdbReducer'
const TmdbContext = createContext();

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
const URL = 'https://api.themoviedb.org/3/'
const lang = '&language=en-US&page=1';
export const TmdbProvider = ({ children }) => {
    const initialState = {
        movies: [],
        series: [],
        topSeries: [],
        topMovies: [],
        details: [],
        detailsLoading: false,
        loading: false,
        movieAndTvID: '',
    }
    const [state, dispatch] = useReducer(tmdbReducer, initialState);

    // Set Loading


    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }
    const setDetailsLoading = () => {
        dispatch({ type: 'SET_DETAILS_LOADING' })
    }
    const params = new URLSearchParams({
        api_key: TMDB_KEY,

    })
    // get popular Movies and Shows
    const getPopular = async () => {
        setLoading();
        const movieResponse = await fetch(`${URL}movie/popular?${params}${lang}`);
        const movieData = await movieResponse.json();
        const tvResponse = await fetch(`${URL}tv/popular?${params}${lang}`);
        const tvData = await tvResponse.json();

        dispatch({
            type: 'POPULAR_SHOWS',
            payload: tvData.results
        })
        dispatch({
            type: 'POPULAR_MOVIES',
            payload: movieData.results
        })
    }
    // get the top movies and shows
    const getTop = async () => {
        setLoading();
        const movieResponse = await fetch(`${URL}movie/top_rated?${params}${lang}`);
        const movieData = await movieResponse.json();
        const tvResponse = await fetch(`${URL}tv/top_rated?${params}${lang}`);
        const tvData = await tvResponse.json();
        dispatch({
            type: 'TOP_SHOWS',
            payload: tvData.results,
        })
        dispatch({
            type: 'TOP_MOVIES',
            payload: movieData.results,
        })
    }
    // get the details of a show or movie
    const getDetails = async (id, channel) => {
        setDetailsLoading();
        const response = await fetch(`${URL}${channel}/${id}?${params}${lang}`);
        const details = await response.json();

        console.log(details)

        dispatch({
            type: 'GET_DETAILS',
            payload: details,
            id: id,
        })
        console.log(initialState.movieAndTvID)
    }

    return <TmdbContext.Provider value={{ getTop, getPopular, getDetails, movies: state.movies, loading: state.loading, detailsLoading: state.detailsLoading, series: state.series, topSeries: state.topSeries, topMovies: state.topMovies, details: state.details, mandtid: state.movieAndTvID }} >{children}</TmdbContext.Provider>
}


export default TmdbContext;