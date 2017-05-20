import React from 'react';

import NavLink from 'components/NavLink';
import Logo from './Logo';

import styles from './style.scss';

export default () => (
  <div className={styles.header}>
    <nav className={styles.navigation}>
      <NavLink to="/home" label="Home" styles={styles} />
      <NavLink to="/budget" label="Budget" styles={styles} />
      <NavLink to="/reports" label="Reports" styles={styles} />
    </nav>
    <div className={styles.logo}>
      <Logo />
    </div>
  </div>
);
