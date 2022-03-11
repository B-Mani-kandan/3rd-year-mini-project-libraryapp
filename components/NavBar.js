import Link from 'next/link'
import React from 'react'
import styles from './global.module.css'

const NavBar = ({Regno,name}) => {

  return (
    <nav className={styles.nav}>

       <div style={{fontSize:'20px',color:'#fff',backgroundColor: '#5c49db',height:'100%',padding:'10px 20px',display:'flex',justifyContent:'center',flexDirection:'column'}}>
         <p style={{margin:0,marginBottom:'10px'}}>{Regno}</p>
         <p style={{margin:0}}>{name}</p>
       </div>

        <Link href="#">
          <a>Log out</a>
        </Link>
    </nav>
  )
}

export default NavBar