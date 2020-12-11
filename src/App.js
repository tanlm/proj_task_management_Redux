import React from "react";
import "./app/shared/assets/css/index.css";

import TaskManager from "./app/modules/TaskManager/task-manager";
import Header from "./app/modules/common/header";
import Footer from "./app/modules/common/footer";
import { connect } from "react-redux";

function App() {
  return (
    <div className="hold-transition">
      <div className="">
        <Header />
        <div className="content-wrapper">
          <div className="content">
            <div className="container-fluid">
              <TaskManager />
            </div>
          </div>
        </div>
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
