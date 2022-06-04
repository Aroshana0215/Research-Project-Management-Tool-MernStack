import { Link } from "react-router-dom";
import React , { useEffect, useState } from "react";

const StuSubmissionHome = () => {
  const [submissions, setSubmissions] = useState();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(`http://localhost:5000/submission/get_submissions`);
      const data = await res.json();
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/submission/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedSubmissions = submissions.filter((submission) => submission._id !== id);
        setSubmissions(updatedSubmissions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container'>
      <br /><br /> <center><h3>Submissions</h3></center><br />
      <Link to="/submission/add">
        <button className="btn btn-success" type="button">
        Add Submission
        </button>
      </Link><br/><br/>
      <div className="row">
        <table className="customers">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>File</th>
              <th>Submission Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              submissions?.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.studentID}</td>
                  <td><a href={submission.submission}>{submission.fileName}</a></td>
                  <td>{submission.createdAt.substring(0 , 10 )} At {submission.createdAt.substring(12 , 16)}</td>

                  <td>
                    <Link to={`/submission/edit/${submission._id}`}>
                      <i className="fas fa-edit" title="Edit"></i>
                    </Link>
                    <i className="fas fa-trash-alt" title="Remove"
                      onClick={() => handleDelete(submission._id)} ></i>
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

export default StuSubmissionHome;
