import React from 'react'
import { Link } from 'react-router-dom'
import styles from './module/Landing.module.css'

const Landing = () => {
  return (
    <div className={styles.container}>
    <Link to="/home">
        <button>GO!</button>
    </Link>
    </div>
  )
}

export default Landing