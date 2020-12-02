import React, { Component } from 'react';

class Export_Excel extends Component {
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                {/*Sort*/}
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button">
                        Xuất Excel
                    </button>
                </div>
            </div>
        );
    }
}

export default Export_Excel;
