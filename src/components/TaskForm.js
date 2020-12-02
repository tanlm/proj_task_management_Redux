import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    componentWillMount() {
        if (this.props.taskEdit && this.props.taskEdit.id) {
            this.setState({
                id: this.props.taskEdit.id,
                name: this.props.taskEdit.name,
                status: this.props.taskEdit.status,
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEdit) {
            this.setState({
                id: nextProps.taskEdit.id,
                name: nextProps.taskEdit.name,
                status: nextProps.taskEdit.status,
            });
        } else if (nextProps && nextProps.taskEdit === null) {
            this.onClear();
        }
        console.log(nextProps.filterTasks);
        
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: true
        });
    }


    onExitForm = () => {
        this.props.onCloseForm();
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveTask(this.state)
        this.onClear();
        this.onExitForm();
    }

    onClearInput = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        var id = this.state.id;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'} &nbsp;
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số tiền :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="money"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày tháng :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="dateTime"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                            <option value={false}>Không kích hoạt</option>
                            <option value={true}>Kích Hoạt</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu</button>&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClearInput}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEdit: state.task_reducer,
        filterTasks: state.filterTasks
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
