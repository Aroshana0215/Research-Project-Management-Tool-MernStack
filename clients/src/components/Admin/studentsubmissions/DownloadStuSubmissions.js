import React from 'react';
import { useEffect, useState } from "react";

function DownloadStuSubmissions() {
    const [submissions, setSubmissions] = useState();

    useEffect(() => {
        const fetchSubmissions = async () => {
          const res = await fetch(`http://localhost:5000/submission/get_submissions`);
          const data = await res.json();
          setSubmissions(data);
        };
        fetchSubmissions();
      }, []);

      
  return (
    <div className='container'>
      <br /><br /> <center><h3>Download Student Submissions</h3></center><br />
      <div className="row">
        <table className="customers">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>File</th>
              <th>Submission Time</th>
            </tr>
          </thead>
          <tbody>
            {
              submissions?.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.studentID}</td>
                  <td><a href={submission.submission}>{submission.fileName}</a></td>
                  <td>{submission.createdAt.substring(0 , 10)} at {submission.createdAt.substring(12 , 16)} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DownloadStuSubmissions