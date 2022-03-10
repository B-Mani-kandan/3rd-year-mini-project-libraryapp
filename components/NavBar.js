import Link from 'next/link'
import React from 'react'
import styles from './global.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
              <Link href="#">
          <a>Log out</a>
        </Link>
    </nav>
  )
}

export default NavBar