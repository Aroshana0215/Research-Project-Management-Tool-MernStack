import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditAssignment = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    assignment: "",
    fileName : "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/assignment/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "assignment" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("assignment", data.assignment);
      formData.append("name", data.name);
      formData.append("fileName", data.fileName);

      const res = await fetch(`http://localhost:5000/assignment/edit/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", assignment: ""  , fileName : ""});
        history.replace("/assignment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="assignment/*"
          name="assignment"
          placeholder={data.fileName}
          onChange={handleChange("assignment")}
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

export default EditAssignment;
