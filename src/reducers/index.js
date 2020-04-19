import { combineReducers } from 'redux';
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'


// combine reducer
const myReducer = combineReducers({
    tasks, // tasks : tasks
    isDisplayForm
});

export default myReducer;