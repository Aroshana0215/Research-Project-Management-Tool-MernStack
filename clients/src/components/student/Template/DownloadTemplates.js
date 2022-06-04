import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";

function DownloadTemplates() {
    const [assignments, setAssignments] = useState();

    useEffect(() => {
        const fetchAssignments = async () => {
          const res = await fetch(`http://localhost:5000/assignment/get_assignments`);
          const data = await res.json();
          setAssignments(data);
        };
        fetchAssignments();
      }, []);

      
  return (
    <div className='container'>
      <br /><br /> <center><h3>Download Templates</h3></center><br />
      <div className="row">
        <table className="customers">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            {
              assignments?.map((assignment) => (
                <tr key={assignment._id}>
                  <td>{assignment._id}</td>
                  <td>{assignment.name}</td>
                  <td><a href={assignment.assignment}>{assignment.fileName}</a></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DownloadTemplates