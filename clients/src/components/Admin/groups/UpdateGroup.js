import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function UpdateGroup() {
  let history = useHistory();
  const { id } = useParams();

  const [salaryplan, updateSalaryplan] = useState({
    GroupName,
    Supervisor,
    Cosupervisor,
    status,
    createdAt,
    updatedAt,
  });

  const { GroupName, Supervisor, Cosupervisor, status, createdAt, updatedAt } =
    salaryplan;

  const onInputChange = (e, input_field) => {
    updateSalaryplan({ ...salaryplan, [input_field]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/group/update/${id}`, salaryplan)
      .then((res) => {
        alert("You have succesfully updated");
        history.push("/Admin/group/list/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const loadsalaryplan = async () => {
    const res = await axios.get(`http://localhost:5000/group/getAgroup/${id}`);
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
            {/* <div className="mb-3">
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
            </div> */}
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
                readOnly
                onChange={(e) => onInputChange(e, "GroupName")}
              ></input>
            </div>
            {/* <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                description
              </label>
              <input
                id="description"
                type="text"
                className="form-control"
                placeholder="description"
                defaultValue={description}
                readOnly
                onChange={(e) => onInputChange(e, "description")}
              ></input>
            </div> */}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Supervisor
              </label>
              <input
                id="Supervisor"
                type="text"
                className="form-control"
                defaultValue={Supervisor}
                onChange={(e) => onInputChange(e, "Supervisor")}
              ></input>
            </div>{" "}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Cosupervisor
              </label>
              <input
                id="Cosupervisor"
                type="text"
                className="form-control"
                defaultValue={Cosupervisor}
                onChange={(e) => onInputChange(e, "Cosupervisor")}
              ></input>
            </div>{" "}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                status
              </label>
              <input
                id="status"
                type="text"
                className="form-control"
                defaultValue={status}
                onChange={(e) => onInputChange(e, "status")}
              ></input>
            </div>{" "}
            <br />
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                createdAt
              </label>
              <input
                id="createdAt"
                type="text"
                className="form-control"
                defaultValue={createdAt}
                onChange={(e) => onInputChange(e, "createdAt")}
              ></input>
            </div>{" "}
            <br />
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                updatedAt
              </label>
              <input
                id="updatedAt"
                type="text"
                className="form-control"
                defaultValue={updatedAt}
                onChange={(e) => onInputChange(e, "updatedAt")}
              ></input>
            </div>{" "}
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
export default UpdateGroup;