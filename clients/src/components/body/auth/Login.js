import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'


const initialState = {
    email: '',
    password : '',
    err : '' ,
    success : ''
}

function Login(){
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const {email, password, err, success} = user

  const handleChangeInput = e => {
      const {name, value} = e.target
      setUser({...user, [name]:value, err: '', success: ''})
  }


  const handleSubmit = async e => {
      e.preventDefault()
      try {
          const res = await axios.post('http://localhost:5000/user/login', {email, password})
          setUser({...user, err: '', success: res.data.msg})

          localStorage.setItem('firstLogin', true)
          sessionStorage.setItem('token' , res.data.token)

          dispatch(dispatchLogin())
          //history("/admin")

      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }

    return (
        <div className="login_page">
            <h2>Login</h2>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
            </form>
            <p>New User ? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login

// import { useContext, useState } from "react";
// import { MdVisibility } from "react-icons/md";
// import { MdVisibilityOff } from "react-icons/md";
// import { isEmpty, isEmail } from "../../utils/validation/Validation";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Input from "../../Input/Input";
// import "././auth.scss";
// import { AuthContext } from "../../../context/AuthContext";

// const initialState = {
//   name: "",
//   password: "",
// };

// const Login = () => {
//   const [visible, setVisible] = useState(false);
//   const [data, setData] = useState(initialState);
//   const { email, password } = data;
//   const { dispatch } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleClick = () => {
//     setVisible(!visible);
//   };

//   const login = async (e) => {
//     e.preventDefault();
    
//     // check fields
//     if (isEmpty(email) || isEmpty(password))
//       return toast("Please fill in all fields.", {
//         className: "toast-failed",
//         bodyClassName: "toast-failed",
//       });

//     // check email
//     if (!isEmail(email))
//       return toast("Please enter a valid email addresss.", {
//         className: "toast-failed",
//         bodyClassName: "toast-failed",
//       });

//     try {
//       const res = await axios.post("http://localhost:5000/user/login", { email, password });
//       localStorage.setItem("_appSignging", true);
//       console.log(res)
//       dispatch({type: "SIGNING"})
//       //dispatch({ type: "SIGNING" });
//     } catch (err) {
//         console.log(err)
//     //   toast(err.response.data.msg, {
//     //     className: "toast-failed",
//     //     bodyClassName: "toast-failed",
//     //   });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <form className="login" onSubmit={login}>
//         <Input
//           type="email"
//           text="Email"
//           name="email"
//           handleChange={handleChange}
//         />
//         <Input
//           name="password"
//           type={visible ? "text" : "password"}
//           icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
//           text="Password"
//           handleClick={handleClick}
//           handleChange={handleChange}
//         />
//         <div className="login_btn">
//           <button type="submit">login</button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;