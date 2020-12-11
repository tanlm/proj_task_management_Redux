import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
function Header(props) {
  const { showHideNavProp } = props;
  const [showHideNav, setShowHideNav] = useState(false);
  useEffect(() => {
    setShowHideNav(showHideNavProp);
  }, [showHideNavProp]);
  return (
    <React.Fragment>
      <Navbar onShowHideSidebar={() => {}} />
      <Sidebar showAndHide={showHideNav} />
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    showHideNavProp: state.common_reducer,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
