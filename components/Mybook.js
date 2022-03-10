import React from 'react'
import styles from './global.module.css'


const Mybook = () => {
  return (
    <div className={styles.AboutBooks} style={{height:'350px',overflowY:'scroll',alignItems:'center',flexDirection:'column'}}>
        <div style={{width:'80%',background:'white',padding:'1%',marginBottom:'2%',borderRadius:'4px',marginTop:'20px'}}>
            <h2>Graph Theory And Application</h2>
            <h3>Time left <span>7d</span></h3>
            <button>return book</button>
        </div>
        <div style={{width:'80%',background:'white',padding:'1%',marginBottom:'2%',borderRadius:'4px'}}>
            <h2>Graph Theory And Application</h2>
            <h3>Time left <span>7d</span></h3>
            <button>return book</button>
        </div>
        <div style={{width:'80%',background:'white',padding:'1%',marginBottom:'2%',borderRadius:'4px'}}>
            <h2>Graph Theory And Application</h2>
            <h3>Time left <span>7d</span></h3>
            <button>return book</button>
        </div>
    </div>
  )
}

export default Mybook