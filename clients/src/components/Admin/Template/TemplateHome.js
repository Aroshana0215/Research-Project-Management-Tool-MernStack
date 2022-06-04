import { Link } from "react-router-dom";
import React , { useEffect, useState } from "react";

const TemplateHome = () => {
  const [templates, setTemplates] = useState();

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch(`http://localhost:5000/template/get_templates`);
      const data = await res.json();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/template/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedTemplates = templates.filter((template) => template._id !== id);
        setTemplates(updatedTemplates);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container'>
      <br /><br /> <center><h3>Templates</h3></center><br />
      <Link to="/template/add">
        <button className="btn btn-success" type="button">
        Add Template
        </button>
      </Link><br/><br/>
      <div className="row">
        <table className="customers">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              templates?.map((template) => (
                <tr key={template._id}>
                  <td>{template._id}</td>
                  <td>{template.name}</td>
                  <td><a href={template.template}>{template.fileName}</a></td>

                  <td>
                    <Link to={`template/edit/${template._id}`}>
                      <i className="fas fa-edit" title="Edit"></i>
                    </Link>
                    <i className="fas fa-trash-alt" title="Remove"
                      onClick={() => handleDelete(template._id)} ></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplateHome;
