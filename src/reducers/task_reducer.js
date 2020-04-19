import * as types from '../constants/ActionType';

var initialState = {
    id: '',
    name: '',
    status: false
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.updateTaskItem:
            return action.task;
        default:
            return state;
    };
};


export default myReducer;