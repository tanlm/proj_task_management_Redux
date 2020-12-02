import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'
import Export_Excel from './Export_Excel'

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                {/*Search*/}
                <Search onSearch={this.props.onSearch} />
                {/*Sort*/}
                <Sort />
                <Export_Excel />
            </div>
        );
    }
}

export default Control;
