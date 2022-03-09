import React from 'react'
import classes from './login.module.css'

const LoginCardTeacher = () => {
  return (
    <div className={classes.login}>
      <h1>Aamec Admin Login</h1>
      <form>
        <label htmlFor='regno' >Staff number</label>
         <input type='text' id='regno'/>
         <label htmlFor='name' >Name(optional)</label>
         <input type='text' id='name'/>
         <button>Login</button>
      </form>

    </div>
  )
}

export default LoginCardTeacher