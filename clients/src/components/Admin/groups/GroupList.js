import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import { MdDelete } from "react-icons/md";

export default function GroupList() {
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

  //   function Delete(id) {
  //     axios
  //       .delete(`http://localhost:5000/topic/${id}`)
  //       .then((res) => {
  //         alert("Topic details deleted SuccessFully");
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }

  //   filterData(salaryplan,searchkey){
  //     const result = salaryplan.filter((salaryplan) =>
  //    salaryplan.firstName.toLowerCase().includes(searchkey)||
  //    salaryplan.lastName.toLowerCase().includes(searchkey)
  //     )
  //     this.setState({salaryplan:result})
  //   }

  //   handleSearchArea=(e)=>{
  //     const searchkey = e.currentTarget.value;

  //     axios.get("http://localhost:5000/salaryplan").then(res =>{
  //       if(res.data.success){
  //         this.filterData(res.data.existingsalaryplan,searchkey)
  //       }
  //     });
  //   }

  return (
    <div className="App">
      <div className="header"></div>

      <div className="content">
        <div className="container">
          <table className="table table-bordered border-primary">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">leader</th>
                <th scope="col">GroupName</th>
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
                  <td>{Group.StudentID}</td>
                  <td>{Group.GroupName}</td>
                  <td>{Group.description}</td>
                  <td>{Group.feedBack}</td>
                  <td>{Group.status}</td>
                  <td>{Group.createdAt.substring(0, 10)}</td>
                  <td>{Group.updatedAt.substring(0, 10)}</td>

                  <td>
                    <Link
                      className="btn btn-success"
                      to={"/admin/update/topic/" + Group._id}
                    >
                      Evaluate
                    </Link>
                  </td>
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
