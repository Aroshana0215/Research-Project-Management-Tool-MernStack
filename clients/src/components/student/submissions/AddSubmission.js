import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddSubmission = () => {
  const history = useHistory();
  const [data, setData] = useState({
    studentID: "",
    submission: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === "submission" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("submission", data.submission);
      formData.append("studentID", data.studentID);

      const res = await fetch(`http://localhost:5000/submission/student_submission`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ studentID: "", submission: "" });
        history.replace("/submission");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <br/><br/><h3>Submit Documents </h3><br/>
      <div className="mb-3">
      <label> Student ID</label>
        <input
          className="form-control"
          placeholder="Enter Student ID"
          type="text"
          name="studentID"
          value={data.studentID}
          onChange={handleChange("studentID")}
        />
      </div>
      
      <div className="mb-3">
      <label> File</label>
        <input
          className="form-control"
          type="file"
          accept="submission/*"
          name="submission"
          onChange={handleChange("submission")}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSubmission;
