import React from "react";
import LogoIcon from "./../../shared/assets/images/AdminLTELogo.png";
import UserLogin from "./../../shared/assets/images/user1-128x128.jpg";

function Sidebar(props) {
  let { showAndHide } = props;
  let urlDefault = "";
  return (
    <div className={showAndHide ? "sidebar-active" : "sidebar-hide"}>
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4 "
        data-visible={showAndHide}
      >
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src={LogoIcon}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/*<!-- Sidebar user panel (optional) -->*/}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={UserLogin}
                alt="User"
                className="img-circle elevation-2"
              />
            </div>
            <div className="info">
              <a href={urlDefault} className="d-block">
                Alexander Pierce
              </a>
            </div>
          </div>

          {/*<!-- Sidebar Menu -->*/}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/*<!-- Add icons to the links using the .nav-icon className
          {/*<!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library -->*/}
              <li className="nav-item menu-open">
                <a href={urlDefault} className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Starter Pages
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href={urlDefault} className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Active Page</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href={urlDefault} className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Inactive Page</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href={urlDefault} className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Simple Link
                    <span className="right badge badge-danger">New</span>
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default Sidebar;
