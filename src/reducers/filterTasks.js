import * as types from '../constants/ActionType';

var initialState = {
    filterName: '',
    filterStatus: -1
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.filterTasks:
            return {
                filterName: action.filterState.filterName,
                filterStatus: parseInt(action.filterState.filterStatus)
            };
        default:
            return state;
    };
};


export default myReducer;