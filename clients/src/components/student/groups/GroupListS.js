import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import { MdDelete } from "react-icons/md";

export default function GroupListS() {
  const [Group, setGroup] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  useEffect(() => {
    function getGroup() {
      axios
        .get("http://localhost:5000/group/list")
        .then((res) => {
          setGroup(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getGroup();
  }, []);

  

  return (
    <div className="App">
      <div className="header"></div>

      <div className="content">
        <div className="container">
          <table className="table table-bordered border-primary">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>

                <th scope="col">GroupName</th>
                <th scope="col">Group Member</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Cosupervisor</th>
                <th scope="col">status</th>
                <th scope="col">Created date</th>
                <th scope="col">Updatted date</th>
                {/* StudentID, GroupName, GroupMembers, Cosupervisor, Supervisor,
                leader, status, */}
              </tr>
            </thead>
            <tbody>
              {Group.map((Group, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>{Group.GroupName}</td>
                  <td>{Group.GroupMembers.map((member) => member.name)}</td>

                  <td>{Group.Supervisor}</td>
                  <td>{Group.Cosupervisor}</td>
                  <td>{Group.status}</td>
                  <td>{Group.createdAt.substring(0, 10)}</td>
                  <td>{Group.updatedAt.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}