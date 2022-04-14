import React from 'react';
import {Nav, NavLink, Bars, NavMenu,} from './NavbarElements';

function NavbarHome()  {

  return (
      <Nav>
        <Bars />
        <NavMenu> 
          <NavLink to='/home' activeStyle>
            Files
          </NavLink>
          <NavLink to='/Team' activeStyle>
            Team
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
export default NavbarHome;