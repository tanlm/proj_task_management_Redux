import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                filterName: '',
                filterStatus: -1
            },
            keyWord: '',
            sort: {
                by: 'name',
                valueSort: ''
            }
        };
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    onToggleForm = () => {
        var { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== '') {
            this.props.onOpenTaskForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearForm({
            id: '',
            name: '',
            status: false
        });
    }

    // onFilter = (filterName, filterStatus) => {
    //     filterStatus = parseInt(filterStatus, 10);
    //     this.setState({
    //         filter: {
    //             filterName: filterName,
    //             filterStatus: filterStatus
    //         }
    //     });
    // }

    onSearch = (keyWord) => {
        console.log(keyWord);
        this.setState({
            keyWord: keyWord
        });
    }


    render() {
        var { isDisplayForm } = this.props;

        var elmTaskForm = isDisplayForm ? <TaskForm /> : '';
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
                        : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>
                        {/*Search - Sort*/}
                        <Control onSearch={this.onSearch} />

                        {/* List */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    onFilter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.task_reducer
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearForm: (task) => {
            dispatch(actions.updateTask(task));
        },
        onOpenTaskForm: () => {
            dispatch(actions.openForm())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
