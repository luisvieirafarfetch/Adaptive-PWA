import React from 'react';
import { Link } from 'react-router-dom';
import StylesCommon from './nav.common.css';
import Styles from './nav.ios.css';

const Nav = ({ children }) => (
    <div>
        <header className={[StylesCommon.nav, Styles.nav].join(' ')}>
            <h1 className={Styles.title}>HN</h1>
        </header>
        {children}
        <ul className={[StylesCommon.nav, Styles.navIOS].join(' ')}>
            <li className={StylesCommon.link}>
                <Link to="/">Top</Link>
            </li>
            <li className={StylesCommon.link}>
                <Link to="/new">New</Link>
            </li>
            <li className={StylesCommon.link}>
                <Link to="/preferences">Preferences</Link>
            </li>
        </ul>
    </div>
);

export default Nav;
