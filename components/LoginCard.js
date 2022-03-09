import React from 'react'
import classes from './login.module.css'

function LoginCard() {


  return (
    <div className={classes.login}>
      <h1>Aamec Student Login</h1>
      <form>
        <label htmlFor='regno' >Registor number</label>
         <input type='text' id='regno'/>
         <label htmlFor='name' >Name(optional)</label>
         <input type='text' id='name'/>
         <button>Login</button>
      </form>

    </div>
  )
}

export default LoginCard