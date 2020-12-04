import { ACTION_TYPES } from "../../../config/Constants";

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

var generateID = () => {
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LIST_ALL:
      return state;
    case ACTION_TYPES.SAVE_TASK:
      console.log(action.task);
      var task = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status,
        money: action.task.money,
        dateTime: action.task.dateTime,
      };
      if (!task.id) {
        task.id = generateID();
        state.push(task);
      } else {
        var i = findIndex(state, task.id);
        state[i] = task;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case ACTION_TYPES.UPDATE_STATUS:
      var index = findIndex(state, action.id);
      console.log(index);
      // cach 1
      var cloneTask = { ...state[index] };
      cloneTask.status = !cloneTask.status;
      state.splice(index, 1);
      state.push(cloneTask);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case ACTION_TYPES.DELETE_TASK:
      state.splice(findIndex(state, action.id), 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
