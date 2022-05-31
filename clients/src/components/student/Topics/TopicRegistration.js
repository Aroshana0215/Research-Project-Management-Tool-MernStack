import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./OrderStyles.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

export default function TopicRegistration() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [StudentID, setStudentID] = useState("");
  const [topicName, settopicName] = useState("");
  const [description, setdescription] = useState("");
  const [feedBack, setfeedBack] = useState("");
  const [status, setstatus] = useState("");
  const [id, setid] = useState("");

  let history = useHistory();
  // const cusID = useSelector((state) => state.cusLogin.userInfo._id);

  useEffect(() => {
    setid(user?._id);
  });

  useEffect(() => {
    console.log(id);
    setStudentID(id);
  }, [id]);

  function sendData(e) {
    e.preventDefault();
    const newCustomer = {
      StudentID,
      topicName,
      description,
      feedBack,
      status,
    };

    axios
      .post("http://localhost:5000/topic", newCustomer)
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
            <label htmlFor="address">Topic Name</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter your Topic Name"
              onChange={(e) => {
                settopicName(e.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">description</label>
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Enter your description"
              onChange={(e) => {
                setdescription(e.target.value);
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
                setfeedBack(e.target.value);
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
                setstatus(e.target.value);
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
