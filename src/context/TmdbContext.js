
import { createContext, useReducer, useState } from "react";
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
        releaseDate: '2022',
        credits: [],
        searchMovies:[],
        searchTV:[],
    }
    const [state, dispatch] = useReducer(tmdbReducer, initialState);

    //Search

    const [resultMovie, setResultMovie] = useState([])
    const [resultSeries, setResultSeries] = useState([])

    

    const getSearch = async (value) => {
        if (value.length > 0) {
          const resMovies = await fetch(`${URL}search/movie?${params}&language=en-US&query=${value}&page=1`)
          const dataMovies = await resMovies.json()
          const resSeries = await fetch(`${URL}search/tv?${params}&language=en-US&query=${value}&page=1`)
          const dataSeries = await resSeries.json()
          console.log(dataMovies, dataSeries)
          dispatch({ type: 'GET_SEARCH' , searchMovies: dataMovies, searchTV: dataSeries})
        }
      }
    

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

        const creditFetch = await fetch(`${URL}${channel}/${id}/credits?${params}${lang}`);
        const credits = await creditFetch.json();
        function getDirector(job) {
            if (job.job === 'Director') {
                return job.name
            }

        }
        const director = await credits.crew.map(getDirector)

        if (channel === 'tv') {
            dispatch({
                type: 'GET_DETAILS',
                payload: details,
                id: id,
                releaseDate: details.first_air_date.slice(0, 4),
                credits: director
            })
        } else {
            dispatch({
                type: 'GET_DETAILS',
                payload: details,
                id: id,
                releaseDate: details.release_date.slice(0, 4),
                credits: director
            })
        }

        console.log(initialState.movieAndTvID)
    }

    return <TmdbContext.Provider value={{ getSearch, getTop, getPopular, getDetails, searchMovies: state.searchMovies, searchTV: state.searchTV, movies: state.movies, loading: state.loading, detailsLoading: state.detailsLoading, series: state.series, topSeries: state.topSeries, topMovies: state.topMovies, details: state.details, mandtid: state.movieAndTvID, rDate: state.releaseDate, credits: state.credits }} >{children}</TmdbContext.Provider>
}


export default TmdbContext;