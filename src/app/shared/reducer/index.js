import { combineReducers } from "redux";
import tasks from "../../modules/TaskManager/Task-Manager-Reducer/tasks";
import isDisplayForm from "../../modules/TaskManager/Task-Manager-Reducer/isDisplayForm";
import task_reducer from "../../modules/TaskManager/Task-Manager-Reducer/task_reducer";
import filterTasks from "../../modules/TaskManager/Task-Manager-Reducer/filterTasks";
import searchTasks from "../../modules/TaskManager/Task-Manager-Reducer/searchTasks";

// combine reducer
const reducers = {
  task_reducer,
  tasks, 
  isDisplayForm,
  filterTasks,
  searchTasks,
};

const reducer = combineReducers(reducers);

export default reducer;
