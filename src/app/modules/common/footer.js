import React from "react";
// import menus from "./../../shared/layout/MenuItem";
// import LogoTitle from "../../shared/assets/images/logo-title.png";
// import SideNav, {
//   Toggle,
//   Nav,
//   NavItem,
//   NavIcon,
//   NavText,
// } from "@trendmicro/react-sidenav";
// import styled from "styled-components";
// const navWidthCollapsed = 40;
// const navWidthExpanded = 190;

function Footer() {
  return (
    <footer className="main-footer">
      {/* <!-- To the right --> */}
      <div className="float-right d-none d-sm-inline">Anything you want</div>
      {/* <!-- Default to the left --> */}
      <strong>
        Copyright &copy; 2014-2020 <a href="https://adminlte.io">AdminLTE.io</a>
        .
      </strong>{" "}
      All rights reserved.
    </footer>
  );
}

export default Footer;
