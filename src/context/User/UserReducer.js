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
                showNavButtons: false,
                loginError: action.error,
                watchlist: action.watchlist,
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
        case 'SIDEBAR_OPEN':
            return {
                ...state,
                sidebarOpen: action.payload,
            }
        case 'GET_DOC_ID':
            return {
                ...state,
                id: action.id,
            }
        case 'ADD_DATA_TO_WATCHLIST':
            return {
                ...state,
                watchlist: action.payload,
            }

        case 'UPDATE_MOVIE_STATE':
            return {
                ...state,
                watchlist: action.payload,
            }
        case 'UPDATE_WATCHLIST':
            return {
                ...state,
                watchlist: action.payload,
            }
        default:
            return state
    }
}

export default userReducer;