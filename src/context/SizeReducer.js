const sizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCREEN_SMALL':
            return {
                ...state,
                isSmall: action.payload,
            }
        default:
            return state
    }
}

export default sizeReducer;