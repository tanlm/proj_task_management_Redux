import { combineReducers } from 'redux';
import tasks from './tasks'

// combine reducer
const myReducer = combineReducers({
    tasks // tasks : tasks
});

export default myReducer;
