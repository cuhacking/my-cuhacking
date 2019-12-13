import React from 'react'
import styles from './navbar.module.css'

export default () => (
  <div id={styles.container}>
    <nav id={styles.navbar}>
      <a href='https://cuhacking.com'>
        <div id={styles.navLogo} />
      </a>
    </nav>
  </div>
)
