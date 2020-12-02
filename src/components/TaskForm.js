import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import * as messages from "./../constants/Message.js";

function TaskForm(props) {
  const { taskEdit, onCloseForm, onSaveTask } = props;

  // create and set state
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [status, setStatus] = useState(false);
  const [errorName, setNameError] = useState("");
  const [errorMoney, setMoneyError] = useState("");
  const [errorDateTime, setDateTimeError] = useState("");
  const [errorStatus, setStatusError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (taskEdit && taskEdit.id) {
      setId(taskEdit.id);
      setName(taskEdit.name);
      setMoney(taskEdit.money ? taskEdit.money : "");
      setDateTime(taskEdit.dateTime ? taskEdit.dateTime : "");
      setStatus(taskEdit.status);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
      onClearInput();
    }
  }, [taskEdit]);

  const onExitForm = () => {
    onCloseForm();
  };

  const handleValidation = () => {
    let formIsValid = true;

    // Name
    if (!name) {
      formIsValid = false;
      setNameError(messages.NOT_EMPTY);
    }
    if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setNameError(messages.ONLY_FONT);
      }
    }

    // money
    if (!money) {
      formIsValid = false;
      setMoneyError(messages.NOT_EMPTY);
    }
    if (typeof money !== "undefined") {
      if (money.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setMoneyError(messages.ONLY_NUMBER);
      }
    }
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      var initialTask = {
        name: name,
        money: money,
        dateTime: dateTime,
        status: status,
      };
      onSaveTask(initialTask);
      onClearInput();
      onExitForm();
    }
  };

  const onClearInput = () => {
    setId("");
    setName("");
    setMoney("");
    setDateTime("");
  };

  return (
    <div className="panel panel-warning">
      <div className="panel-heading">
        <h3 className="panel-title">
          {isUpdate ? "Cập nhật công việc" : "Thêm công việc"} &nbsp;
          <span
            className="fa fa-times-circle text-right"
            onClick={onExitForm}
          ></span>
        </h3>
      </div>
      <div className="panel-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Tên :</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{errorName}</span>
          </div>
          <div className="form-group">
            <label>Số tiền :</label>
            <input
              type="text"
              className="form-control"
              name="money"
              value={money}
              onChange={(e) => {
                setMoney(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{errorMoney}</span>
          </div>
          <div className="form-group">
            <label>Ngày tháng :</label>
            <input
              type="text"
              className="form-control"
              name="dateTime"
              value={dateTime}
              onChange={(e) => {
                setDateTime(e.target.value);
              }}
            />
            <span style={{ color: "red" }}>{errorDateTime}</span>
          </div>
          <label>Trạng Thái :</label>
          <select
            className="form-control"
            required="required"
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value === "true" ? true : false);
            }}
          >
            <option value={false}>Không kích hoạt</option>
            <option value={true}>Kích Hoạt</option>
          </select>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              {isUpdate ? "Cập nhật" : "Lưu"}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger"
              onClick={onClearInput}
            >
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEdit: state.task_reducer,
    filterTasks: state.filterTasks,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
