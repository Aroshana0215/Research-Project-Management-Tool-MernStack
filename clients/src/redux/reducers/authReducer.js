import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isStudent : false ,
    isAdmin: false,
    isSupervisor: false,
    isCoSupervisor: false,
    isPanelMember: false 

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
                isStudent : action.payload.isStudent ,
                isAdmin: action.payload.isAdmin,
                isSupervisor: action.payload.isSupervisor,
                isPanelMember: action.payload.isPanelMember,
                isCoSupervisor: action.payload.isCoSupervisor
            }
            default:
                return state
    }
}

export default authReducer