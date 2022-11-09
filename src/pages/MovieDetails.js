import React, { useContext, useEffect } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';

const MovieDetails = () => {
    const { details, detailsLoading, getDetails } = useContext(TmdbContext);
    const [showId, setShowId] = useLocalStorage('id', '');
    const [screenType, setScreenType] = useLocalStorage('st', '');
    useEffect(() => {
        getDetails(showId, screenType)

    }, [])
    if (!detailsLoading) {
        return (
            <div>{details.title}</div>
        )
    }
    else {
        <h1>...Loading</h1>
    }
}

export default MovieDetails