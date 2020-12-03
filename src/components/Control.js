import React from "react";
import Search from "./Search";
import Sort from "./Sort";
import ExportExcel from "./ExportExcel";

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
