
import { array } from "prop-types";
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
        videosLoading: false,
        providerLoading:false,
        loading: false,
        movieAndTvID: '',
        releaseDate: '2022',
        credits: [],
        searchMovies: [],
        searchTV: [],
        searchPeople: [],
        searchLoading: false,
        cast: [],
        actorDetails: [],
        actorLoading: false,
        actorTvCredits: [],
        actorMovieCredits: [],
        creditsLoading: false,
        latestMovies: [],
        videos: [],
        provider: [],
        bestLast20:[]
    }
    const [state, dispatch] = useReducer(tmdbReducer, initialState);


    // Set Loading

    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }

    const setDetailsLoading = () => {
        dispatch({ type: 'SET_DETAILS_LOADING' })
    }

    const setSearchLoading = () => {
        dispatch({ type: 'SET_SEARCH_LOADING' })
    }
    const setActorDetailsLoading = () => {
        dispatch({ type: 'SET_ACTOR_LOADING' })
    }
    const setCreditsLoading = () => {
        dispatch({ type: 'CREDITS_LOADING' })
    }
    const setVideosLoading = () => {
        dispatch({ type: 'VIDEOS_LOADING' })
    }

    const setProviderLoading = () => {
        dispatch({ type: 'SET_PROVIDER_LOADING' })
    }

    const params = new URLSearchParams({
        api_key: TMDB_KEY,

    })


    //Search

    const getSearch = async (value) => {
        if (value.length > 0) {
            setSearchLoading();

            const resMovies = await fetch(`${URL}search/movie?${params}&language=en-US&query=${value}&page=1`)
            const dataMovies = await resMovies.json()
            const resSeries = await fetch(`${URL}search/tv?${params}&language=en-US&query=${value}&page=1`)
            const dataSeries = await resSeries.json()
            const resPeople = await fetch(`${URL}search/person?${params}&language=en-US&query=${value}&page=1`)
            const dataPeople = await resPeople.json()
            // console.log(dataMovies, dataSeries, dataPeople)
            dispatch({ type: 'GET_SEARCH', searchMovies: dataMovies.results, searchTV: dataSeries.results, searchPeople: dataPeople.results })
        }
    }

    // get videos of movies and tv

    const getVideos = async (id, type) => {
        setVideosLoading();


        if (type === 'movie') {
            const movieVideos = await fetch(`${URL}movie/${id}/videos?${params}${lang}`);
            const movieVideosData = await movieVideos.json();

            // console.log(movieVideosData.results);

            dispatch({
                type: 'MOVIE_VIDEOS',
                payload: movieVideosData.results,

            })
        }
        else {
            const tvVideos = await fetch(`${URL}tv/${id}/videos?${params}${lang}`);
            const tvVideosData = await tvVideos.json();
            console.log(tvVideosData.results);
            dispatch({
                type: 'MOVIE_VIDEOS',
                payload: tvVideosData.results,
            })
        }


    }

    // get bestLast20 movies

    const getBestLast20Years = async ()=>{
        setLoading();
        const bestLast20Response = await fetch(`${URL}discover/movie?${params}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2002%2C2022&vote_count.gte=3000&vote_count.lte=100000&with_original_language=en`);
        const bestLast20Data = await bestLast20Response.json();

        dispatch({
            type: 'GETBESTLAST20_MOVIES',
            payload: bestLast20Data.results
        })
        
    }

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

    //get provider for a movie or shows

    const getProvider = async (id,channel) => {
        setProviderLoading();
        const providerResponse = await fetch(`${URL}${channel}/${id}/watch/providers?${params}`);
        const providerData = await providerResponse.json();
    
            dispatch({
                type: 'PROVIDER',
                payload: providerData.results,
            })
    }

    // get movie and tv credits of an actor

    const getActorCredits = async (id) => {
        setCreditsLoading()
        const movieCredits = await fetch(`${URL}person/${id}/movie_credits?${params}${lang}`);
        const movieCreditsData = await movieCredits.json()

        const tvCredits = await fetch(`${URL}person/${id}/tv_credits?${params}${lang}`);
        const tvCreditsData = await tvCredits.json()
        // console.log(tvCreditsData.cast, movieCreditsData.cast);

        dispatch({
            type: 'ACTOR_CREDITS',
            movieCredits: movieCreditsData.cast,
            tvCredits: tvCreditsData.cast,
        })
    }

    // get the latest movie
    const getLatestMovies = async () => {
        const latestMovies = await fetch(`${URL}movie/now_playing?${params}${lang}`);
        const resultLatestMovies = await latestMovies.json()
        // console.log(resultLatestMovies)

        dispatch({
            type: 'GET_LATEST_MOVIES',
            payload: resultLatestMovies.results
        })
    }

    // get the details of the actor
    const getActorDetails = async (id) => {
        setActorDetailsLoading();
        const actorFetch = await fetch(`${URL}person/${id}?${params}${lang}`);
        const actorDetails = await actorFetch.json();

        dispatch({
            type: 'GET_ACTOR_DETAILS',
            payload: actorDetails
        })
    }

    // get the details of a show, movie or actor
    const getDetails = async (id, channel) => {
        setDetailsLoading();
        getProvider(id,channel)
        const response = await fetch(`${URL}${channel}/${id}?${params}${lang}`);
        const details = await response.json();

        const creditFetch = await fetch(`${URL}${channel}/${id}/credits?${params}${lang}`);
        const credits = await creditFetch.json();

        const airDate = () => { if (details.first_air_date) { return details.first_air_date.slice(0, 4) } else { return '' } }
        const releaseDate = () => { if (details.release_date) { return details.release_date.slice(0, 4) } else { return '' } }

        if (channel === 'tv') {

            dispatch({
                type: 'GET_DETAILS',
                payload: details,
                id: id,
                releaseDate: airDate(),
                credits: null,
                cast: credits.cast
            })
        }

        else {
            if (credits.crew === undefined || credits.crew.length === 0) {
                dispatch({
                    type: 'GET_DETAILS',
                    payload: details,
                    id: id,
                    releaseDate: releaseDate(),
                    credits: 'N/N',
                    cast: credits.cast
                })
            }
            else {
                const dir = credits.crew.find(element => element.job === 'Director').name
                dispatch({
                    type: 'GET_DETAILS',
                    payload: details,
                    id: id,
                    releaseDate: releaseDate(),
                    credits: dir,
                    cast: credits.cast
                })

            }
        }
    }

    return <TmdbContext.Provider value={{
        getVideos,
        getLatestMovies,
        getSearch,
        getTop,
        getPopular,
        getDetails,
        getActorDetails,
        getActorCredits,
        getProvider,
        getBestLast20Years,
        videos: state.videos,
        latestMovies: state.latestMovies,
        videosLoading: state.videosLoading,
        creditsLoading: state.creditsLoading,
        actorLoading: state.actorLoading,
        providerLoading:state.providerLoading,
        searchMovies: state.searchMovies,
        cast: state.cast,
        searchPeople: state.searchPeople,
        searchTV: state.searchTV,
        movies: state.movies,
        loading: state.loading,
        searchLoading: state.searchLoading,
        detailsLoading: state.detailsLoading,
        series: state.series,
        topSeries: state.topSeries,
        topMovies: state.topMovies,
        provider:state.provider,
        details: state.details,
        mandtid: state.movieAndTvID,
        rDate: state.releaseDate,
        credits: state.credits,
        bestLast20:state.bestLast20,
        actorDetails: state.actorDetails,
        actorTvCredits: state.actorTvCredits,
        actorMovieCredits: state.actorMovieCredits,
    }} >{children}</TmdbContext.Provider>
}


export default TmdbContext;