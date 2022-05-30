import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import { MdDelete } from "react-icons/md";

function AllTopics() {
  const [Topic, setTopic] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  useEffect(() => {
    function getTopics() {
      axios
        .get("http://localhost:5000/topic/list")
        .then((res) => {
          setTopic(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getTopics();
  }, []);

  function Delete(id) {
    axios
      .delete(`http://localhost:5000/topic/${id}`)
      .then((res) => {
        alert("Topic details deleted SuccessFully");
      })
      .catch((err) => {
        alert(err);
      });
  }

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
                <th scope="col">StudentID</th>
                <th scope="col">topicName</th>
                <th scope="col">description</th>
                <th scope="col">feedBack</th>
                <th scope="col">status</th>
                <th scope="col">Created date</th>
                <th scope="col">Updatted date</th>
              </tr>
            </thead>
            <tbody>
              {Topic.map((Topic, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user._id}</td>
                  <td>{Topic.topicName}</td>
                  <td>{Topic.description}</td>
                  <td>{Topic.feedBack}</td>
                  <td>{Topic.status}</td>
                  <td>{Topic.createdAt.substring(0, 10)}</td>
                  <td>{Topic.updatedAt.substring(0, 10)}</td>

                  <td>
                    <Link
                      className="btn btn-success"
                      to={"/admin/update/topic/" + Topic._id}
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
export default AllTopics;
