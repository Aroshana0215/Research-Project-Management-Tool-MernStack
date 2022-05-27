import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function UpdateTopic() {
  let history = useHistory();
  const { id } = useParams();
  //   const cusID = useSelector((state) => state.cusLogin.userInfo._id);

  const [delivery, updateDeliveryDetails] = useState({
    StudentID: "",
    topicName: "",
    description: "",
    feedBack: "",
    status: "",
  });

  const {
    StudentID,
    topicName,
    description,
    feedBack,
    status,
    // customerID = cusID,
  } = delivery;

  const onInputChange = (e, input_field) => {
    updateDeliveryDetails({ ...delivery, [input_field]: e.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/topic/${id}`, delivery)
      .then((response) => {
        alert("Successfully Updated Delivery Details");
        console.log(response);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const loaddelivery = async () => {
    const res = await axios.get(`http://localhost:5000/topic/${id}`);
    updateDeliveryDetails(res.data.delivery);
  };
  useEffect(() => {
    loaddelivery();
  }, []);

  return (
    <div>
      <div className="container">
        <form className="row g-3" onSubmit={onSubmit}>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              StudentID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="StudentID"
              defaultValue={StudentID}
              onChange={(e) => onInputChange(e, "StudentID")}
            ></input>
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              topicName
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="topicName"
              defaultValue={topicName}
              onChange={(e) => onInputChange(e, "topicName")}
            ></input>
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Street"
              defaultValue={description}
              onChange={(e) => onInputChange(e, "description")}
            ></input>
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              feedBack
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="feedBack"
              defaultValue={feedBack}
              onChange={(e) => onInputChange(e, "feedBack")}
            ></input>
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              status
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="status"
              defaultValue={status}
              onChange={(e) => onInputChange(e, "status")}
            ></input>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Update Delivery Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateTopic;
