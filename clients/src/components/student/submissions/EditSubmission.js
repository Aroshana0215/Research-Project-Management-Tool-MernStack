import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditSubmission = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    studentID: "",
    submission: "",
    fileName : "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/submission/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "submission" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("submission", data.submission);
      formData.append("studentID", data.studentID);
      formData.append("fileName", data.fileName);

      const res = await fetch(`http://localhost:5000/submission/edit/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ studentID: "", submission: ""  , fileName : "" });
        history.replace("/submission");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <br/><br/><h3>Edit Document Submission  </h3><br/>
      <div className="mb-3">
        <label> Template name</label><br/>
        <input
          className="form-control"
          type="text"
          name="studentID"
          value={data.studentID}
          onChange={handleChange("studentID")}
        />
      </div>
      <div className="mb-3">
      <label> File</label><br/>
        <input
          className="form-control"
          type="file"
          accept="submission/*"
          name="submission"
          placeholder={data.fileName}
          onChange={handleChange("submission")}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSubmission;
