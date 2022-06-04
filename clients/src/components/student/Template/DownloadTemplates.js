import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";

function DownloadTemplates() {
    const [templates, setTemplates] = useState();

    useEffect(() => {
        const fetchTemplates = async () => {
          const res = await fetch(`http://localhost:5000/template/get_templates`);
          const data = await res.json();
          setTemplates(data);
        };
        fetchTemplates();
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
              templates?.map((template) => (
                <tr key={template._id}>
                  <td>{template._id}</td>
                  <td>{template.name}</td>
                  <td><a href={template.template}>{template.fileName}</a></td>
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