import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./OrderStyles.css";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

export default function RequestFor() {
  let history = useHistory();
  const { id } = useParams();

  const [salaryplan, updateSalaryplan] = useState({
    status: "",
    StudentID: "",
    GroupName: "",
  });

  const { status, StudentID, GroupName } = salaryplan;

  const onInputChange = (e, input_field) => {
    updateSalaryplan({ ...salaryplan, [input_field]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/group/update/${id}`, salaryplan)
      .then((res) => {
        alert("You have succesfully updated");
        history.push("/student/group/myGroup");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const loadsalaryplan = async () => {
    const res = await axios.get(`http://localhost:5000/group/getAgroup/${id}`);
    updateSalaryplan(res.data);
    // alert(res.data);
  };
  useEffect(() => {
    loadsalaryplan();
  }, []);

  return (
    <div className="App">
      <div className="header"></div>

      <div className="content">
        <div className="container">
          <form className="row g-3" onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                StudentID
              </label>
              <input
                id="StudentID"
                type="text"
                className="form-control"
                placeholder="StudentID"
                defaultValue={StudentID}
                onChange={(e) => onInputChange(e, "StudentID")}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                GroupName
              </label>
              <input
                id="GroupName"
                type="text"
                className="form-control"
                placeholder="GroupName"
                defaultValue={GroupName}
                onChange={(e) => onInputChange(e, "GroupName")}
              ></input>
            </div>

            <label htmlFor="phone" class="fw-bold">
              Request for co-supervicer and supervicer
            </label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="requested"
                required
                onChange={(e) => onInputChange(e, "status")}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                request
              </label>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}