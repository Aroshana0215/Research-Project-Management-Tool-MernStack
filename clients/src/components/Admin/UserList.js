import React, { useState, useEffect } from 'react'
import { showSuccessMsg, showErrMsg } from '../utils/notification/Notification'
import {fetchAllUsers , dispatchGetAllUsers} from '../../redux/actions/usersAction'
import '../body/profile/profile.scss'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState = {
    err: '',
    success: ''
}

function UserList() {
    //const {  success } = data
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const users = useSelector(state => state.users)
    const { user, isAdmin } = auth
    const [callback, setCallback] = useState(false)
    //const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleDelete = async (id) => {
        try {
            if (user._id !== id) {
                if (window.confirm("Are you sure you want to delete this account?")) {
                    setLoading(true)
                    await axios.delete(`http://localhost:5000/user/delete/${id}`, {
                        headers: { Authorization: token }
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }

        } catch (err) {
            //setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className='container'>
            {/* {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}
            {loading && <h3>Loading.....</h3>}

            <div className="col-right">
            <br /><br /><h2>User List</h2><br />

                <div style={{ overflowX: "auto" }}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role == "admin"
                                                    ? <p>Admin</p>
                                                    : user.role == "student" ? <p>Student</p> :  user.role == "supervisor" ? <p>Supervisor</p> : user.role == "coSupervisor" ? <p>CoSupervisor</p> : <p>Panel Member</p>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                                onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList