import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddAssignment = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    assignment: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === "assignment" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("assignment", data.assignment);
      formData.append("name", data.name);

      const res = await fetch(`http://localhost:5000/assignment/upload_assignment`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", assignment: "" });
        history.replace("/assignment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <br/><br/><h3>Template Upload </h3><br/>
      <div className="mb-3">
      <label> Template name</label>
        <input
          className="form-control"
          placeholder="Enter name"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      
      <div className="mb-3">
      <label> File</label>
        <input
          className="form-control"
          type="file"
          accept="assignment/*"
          name="assignment"
          onChange={handleChange("assignment")}
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

export default AddAssignment;
