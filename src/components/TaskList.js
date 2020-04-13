import React, { Component } from 'react';
import TaskItem from './TaskItem'

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }

    onChangeControl = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        this.props.onFilter(
            name === 'filterName' ? value  :  this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );

        this.setState({
            [name] : value
        });
    }


    render() {
        var {tasks} = this.props;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onUpdateStatus={this.props.onUpdateStatus}  
                        onDetele={this.props.onDetele}
                        onUpdateData={this.props.onUpdateData}
                        />
        }) 
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
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
                                value = {this.state.filterName}
                                onChange = {this.onChangeControl}/>
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
                </tbody>
            </table>
        );
    }
}

export default TaskList;
