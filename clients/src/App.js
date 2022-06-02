import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import TopicRegistration from "./components/student/Topics/TopicRegistration";
import StudentTopicList from "./components/student/Topics/StudentTopicList";
import StudentHeader from "./components/student/StudentHeader";
import AllTopics from "./components/Admin/topics/TopicList";
import UpdateTopic from "./components/Admin/topics/UpdateTopic";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshtoken = sessionStorage.getItem("token");
      if (refreshtoken) {
        const getToken = async () => {
          const res = await axios.post(
            `http://localhost:5000/user/refresh_token/${refreshtoken}`,
            null
          );
          console.log(res);
          dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        };
        getToken();
      }
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <Body />
        <StudentHeader />
        <Route path="/" exact component={TopicRegistration} />
        <Route path="/student/topic/list" exact component={StudentTopicList} />
        <Route path="/admin/topic/list" exact component={AllTopics} />
        <Route path="/admin/topic/" exact component={TopicRegistration} />
        <Route path="/admin/update/topic/:id" exact component={UpdateTopic} />
      </div>
    </Router>
  );
};

export default App;
