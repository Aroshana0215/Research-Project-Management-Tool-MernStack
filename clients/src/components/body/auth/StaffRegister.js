import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation.js";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
  department : "",
  cf_password: "",
  err: "",
  success: "",
};

function StaffRegister() {
  const [user, setUser] = useState(initialState);

  const { name, email, password , role , department , cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(password) || isEmpty(role) || isEmpty(department))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        role ,
        department ,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login_page">

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            value={name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="role">Your Role</label>
          <select
            name="role"
            id="role"
            onChange={handleChangeInput}
            value={role}
          >
            <option selected disabled value="">
              Choose Your Role...
            </option>
            <option value="supervisor">Supervisor</option>
            <option value="coSupervisor">CoSupervisor</option>
            <option value="panelMember">Panel Member</option>
          </select>
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            onChange={handleChangeInput}
            value={department}
          >
            <option selected disabled value="">
              Choose Your Department...
            </option>
            <option value="computer science & software engineering">
              DEPARTMENT OF COMPUTER SCIENCE & SOFTWARE ENGINEERING
            </option>
            <option value="computer system engineering">
              DEPARTMENT OF COMPUTER SYSTEMS ENGINEERING
            </option>
            <option value="information technology">
              DEPARTMENT OF INFORMATION TECHNOLOGY
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="cf_password">Password</label>
          <input
            type="password"
            placeholder="Enter confirm password"
            id="cf_password"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default StaffRegister;
