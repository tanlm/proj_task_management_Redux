import { ACTION_TYPES } from "./../constants/Constants";

var initialState = false;

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_FORM:
      return !state;
    case ACTION_TYPES.OPEN_FORM:
      state = true;
      return state;
    case ACTION_TYPES.CLOSE_FORM:
      state = false;
      return state;
    default:
      return state;
  }
};

export default myReducer;
