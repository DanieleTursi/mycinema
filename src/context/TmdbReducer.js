const tmdbReducer = (state, action) => {
    switch (action.type) {
        case 'POPULAR_MOVIES':
            return {
                ...state,
                movies: action.payload,
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