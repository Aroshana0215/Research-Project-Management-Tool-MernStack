import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function UpdateTopic() {
  let history = useHistory();
  const { id } = useParams();

  const [salaryplan, updateSalaryplan] = useState({
    StudentID: "",
    topicName: "",
    description: "",
    feedBack: "",
    status: "",
  });

  const { StudentID, topicName, description, feedBack, status } = salaryplan;

  const onInputChange = (e, input_field) => {
    updateSalaryplan({ ...salaryplan, [input_field]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/topic/${id}`, salaryplan)
      .then((res) => {
        alert("Successfully Updated salaryplan Details");
        history.push("/admin/topic/list");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const loadsalaryplan = async () => {
    const res = await axios.get(`http://localhost:5000/topic/${id}`);
    updateSalaryplan(res.data);
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
                Salary
              </label>
              <input
                id="topicName"
                type="text"
                className="form-control"
                placeholder="topicName"
                defaultValue={topicName}
                onChange={(e) => onInputChange(e, "topicName")}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                description
              </label>
              <input
                id="description"
                type="text"
                className="form-control"
                placeholder="description"
                defaultValue={description}
                onChange={(e) => onInputChange(e, "description")}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                feedBack
              </label>
              <input
                id="feedBack"
                type="text"
                className="form-control"
                placeholder="feedBack"
                defaultValue={feedBack}
                onChange={(e) => onInputChange(e, "feedBack")}
              ></input>
            </div>{" "}
            <label htmlFor="phone" class="fw-bold">
              Status
            </label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="approved"
                required
                onChange={(e) => onInputChange(e, "status")}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                approve
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="rejected"
                required
                onChange={(e) => onInputChange(e, "status")}
              />
              <label class="form-check-label" for="flexRadioDefault2">
                reject
              </label>
            </div>
            <br />
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateTopic;
