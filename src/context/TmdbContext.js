
import { createContext, useReducer } from "react";
import tmdbReducer from './TmdbReducer'
const TmdbContext = createContext();

const TMDB_URL = process.env.REACT_APP_TMDB_URL;
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
const URL = 'https://api.themoviedb.org/3/'
const TMDB_TV_URL = 'https://api.themoviedb.org/3/tv/';

export const TmdbProvider = ({ children }) => {
    const initialState = {
        movies: [{ title: 'loading' }, { title: 'loading' }, { title: 'loading' }],
        series: [{ title: 'loading' }, { title: 'loading' }, { title: 'loading' }],
        topSeries: [{ title: 'loading' }, { title: 'loading' }, { title: 'loading' }],
        topMovies: [{ title: 'loading' }, { title: 'loading' }, { title: 'loading' }],
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
    const getPopularMovies = async () => {
        setLoading();

        const response = await fetch(`${TMDB_URL}popular?${params}&language=en-US&page=1`);

        const movies = await response.json();

        dispatch({
            type: 'POPULAR_MOVIES',
            payload: movies.results
        })
    }
    const getPopularShows = async () => {

        setLoading();


        const response = await fetch(`${TMDB_TV_URL}popular?${params}&language=en-US&page=1`);
        const series = await response.json();

        dispatch({
            type: 'POPULAR_SHOWS',
            payload: series.results
        })

    }
    const getTopShows = async () => {
        setLoading();
        const response = await fetch(`${TMDB_TV_URL}top_rated?${params}&language=en-US&page=1`);
        const series = await response.json();

        dispatch({
            type: 'TOP_SHOWS',
            payload: series.results,
        })
    }
    const getTopMovies = async () => {
        setLoading();
        const response = await fetch(`${TMDB_URL}top_rated?${params}&language=en-US&page=1`);
        const movies = await response.json();

        dispatch({
            type: 'TOP_MOVIES',
            payload: movies.results,
        })
    }

    const getDetails = async (id, channel) => {
        setDetailsLoading();
        const response = await fetch(`${URL}${channel}/${id}?${params}&language=en-US&page=1`);
        const details = await response.json();


        dispatch({
            type: 'GET_DETAILS',
            payload: details,
            id: id,
        })
        console.log(initialState.movieAndTvID)
    }

    return <TmdbContext.Provider value={{ getPopularMovies, getPopularShows, getTopShows, getTopMovies, getDetails, movies: state.movies, loading: state.loading, detailsLoading: state.detailsLoading, series: state.series, topSeries: state.topSeries, topMovies: state.topMovies, details: state.details, mandtid: state.movieAndTvID }} >{children}</TmdbContext.Provider>
}


export default TmdbContext;