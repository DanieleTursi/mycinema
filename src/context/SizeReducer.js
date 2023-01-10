const sizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCREEN_SMALL':
            return {
                ...state,
                isSmall: action.payload,
            }
        case 'SET_CARD_ITEMS':
            return {
                ...state,
                cardItems: action.payload,
            }

        case 'SET_TRAILERS_COUNT':
            return {
                ...state,
                trailersCount: action.payload,
            }
        default:
            return state
    }
}

export default sizeReducer;