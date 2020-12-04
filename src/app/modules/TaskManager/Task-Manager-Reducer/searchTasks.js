import { ACTION_TYPES } from "../../../config/Constants";

var keyWord = "";

var myReducer = (state = keyWord, action) => {
  switch (action.type) {
    case ACTION_TYPES.SEARCH_KEY:
      return action.keyWord;
    default:
      return state;
  }
};

export default myReducer;
