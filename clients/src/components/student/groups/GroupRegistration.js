import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./OrderStyles.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

export default function GroupRegistration() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [StudentID, setStudentID] = useState("");
  const [GroupName, setGroupName] = useState("");
  const [GroupMembers, setGrupMembers] = useState("");
  const [Cosupervisor, setCosupervisor] = useState("");
  const [Supervisor, setSupervisor] = useState("");
  const [leader, setLeader] = useState("");
  const [id, setid] = useState("");

  let history = useHistory();
  // const cusID = useSelector((state) => state.cusLogin.userInfo._id);

  useEffect(() => {
    setid(user?._id);
  });

  useEffect(() => {
    console.log(id);
    setStudentID(id);
    setLeader(id);
  }, [id]);

  function sendData(e) {
    e.preventDefault();
    const newCustomer = {
      StudentID,
      GroupName,
      GroupMembers,
      Cosupervisor,
      Supervisor,
      leader,
    };

    axios
      .post("http://localhost:5000/group/register", newCustomer)
      .then((res) => {
        // alert("Topic Details Added Successfully");
        console.log(res);
        history.push("*");
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
  }

  return (
    <div className="container">
      <div className="oneDetail">
        <Form onSubmit={sendData}>
          {/* <div className="form-group">
            <label htmlFor="name">StudentID</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Customer Name"
              onChange={(e) => {
                setStudentID(e.target.value);
              }}
              required
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="GroupName">Group Name</label>
            <input
              type="text"
              className="form-control"
              id="GroupName"
              placeholder="Enter your Group Name"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="GroupMembers">Group Members</label>
            <input
              type="text"
              className="form-control"
              id="GroupMembers"
              placeholder="Enter your GroupMembers names and id"
              onChange={(e) => {
                setGrupMembers(e.target.value);
              }}
              required
            />
          </div>
          {/* 
          <div className="form-group">
            <label htmlFor="city">Customer City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter Customer City"
              onChange={(e) => {
                setCosupervisor(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Customer City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter Customer City"
              onChange={(e) => {
                setSupervisor(e.target.value);
              }}
              required
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Add a topic
          </button>
        </Form>
      </div>
    </div>
  );
}
