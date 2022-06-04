import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditTemplate = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    template: "",
    fileName : "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/template/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "template" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("template", data.template);
      formData.append("name", data.name);
      formData.append("fileName", data.fileName);

      const res = await fetch(`http://localhost:5000/template/edit/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", template: ""  , fileName : "" });
        history.replace("/template");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <br/><br/><h3>Edit Uploaded Template  </h3><br/>
      <div className="mb-3">
        <label> Template name</label><br/>
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-3">
      <label> File</label><br/>
        <input
          className="form-control"
          type="file"
          accept="template/*"
          name="template"
          placeholder={data.fileName}
          onChange={handleChange("template")}
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

export default EditTemplate;
