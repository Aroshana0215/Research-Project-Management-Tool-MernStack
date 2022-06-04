import { Link } from "react-router-dom";
import React , { useEffect, useState } from "react";

const AssignmentHome = () => {
  const [assignments, setAssignments] = useState();

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await fetch(`http://localhost:5000/assignment/get_assignments`);
      const data = await res.json();
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/assignment/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedAssignments = assignments.filter((assignment) => assignment._id !== id);
        setAssignments(updatedAssignments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container'>
      <br /><br /> <center><h3>Templates</h3></center><br />
      <Link to="/assignment/add">
        <button className="btn btn-success" type="button">
        Add Template
        </button>
      </Link><br />
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
              assignments?.map((assignment) => (
                <tr key={assignment._id}>
                  <td>{assignment._id}</td>
                  <td>{assignment.name}</td>
                  <td><a href={assignment.assignment}>{assignment.fileName}</a></td>

                  <td>
                    <Link to={`assignment/edit/${assignment._id}`}>
                      <i className="fas fa-edit" title="Edit"></i>
                    </Link>
                    <i className="fas fa-trash-alt" title="Remove"
                      onClick={() => handleDelete(assignment._id)} ></i>
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

export default AssignmentHome;
