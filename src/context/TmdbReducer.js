const tmdbReducer = (state, action) => {
    switch (action.type) {
        case 'POPULAR_MOVIES':
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case 'POPULAR_SHOWS':
            return {
                ...state,
                series: action.payload,
                loading: false
            }
        case 'TOP_SHOWS':
            return {
                ...state,
                topSeries: action.payload,
                loading: false
            }
        case 'TOP_MOVIES':
            return {
                ...state,
                topMovies: action.payload,
                loading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }


        default:
            return state
    }
}

export default tmdbReducer