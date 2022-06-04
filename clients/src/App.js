import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/Header";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import TopicRegistration from "./components/student/Topics/TopicRegistration";
import StudentTopicList from "./components/student/Topics/StudentTopicList";
import AllTopics from "./components/Admin/topics/TopicList";
import UpdateTopic from "./components/Admin/topics/UpdateTopic";
import MenuBar from "./components/header/MenuBar";
import NotFound from "./components/utils/NotFound/NotFound";
import Login from "./components/body/auth/Login";
import ForgotPassword from "./components/body/auth/ForgotPassword";
import ResetPassword from "./components/body/auth/ResetPassword";
import Profile from "./components/body/profile/Profile";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import UserList from "./components/Admin/UserList";
import EditUser from "./components/body/profile/EditUser";
import AssignmentHome from "./components/Admin/Template/AssignmentHome";
import AddAssignment from "./components/Admin/Template/AddAssignment";
import EditAssignment from "./components/Admin/Template/EditAssignment";
import Register from "./components/body/auth/Register";
import DownloadTemplates from "./components/student/Template/DownloadTemplates";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isStudent } = auth;

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
        <MenuBar />

        {/* user auth  routes*/}
        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />
        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPassword}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPassword}
          exact
        />
        <Route
          path="/profile"
          component={isLogged ? Profile : NotFound}
          exact
        />
        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route
          path="/userlist"
          component={isAdmin ? UserList : NotFound}
          exact
        />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />

        {/* template routs */}
        <Route
          path="/assignment"
          component={isAdmin ? AssignmentHome : NotFound}
          exact
        />
        <Route
          path="/student/assignment/"
          component={isStudent ? DownloadTemplates : NotFound}
          exact
        />
        <Route
          path="/assignment/add"
          component={isAdmin ? AddAssignment : NotFound}
          exact
        />
        <Route
          path="/assignment/edit/:id"
          component={isAdmin ? EditAssignment : NotFound}
          exact
        />

        {/* topic management */}
        <Route
          path="/student/topic/registration"
          exact
          component={TopicRegistration}
        />
        <Route path="/student/topic/list" exact component={StudentTopicList} />
        <Route path="/admin/topic/list" exact component={AllTopics} />
        <Route path="/admin/topic/" exact component={TopicRegistration} />
        <Route path="/admin/update/topic/:id" exact component={UpdateTopic} />
      </div>
    </Router>
  );
};

export default App;
