import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDetele = () => {
        this.props.onDetele(this.props.task.id)
    }

    onUpdateData = () =>{
        this.props.onUpdateData(this.props.task.id)
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        className={task.status === true ? 'label label-success' : 'label label-danger'}
                        onClick={this.onUpdateStatus}>
                            {task.status === true ? 'kích hoạt' : 'không kích hoạt'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={ this.onUpdateData }>
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDetele}>
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
