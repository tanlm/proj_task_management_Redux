import { ACTION_TYPES } from "../constants/Constants";

var initialState = {
  id: "",
  name: "",
  money: 0,
  dateTime: new Date(),
  status: false,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_TASK_ITEM:
      return action.task;
    default:
      return state;
  }
};

export default myReducer;
