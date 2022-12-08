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
        default:
            return state
    }
}

export default sizeReducer;