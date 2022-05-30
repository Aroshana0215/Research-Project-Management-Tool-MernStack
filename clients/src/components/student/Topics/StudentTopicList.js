import React, { useStae, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// ======== STYLING IMORTS ===========
// import "./OrderStyles.css";
// import { AiOutlineEdit } from "react-icons/ai";
// import { MdDelete } from "react-icons/md";
// import { grey } from "@material-ui/core/colors";

export default function StudentTopicList() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [inquiry, setinquiry] = useState([]);
  const [id, setid] = useState("");
  const [enable, setEnable] = useState(false);
  const [topics, setTopics] = useState([]);

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const customerID = useSelector((state) => state.auth.user_id);

  function getinquiry() {
    if (enable) {
      axios
        .get(`http://localhost:5000/topic/UserTopic/${id}`)
        .then((res) => {
          console.log(res);
          setTopics(res.data);
        })
        .catch((err) => {
          console.log(err);
          // alert(err.massage);
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
    getinquiry();
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
                <th scope="col">topicName</th>
                <th scope="col">description</th>
                <th scope="col">feedBack</th>
                <th scope="col">status</th>
                <th scope="col">Created date</th>
                <th scope="col">Updatted date</th>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 &&
                topics.map((Topic, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>

                    <td>{Topic.topicName}</td>
                    <td>{Topic.description}</td>
                    <td>{Topic.feedBack}</td>
                    <td>{Topic.status}</td>
                    <td>{Topic.createdAt.substring(0, 10)}</td>
                    <td>{Topic.updatedAt.substring(0, 10)}</td>
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
