import * as types from "./../constants/ActionType";

export const listAll = () => {
  return {
    type: types.LIST_ALL,
  };
};

export const saveTask = (task) => {
  return {
    type: types.saveTask,
    task, //task : task
  };
};

export const toggleForm = (task) => {
  return {
    type: types.TOGGLE_FORM,
  };
};

export const openForm = (task) => {
  return {
    type: types.OPEN_FORM,
  };
};

export const closeForm = (task) => {
  return {
    type: types.CLOSE_FORM,
  };
};

export const updateStatus = (id) => {
  return {
    type: types.UPDATE_STATUS,
    id, //id: id
  };
};

export const deleteTask = (id) => {
  return {
    type: types.DELETE_TASK,
    id, //id: id
  };
};

export const updateTask = (task) => {
  return {
    type: types.updateTaskItem,
    task, //id: id
  };
};

export const filterTasks = (filterState) => {
  return {
    type: types.filterTasks,
    filterState, //id: id
  };
};
