export const tokenReducer = (state = "", action) => {
    switch (action.type) {
        case 'LOGIN':
            state = action.payload.token
            return state
        case 'REFRESH':
            state = action.payload.token
            return state
        case 'LOGOUT':
            state = ""
            return state
        default:
            return state
    }
}