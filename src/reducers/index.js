import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import task_reducer from "./task_reducer";
import filterTasks from "./filterTasks";

// combine reducer
const myReducer = combineReducers({
  task_reducer: task_reducer,
  tasks, // tasks : tasks
  isDisplayForm,
  filterTasks,
});

export default myReducer;
