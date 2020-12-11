import { ACTION_COMMON } from "./../../config/Constants";

var initialState = {
  showHideNav: false,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_COMMON.SHOW_HIDE_SIDEBAR:
      return action.showHideNav;
    default:
      return state;
  }
};

export default myReducer;
