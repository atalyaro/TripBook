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

export const vacationsUserReducer = (state = [], action) => {
    switch (action.type) {
        case 'START':
            state = action.payload.vacations
            return state
        case 'CHANGEFOLLOW':
            state = action.payload.vacations
            return state
        case 'LOGOUT':
            state = []
            return state
        default:
            return state
    }
}

export const vacationsAdminReducer = (state = [], action) => {
    switch (action.type) {
        case 'GETALL':
            state = action.payload.vacations
            return state
        case 'DELETE':
            state = action.payload.vacations
            return state
        case 'EDIT':
            state = action.payload.vacations
            return state
        case 'ADDVAC':
            state = action.payload.vacations
            return state
        default:
            return state
    }
}

export const followsReducer = (state = 0, action) => {
    switch (action.type) {
        case 'RIGTHNOW':
            state = action.payload.follows
            return state
        case 'ADD':
            state += 1
            return state
        case 'DISMISS':
            state -= 1
            return state
        case 'LOGOUT':
            state = 0
            return state
        default:
            return state
    }
}