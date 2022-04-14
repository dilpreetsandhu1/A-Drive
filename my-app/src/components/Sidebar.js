import React, { useState } from 'react';
import {RiMenuLine, RiLayoutGridFill, RiAdminFill, RiFileUploadFill, RiLogoutCircleRLine} from 'react-icons/ri';
import './Sidebar.css';
import Logo from '../logo.png';
function Sidebar() {


return (
    <div className="Sidebar">
        <div className="sidebar-header">
        <img src={Logo} height={35} width={145} />
    </div>
    <div className="sidebar-items">
      <div className="item">
          <RiLayoutGridFill className="sidebar-icon"/>
          <span className="sidebar-text">Home</span>
    </div>
    <div className="item">
        <RiFileUploadFill className="sidebar-icon"/>
        <span className="sidebar-text">Upload</span>
    </div>
    <div className="item">
        <RiAdminFill className="sidebar-icon"/>
        <span className="sidebar-text">Admin</span>
    </div>

    <div className="item">
        <RiLogoutCircleRLine className="sidebar-icon"/>
        <span className="sidebar-text">Logout</span>
        </div>
        </div>

        <div className='sidebar-footer'>
        <span> &#xa9; Copyright 2022</span>
        </div>

    </div>
);
}
export default Sidebar;


