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
                userRegister: action.payload,
            }
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                showNavButtons: false
            }
        case 'LOGOUT':
            return {
                ...state,
                user: action.payload,
                showNavButtons: true
            }
        default:
            return state
    }
}

export default userReducer;