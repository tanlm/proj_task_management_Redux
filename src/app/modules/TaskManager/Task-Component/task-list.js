import React, { useState } from "react";
import TaskItem from "./task-Item";
import { connect } from "react-redux";
import * as actions from "../task-manager-action";

function TaskList(props) {
  let { tasks, filterState, onFilter } = props;

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState(-1);
  const [filterMoney, setFilterMoney] = useState("");
  const [filterDateTime, setFilterDateTime] = useState("");

  const onChangeControl = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      filterName: name === "filterName" ? value : filterName,
      filterStatus: name === "filterStatus" ? value : filterStatus,
      filterMoney: name === "filterMoney" ? value : filterMoney,
      filterDateTime: name === "filterDateTime" ? value : filterDateTime,
    };
    onFilter(filter);
    setFilterName(filter.filterName);
    setFilterMoney(filter.filterMoney);
    setFilterDateTime(filter.filterDateTime);
    setFilterStatus(filter.filterStatus);
  };

  // fill on table
  console.log(filterState);
  if (filterState) {
    if (filterState.filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterState.filterName) !== -1;
      });
    }
    if (filterState.filterMoney) {
      tasks = tasks.filter((task) => task.money === filterState.filterMoney);
    }
    if (filterState.filterStatus === 1) {
      tasks = tasks.filter((task) => task.status === true);
    } else if (filterState.filterStatus === 0) {
      tasks = tasks.filter((task) => task.status === false);
    }
  }
  let tasksElement = tasks.map((task, index) => {
    return <TaskItem key={index} index={index} task={task} />;
  });

  console.log(tasks);

  return (
    <table className="table table-bordered table-hover mt-15">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Tên</th>
          <th className="text-center">Số tiền</th>
          <th className="text-center">Ngày tháng</th>
          <th className="text-center">Trạng Thái</th>
          <th className="text-center">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <td>
            <input
              type="text"
              className="form-control"
              name="filterName"
              value={filterName}
              onChange={onChangeControl}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="filterMoney"
              value={filterMoney}
              onChange={onChangeControl}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="filterDateTime"
              value={filterDateTime}
              onChange={onChangeControl}
            />
          </td>
          <td>
            <select
              className="form-control"
              name="filterStatus"
              value={filterStatus}
              onChange={onChangeControl}
            >
              <option value={-1}>Tất Cả</option>
              <option value={0}>Không Kích Hoạt</option>
              <option value={1}>Kích Hoạt</option>
            </select>
          </td>
          <td />
        </tr>
        {tasksElement}
        <tr>
          <td></td>
          <td></td>
          <td>Tổng:</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterState: state.filterTasks,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilter: (filterState) => {
      dispatch(actions.filterTasks(filterState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
