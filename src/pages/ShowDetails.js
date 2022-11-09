import React, { useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import TmdbContext from '../context/TmdbContext';

const ShowDetails = (props) => {
    const { details, detailsLoading, getDetails, mandtid } = useContext(TmdbContext);
    const [showId, setShowId] = useLocalStorage('id', '');
    const [screenType, setScreenType] = useLocalStorage('st', '');
    useEffect(() => {
        getDetails(showId, screenType)

    }, [])

    if (!detailsLoading) {
        return (
            <div>{details.name}</div>
        )
    }
    else {
        <h1>...Loading</h1>
    }
}

export default ShowDetails