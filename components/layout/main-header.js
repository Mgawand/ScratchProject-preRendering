import Link from 'next/link';
import React from 'react';
import classes from './main-header.module.css';

const MainHeader = () => {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>
            <Link href='/'>NextEvents</Link>
        </div>
        <nav className={classes.navigation}>
            <ul>
                <Link href='/events'>ALL EVENTS</Link>
            </ul>
        </nav>
      </header>
    </div>
  )
}

export default MainHeader
