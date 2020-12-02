import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1, 
            filterMoney: '',
            filterDateTime: ''
        }
    }

    onChangeControl = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            filterName: name === 'filterName' ? value : this.state.filterName,
            filterStatus: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilter(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        // this.props.task
        var { tasks, filterState } = this.props; 
        // fill on table
        if (filterState) {
            if (filterState.filterName) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filterState.filterName) !== -1;
                });
            }

            tasks = tasks.filter((task) => {
                if (filterState.filterStatus === -1) {
                    return task;
                } else {
                    return task.status = (filterState.filterStatus === 1 ? true : false);
                }
            });
        }
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={index}
                index={index}
                task={task}
            />
        })
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Số tiền</th>
                        <th className="text-center">Ngày tháng</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={this.state.filterName}
                                onChange={this.onChangeControl} />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={this.state.filterMoney}
                                onChange={this.onChangeControl} />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={this.state.filterDateTime}
                                onChange={this.onChangeControl} />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filterStatus"
                                value={this.state.filterStatus}
                                onChange={this.onChangeControl}>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {elmTasks}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Tổng:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterState: state.filterTasks
    }
};
const mapDispathToProps = (dispatch, props) => {
    return {
        onFilter: (filterState) => {
            dispatch(actions.filterTasks(filterState));
        }
    };
}

export default connect(mapStateToProps, mapDispathToProps)(TaskList);
