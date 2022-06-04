import React, { useStae, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyGroup() {
  const [id, setid] = useState("");
  const [enable, setEnable] = useState(false);
  const [MyGroup, setMyGroup] = useState([]);

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
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Cosupervisor</th>
                <th scope="col">Supervisor</th>
                <th scope="col">leader</th>
                <th scope="col">status</th>
                <th scope="col">createdAt</th>
                <th scope="col">updatedAt</th>
              </tr>
            </thead>
            <tbody>
              {MyGroup.map((MyGroup, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{MyGroup.GroupName}</td>
                  <td>{MyGroup.Cosupervisor}</td>
                  <td>{MyGroup.Supervisor}</td>
                  <td>{MyGroup.leader}</td>
                  <td>{MyGroup.status}</td>
                  <td>{MyGroup.createdAt.substring(0, 10)}</td>
                  <td>{MyGroup.updatedAt.substring(0, 10)}</td>
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
