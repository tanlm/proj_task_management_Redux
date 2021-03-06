import { ACTION_TYPES } from "../../../config/Constants";

var initialState = {
  filterName: "",
  filterStatus: -1,
  filterMoney: 0,
  filterDateTime: 0
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_TASKS:
      return Object.assign({}, state, {
        filterName: action.filterState.filterName,
        filterStatus: parseInt(action.filterState.filterStatus),
        filterMoney: action.filterState.filterMoney,
        filterDateTime: action.filterState.filterDateTime
      });
    default:
      return state;
  }
};

export default myReducer;
