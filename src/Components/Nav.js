import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="main-nav">
        <ul>
          <li><NavLink to='/ar15'>AR15</NavLink></li>
          <li><NavLink to='/mountains'>Mountains</NavLink></li>
          <li><NavLink to='/overlanding'>Overlanding</NavLink></li>
        </ul>
      </nav>
    );
}

export default Nav;