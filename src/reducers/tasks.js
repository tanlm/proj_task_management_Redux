import * as types from './../constants/ActionType';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var findIndex = (tasks, id) => {
    var result = -1
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.UPDATE_STATUS:
            var index = findIndex(state, action.id);
            console.log(index);
            // cach 1
            var cloneTask = { ...state[index] };
            cloneTask.status = !cloneTask.status;
            state.splice(index, 1);
            state.push(cloneTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_TASK:
            var idEdit = findIndex(state, action.id);
            console.log(idEdit);
            // // cach 1
            // var cloneTask = {...state[idEdit]};
            // cloneTask.name = action.name
            // cloneTask.status = action.status;
            // state.splice(index, 1);
            // state.push(cloneTask);
            // localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            var index1 = findIndex(state, action.id);
            state.splice(index1, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state;
    };
};

export default myReducer;