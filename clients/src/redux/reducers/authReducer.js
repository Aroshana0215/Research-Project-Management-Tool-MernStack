import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
    // isSuper: false,
    // isCoSuper: false,
    // isPanel: false
}



const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
            case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                // isSuper: action.payload.isSuper,
                // isPanel: action.payload.isPanel,
                // isCoSuper: action.payload.isCoSuper
            }
            default:
                return state
    }
}

export default authReducer