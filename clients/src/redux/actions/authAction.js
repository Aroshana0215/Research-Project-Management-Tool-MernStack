import ACTIONS from './index.js'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('http://localhost:5000/user/infor' , {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role == "admin" ? true : false ,
            isStudent: res.data.role == "student" ? true : false ,
            isSupervisor: res.data.role == "supervisor" ? true : false ,
            isCoSupervisor: res.data.role == "coSupervisor" ? true : false ,
            isPanelMember: res.data.role == "panelMember" ? true : false ,
        }
    }
}