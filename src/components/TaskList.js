import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

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
    setFilterMoney(filterMoney);
    setFilterDateTime(filterDateTime);
    setFilterStatus(filterStatus);
  };

  // fill on table
  if (filterState) {
    if (filterState.filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterState.filterName) !== -1;
      });
    }

    tasks = tasks.filter((task) => {
      if (filterState.filterStatus === -1) {
        return task;
      } else {
        return (task.status = filterState.filterStatus === 1 ? true : false);
      }
    });
  }
  var elmTasks = tasks.map((task, index) => {
    return <TaskItem key={index} index={index} task={task} />;
  });

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
              name="filterName"
              value={filterMoney}
              onChange={onChangeControl}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="filterName"
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
              <option value={0}>Ẩn</option>
              <option value={1}>Kích Hoạt</option>
            </select>
          </td>
          <td />
        </tr>
        {elmTasks}
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
