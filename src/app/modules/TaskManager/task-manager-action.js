import { ACTION_TYPES } from "../../config/Constants";

export const listAll = () => {
  return {
    type: ACTION_TYPES.LIST_ALL,
  };
};

export const saveTask = (task) => {
  return {
    type: ACTION_TYPES.SAVE_TASK,
    task, //task : task
  };
};

export const toggleForm = (task) => {
  return {
    type: ACTION_TYPES.TOGGLE_FORM,
  };
};

export const openForm = (task) => {
  return {
    type: ACTION_TYPES.OPEN_FORM,
  };
};

export const closeForm = (task) => {
  return {
    type: ACTION_TYPES.CLOSE_FORM,
  };
};

export const updateStatus = (id) => {
  return {
    type: ACTION_TYPES.UPDATE_STATUS,
    id, //id: id
  };
};

export const deleteTask = (id) => {
  return {
    type: ACTION_TYPES.DELETE_TASK,
    id, //id: id
  };
};

export const updateTask = (task) => {
  return {
    type: ACTION_TYPES.UPDATE_TASK_ITEM,
    task, //id: id
  };
};

export const filterTasks = (filterState) => {
  return {
    type: ACTION_TYPES.FILTER_TASKS,
    filterState, //filterState: filterState
  };
};

export const searchTasks = (keyWord) => {
  return {
    type: ACTION_TYPES.SEARCH_KEY,
    keyWord, //keyWord: keyWord
  };
};