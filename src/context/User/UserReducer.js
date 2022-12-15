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
                // user: action.payload,
                showNavButtons: false,
                loginError: action.error,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: action.payload,
                showNavButtons: true
            }
        case 'USER_LOGGED_IN':
            return {
                ...state,
                user: action.payload,
                showNavButtons: false
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.payload,

            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                registerError: action.error,
            }
        default:
            return state
    }
}

export default userReducer;