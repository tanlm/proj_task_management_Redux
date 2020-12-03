import * as types from "../constants/ActionType";

var initialState = {
  id: "",
  name: "",
  money: 0,
  dateTime: "",
  status: false,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.updateTaskItem:
      return action.task;
    default:
      return state;
  }
};

export default myReducer;