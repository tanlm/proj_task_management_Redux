import React from "react";
import "./app/shared/assets/css/index.css";
import TaskManager from './app/modules/TaskManager/task-manager';
import { connect } from "react-redux";

function App (){
    return (
      <TaskManager />
    );
  }

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
