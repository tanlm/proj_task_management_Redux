import React from "react";
import "./app/shared/assets/css/index.css";

import TaskManager from "./app/modules/TaskManager/task-manager";
import Sidebar from "./app/modules/common/Sidebar";
import Navbar from "./app/modules/common/navbar";
import Footer from "./app/modules/common/footer";
import { connect } from "react-redux";

function App() {
  return (
    <div className="hold-transition">
      <div className="">
        <Navbar />
        <Sidebar />
        <TaskManager /> 
        <Footer />
      </div>
     
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
