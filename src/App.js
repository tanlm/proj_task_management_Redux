import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList'
import _ from 'lodash'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm: false,
            taskEditting : null,
            filter : {
                filterName: '',
                filterStatus: -1
            },
            keyWord: '',
            sort : {
                by:'name',
                valueSort:''
            }
        };
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onToggleForm = () =>{
        if(this.state.isDisplayForm && this.state.taskEditting != null)
        {
            this.setState({
                isDisplayForm: true,
                taskEditting: null
            });
        }else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditting: null
            });
        }
    }

    onCloseForm = () =>{
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        var {tasks} =  this.state;
        if(data.id === '')
        {
            data.id = this.generateID();
            tasks.push(data);   
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks : tasks,
            taskEditting : null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        console.log(id);        
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
        }
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onDetele = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdateData = (id) =>{
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit =  tasks[index];
        if (index !== -1) {
            this.setState({
                taskEditting : taskEdit
            });
            console.log(this.state.taskEditting)
        }
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) =>{
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                filterName : filterName,
                filterStatus: filterStatus
            }
        });
    }

    onSearch = (keyWord) => {
        console.log(keyWord);
        this.setState({
            keyWord : keyWord
        });
    }


    render(){
        var { tasks, isDisplayForm, taskEditting, filter, keyWord } = this.state; // var tasks = this.state.tasks

        if (filter){
            if (filter.filterName){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.filterName) !== -1;
                });
            }
            
            tasks = tasks.filter((task) => {
                if (filter.filterStatus === -1)
                {
                    return task;
                }else{
                    return task.status = (filter.filterStatus === 1 ? true : false);
                }
            });
        }
        if(keyWord)
        {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyWord) !== -1;
            });
        }

        var elmTaskForm = isDisplayForm ? <TaskForm 
                                                onCloseForm={this.onCloseForm} 
                                                onSubmit={this.onSubmit}
                                                taskEdit={taskEditting}/> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form*/}
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' 
                                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>

                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={this.onToggleForm}>
                                <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>
                        {/*Search - Sort*/}
                        <Control onSearch={this.onSearch}/>

                        {/* List */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks={tasks} 
                                    onUpdateStatus={this.onUpdateStatus} 
                                    onDetele={this.onDetele} 
                                    onUpdateData={this.onUpdateData}
                                    onFilter  = {this.onFilter}    
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
