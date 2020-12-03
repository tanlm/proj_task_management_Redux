import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import task_reducer from "./task_reducer";
import filterTasks from "./filterTasks";
import searchTasks from "./searchTasks";

// combine reducer
const myReducer = combineReducers({
  task_reducer: task_reducer,
  tasks, // tasks : tasks
  isDisplayForm,
  filterTasks,
  searchTasks,
});

export default myReducer;
