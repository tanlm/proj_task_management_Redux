import { ACTION_TYPES } from "../constants/Constants";

var initialState = {
  filterName: "",
  filterStatus: -1,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_TASKS:
      return {
        filterName: action.filterState.filterName,
        filterStatus: parseInt(action.filterState.filterStatus),
      };
    default:
      return state;
  }
};

export default myReducer;
