import React, { useState } from 'react';
import {RiMenuLine, RiLayoutGridFill, RiChat4Fill, RiTeamFill, RiFileUploadFill, RiPieChart2Fill, RiLogoutCircleRLine} from 'react-icons/ri';
import{BsTrashFill} from 'react-icons/bs';
import './Sidebar.css';

function Sidebar() {
        const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
        const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

        const handleToggler = () => { 
            if(isExpanded) {
                setIsExpanded(false);
                localStorage.setItem('sidebar-collapsed', true);
                return;
            }
            setIsExpanded(true);
            localStorage.removeItem('sidebar-collapsed')
        };

return (
    <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
        <div className="sidebar-header">
        <RiMenuLine 
            className="sidebar-icon"
            onClick={handleToggler}
        />         
        <h1 className="sidebar-logo"></h1>
    </div>
    <div className="sidebar-items">
      <div className="item">
          <RiLayoutGridFill className="sidebar-icon"/>
          <span className="sidebar-text">Dashboard</span>
    </div>
    <div className="item">
        <RiTeamFill className="sidebar-icon"/>
        <span className="sidebar-text">Teams</span>
    </div>
    <div className="item">
        <RiFileUploadFill className="sidebar-icon"/>
        <span className="sidebar-text">Upload</span>
    </div>
    <div className="item">
        <BsTrashFill className="sidebar-icon"/>
        <span className="sidebar-text">Trash</span>
    </div>

    <div className="item">
        <RiLogoutCircleRLine className="sidebar-icon"/>
        <span className="sidebar-text">Logout</span>
        </div>
        </div>
    </div>
);
}

export default Sidebar;


