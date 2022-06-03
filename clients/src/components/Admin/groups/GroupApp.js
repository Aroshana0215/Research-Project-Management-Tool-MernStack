// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./app.scss";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

// import TopicRegistration from "./components/student/Topics/TopicRegistration";
// import StudentTopicList from "./components/student/Topics/StudentTopicList";
// import StudentHeader from "./components/student/StudentHeader";
// import AllTopics from "./components/Admin/topics/TopicList";
// import UpdateTopic from "./components/Admin/topics/UpdateTopic";

// const GroupApp = () => {

//   return (
//     <Router>
//       <div>
//         <Header />
//         <Body />
//         <StudentHeader />

//         {/* topic registration */}
//         <Route path="/" exact component={TopicRegistration} />
//         <Route path="/student/topic/list" exact component={StudentTopicList} />
//         <Route path="/admin/topic/list" exact component={AllTopics} />
//         <Route path="/admin/topic/" exact component={TopicRegistration} />
//         <Route path="/admin/update/topic/:id" exact component={UpdateTopic} />

//         {/*
//         group registration */}
//       </div>
//     </Router>
//   );
// };

// export default GroupApp;
