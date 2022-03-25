import Link from 'next/link'
import React from 'react'
import styles from './global.module.css'
import { useRouter } from "next/router";
import cookie from "js-cookie";


const NavBar = ({Regno,name}) => {

  const router = useRouter();

  let logoutHandler = async() =>{
      cookie.remove("token");
      router.push("/");
  }


  return (
    <nav className={styles.nav}>

       <div style={{fontSize:'20px',color:'#00bfff',backgroundColor: '#fff',height:'100%',padding:'10px 20px',display:'flex',justifyContent:'center',flexDirection:'column'}}>
         <p style={{margin:0,marginBottom:'10px'}}>{Regno}</p>
         <p style={{margin:0}}>{name}</p>
       </div>

        <Link href="#">
          <a onClick={logoutHandler} style={{color:'#fff'}}>Log out</a>
        </Link>
    </nav>
  )
}

export default NavBar