import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./OrderStyles.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

export default function GroupRegistration() {
  const initialState = {
    GroupMembers: [
      { user_id: "" },
      { user_id: "" },
      { user_id: "" },
      { user_id: "" },
    ],
  };

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [MStudent, setMStudet] = useState([]);

  const [StudentID, setStudentID] = useState("");
  const [GroupName, setGroupName] = useState("");
  const [Cosupervisor, setCosupervisor] = useState("");
  const [Supervisor, setSupervisor] = useState("");
  const [leader, setLeader] = useState("");
  const [id, setid] = useState("");

  const [member1, setMember1] = useState({});
  const [member2, setMember2] = useState({});
  const [member3, setMember3] = useState({});
  const [member4, setMember4] = useState({});
  const [GroupMembers, setGroup] = useState([]);

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
    console.log(
      "🚀 ~ file: GroupRegistration.js ~ line 52 ~ sendData ~ newCustomer",
      newCustomer
    );
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

  const appendMembers = () => {
    let members = [];
    members.push(member1);
    members.push(member2);
    members.push(member3);
    members.push(member4);
    console.log(
      "🚀 ~ file: GroupRegistration.js ~ line 79 ~ appendMembers ~ members",
      members
    );

    setGroup(members);
  };

  const handleMember1Change = (selectedOption) => {
    console.log(
      "🚀 ~ file: GroupRegistration.js ~ line 76 ~ handleMember1Change ~ selectedOption",
      selectedOption
    );
    setMember1({ ...member1, user_id: selectedOption.target.value });
  };
  const handleMember2Change = (selectedOption) => {
    setMember2({ ...member2, user_id: selectedOption.target.value });
  };
  const handleMember3Change = (selectedOption) => {
    setMember3({ ...member3, user_id: selectedOption.target.value });
  };
  const handleMember4Change = (selectedOption) => {
    setMember4({ ...member4, user_id: selectedOption.target.value });
  };

  useEffect(() => {
    function getMStudent() {
      axios
        .get(" http://localhost:5000/group/mutualUsers")
        .then((res) => {
          setMStudet(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getMStudent();
  }, []);

  useEffect(() => {
    console.log(MStudent);
  }, [MStudent]);

  useEffect(() => {
    appendMembers();

    console.log(
      "🚀 ~ file: GroupRegistration.js ~ line 113 ~ useEffect ~ group",
      GroupMembers
    );
  }, [member1, member2, member3, member4]);
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
          select 1st Members :
          <select
            class="form-select"
            aria-label="Disabled select example"
            onChange={handleMember1Change}
          >
            <option selected>Open this select menu</option>
            {MStudent.length > 0 &&
              MStudent.map((mutuls) => (
                <option value={mutuls._id} id={mutuls.name}>
                  {mutuls.name}
                </option>
              ))}
          </select>
          select 2nd Members :
          <select
            class="form-select"
            aria-label="Disabled select example"
            onChange={handleMember2Change}
          >
            <option selected>Open this select menu</option>
            {MStudent.length > 0 &&
              MStudent.map((mutuls) => (
                <option value={mutuls._id} id={mutuls.name}>
                  {mutuls.name}
                </option>
              ))}
          </select>
          select 3rd Members :
          <select
            class="form-select"
            aria-label="Disabled select example"
            onChange={handleMember3Change}
          >
            <option selected>Open this select menu</option>
            {MStudent.length > 0 &&
              MStudent.map((mutuls) => (
                <option value={mutuls._id} id={mutuls.name}>
                  {mutuls.name}
                </option>
              ))}
          </select>
          select 4th Members :
          <select
            class="form-select"
            aria-label="Disabled select example"
            onChange={handleMember4Change}
          >
            <option selected>Open this select menu</option>
            {MStudent.length > 0 &&
              MStudent.map((mutuls) => (
                <option value={mutuls._id} id={mutuls.name}>
                  {mutuls.name}
                </option>
              ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Add a topic
          </button>
        </Form>
      </div>
    </div>
  );
}
