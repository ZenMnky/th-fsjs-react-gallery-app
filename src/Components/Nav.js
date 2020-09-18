import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="main-nav">
        <ul>
          <li><NavLink to='/monkey'>Monkey</NavLink></li>
          <li><NavLink to='/mountains'>Mountains</NavLink></li>
          <li><NavLink to='/overlanding'>Overlanding</NavLink></li>
        </ul>
      </nav>
    );
}

export default Nav;