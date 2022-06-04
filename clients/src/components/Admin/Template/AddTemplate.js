import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddTemplate = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    template: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === "template" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("template", data.template);
      formData.append("name", data.name);

      const res = await fetch(`http://localhost:5000/template/upload_template`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", template: "" });
        history.replace("/template");
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
          accept="template/*"
          name="template"
          onChange={handleChange("template")}
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

export default AddTemplate;
