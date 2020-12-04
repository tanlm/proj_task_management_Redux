import React, { useState } from "react";
import * as actions from "../task-manager-action";
import { connect } from "react-redux";

function Search(props) {
  const { onSearch } = props;

  const [keyword, setKeyword] = useState("");

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    setKeyword(name === "txtSearch" ? value : "");
  };

  const onSearchKeyword = () => {
    if (keyword) {
      onSearch(keyword);
    }
  };

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      {/*Search*/}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          name="txtSearch"
          value={keyword}
          onChange={onChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSearchKeyword}
          >
            <span className="fa fa-search mr-5" />
            Tìm kiếm
          </button>
        </span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: (keyWord) => {
      dispatch(actions.searchTasks(keyWord));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
