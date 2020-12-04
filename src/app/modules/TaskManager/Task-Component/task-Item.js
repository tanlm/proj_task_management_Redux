import React from "react";
import { connect } from "react-redux";
import * as actions from "../task-manager-action";
import Moment from "react-moment";

function TaskItem(props) {
  const {
    onUpdateStatusProps,
    onDeleteTaskProps,
    onOpenTaskForm,
    onSelectItemProps,
    task,
    index,
  } = props;

  const onUpdateStatus = () => {
    onUpdateStatusProps(task.id);
  };

  const onDeleteTask = () => {
    onDeleteTaskProps(task.id);
  };

  const onSelectItem = () => {
    onOpenTaskForm();
    onSelectItemProps(task);
  };

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td>{task.name}</td>
      <td className="text-right">{task.money}</td>
      <td className="text-center">
        <Moment format="DD/MM/YYYY">{task.dateTime}</Moment>
      </td>
      <td className="text-center">
        <span
          className={
            task.status === true ? "label label-success" : "label label-danger"
          }
          onClick={onUpdateStatus}
        >
          {task.status === true ? "kích hoạt" : "không kích hoạt"}
        </span>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={onSelectItem}
        >
          <span className="fa fa-pencil mr-5" />
          Sửa
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={onDeleteTask}>
          <span className="fa fa-trash mr-5" />
          Xóa
        </button>
      </td>
    </tr>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
