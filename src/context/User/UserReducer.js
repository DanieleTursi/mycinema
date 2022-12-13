const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REGISTER_CLICKED':
            return {
                ...state,
                register: action.payload,
            }
        case 'REGISTER_USER':
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state
    }
}

export default userReducer;