import React from "react";

function Sort(props) {
  return (
    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      {/*Sort*/}
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="sort_selected">
              <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
            </button>
          </li>
          <li>
            <button>
              <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
            </button>
          </li>
          <li role="separator" className="divider" />
          {/* <li><a role="button">Trạng Thái Kích Hoạt</a></li>
                        <li><a role="button">Trạng Thái Ẩn</a></li> */}
        </ul>
      </div>
    </div>
  );
}
export default Sort;
