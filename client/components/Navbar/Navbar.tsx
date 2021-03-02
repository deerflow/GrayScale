import * as React from 'react';

import { Link } from 'react-router-dom'
import './Navbar.css';

interface NavbarProps {
    isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
    return (
        <nav className='nav'>
            <Link className='nav-brand' to='/'>GrayScale</Link>
            <ul className='nav-tabs'>
                <li className='nav-tab'>
                    <Link className='nav-link' to={isLoggedIn ? '/account' : '/get-started'}>{isLoggedIn ? 'Account' : 'Get started'}</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;