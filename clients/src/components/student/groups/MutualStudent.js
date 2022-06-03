import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import { MdDelete } from "react-icons/md";

function MutualStudent() {
  const [MStudent, setMStudet] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  useEffect(() => {
    function getMStudent() {
      axios
        .get(" http://localhost:5000/group/mutualUsers")
        .then((res) => {
          setMStudet(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getMStudent();
  }, []);

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
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {MStudent.map((MStudent, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{MStudent.name}</td>
                  <td>{MStudent.email}</td>
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
export default MutualStudent;
