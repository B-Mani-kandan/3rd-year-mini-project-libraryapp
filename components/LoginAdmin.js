import React from 'react'
import classes from './login.module.css'


function LoginAdmin() {
  return (
    <div className={classes.login}>
      <h1>Aamec Student Login</h1>
      <form>
        <label htmlFor='name' >Name</label>
         <input type='text' id='name'/>
         <label htmlFor='pwd' >Password</label>
         <input type='password' id='pwd'/>
         <button>Login</button>
      </form>

    </div>
  )
}

export default LoginAdmin