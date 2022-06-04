import React, { useStae, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyGroup() {
  const [id, setid] = useState("");
  const [enable, setEnable] = useState(false);
  const [Mygroup, setMyGroup] = useState({});
  const [GroupMembers, setGroupMembers] = useState([]);
  const {
    StudentID,
    GroupName,

    Cosupervisor,
    Supervisor,
    status,

    createdAt,
    updatedAt,
  } = Mygroup;

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const customerID = useSelector((state) => state.auth.user_id);

  function getMyGroup() {
    if (enable) {
      axios
        .get(`http://localhost:5000/group/myGroup/${id}`)
        .then((res) => {
          console.log(res);
          setMyGroup(res.data);
          setGroupMembers(res.data.GroupMembers);
        })
        .catch((err) => {
          console.log(err);
          alert(err.massage);
        });
    }
  }

  useEffect(() => {
    if (user._id !== undefined) {
      setid(user._id);
      setEnable(true);
    }
  });

  useEffect(() => {
    console.log(id);
    getMyGroup();
  }, [enable]);

  useEffect(() => {
    console.log(Mygroup);
    console.log(GroupName);
  }, [Mygroup]);

  // const filteredCountrise = inquiry.filter((user) => {
  //   return userStudentID.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  // });

  return (
    <div className="App">
      <div className="header"></div>

      <div className="content">
        <div className="container">
          <table className="table table-bordered border-primary">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Group Name</th>
                <th scope="col">Group members</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Cosupervisor</th>
                <th scope="col">status</th>
                <th scope="col">Created date</th>
                <th scope="col">Updatted date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{GroupName}</td>
                <td>{GroupMembers.map((member) => member.name)}</td>
                <td>{Supervisor}</td>
                <td>{Cosupervisor}</td>
                <td>{status}</td>
                <td>{createdAt}</td>
                <td>{updatedAt}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={"/student/group/update/" + Mygroup._id}
                  >
                    request
                  </Link>
                </td>
              </tr>
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
