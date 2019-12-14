import React from 'react'
import useAuth from 'hooks/useAuth'
import styles from './navbar.module.css'

export default () => {
  const auth = useAuth()

  const logout = () => {
    auth.logout()
  }

  return (
    <div id={styles.container}>
      <nav id={styles.navbar}>
        <a className={styles.logoLink} href='https://cuhacking.com'>
          <div id={styles.navLogo} />
        </a>
        {auth.user ? (
          <div className={styles.logoutButton} onClick={logout}>
            <h4>Logout</h4>
          </div>
        ) : (
          <div />
        )}
      </nav>
    </div>
  )
}
