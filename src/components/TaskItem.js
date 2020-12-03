import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatusProps(this.props.task.id);
  };

  onDeteleTask = () => {
    this.props.onDeleteTaskProps(this.props.task.id);
  };

  onSelectItem = () => {
    this.props.onOpenTaskForm();
    this.props.onSelectItemProps(this.props.task);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>{task.money}</td>
        <td>{task.dateTime}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? "label label-success"
                : "label label-danger"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "kích hoạt" : "không kích hoạt"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onSelectItem}
          >
            <span className="fa fa-pencil mr-5" />
            Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDeteleTask}
          >
            <span className="fa fa-trash mr-5" />
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispathToProps = (dispatch, props) => {
  return {
    onUpdateStatusProps: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTaskProps: (id) => {
      dispatch(actions.deleteTask(id));
    },
    onSelectItemProps: (task) => {
      dispatch(actions.updateTask(task));
    },
    onOpenTaskForm: () => {
      dispatch(actions.openForm());
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(TaskItem);
