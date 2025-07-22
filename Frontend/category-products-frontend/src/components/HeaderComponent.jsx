import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <>
      <header>
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
          <a className='navbar-brand' href='www.developers.com'>
            Category n Product Management
          </a>
          <div className='collapse navbar-collapse' id='myNavBar'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/categories'>
                  Categories
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/products'>
                  Products
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
