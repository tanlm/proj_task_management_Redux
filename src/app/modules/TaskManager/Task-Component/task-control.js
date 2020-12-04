import React from "react";
import Search from "./task-search";
import Sort from "./task-sort";
import ExportExcel from "./task-export-excel";

function Control(props) {
  const onSearch = props
  return (
    <div className="row mt-15">
      {/*Search*/}
      <Search onSearch={onSearch} />
      {/*Sort*/}
      <Sort />
      <ExportExcel />
    </div>
  );
}

export default Control;
