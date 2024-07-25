import React from 'react'
import { Link } from 'react-router-dom'


const Register = ({values,setValues, handleRegister}) => {
  
  return (
    <div className='register'>
        <form className="form-inline" onSubmit={handleRegister}>
        <div className="form-group mx-sm-5 mb-4">
          <h1 className="sr-only">Register</h1>
          <input 
            name='email'
            type="email" 
            className="form-control mb-3" 
            placeholder="Enter your email"
            onChange={e=>setValues({...values, email:e.target.value})}
            required
            />
            <input 
            name='password'
            type="password" 
            className="form-control" 
            placeholder="Enter password"
            onChange={e=>setValues({...values, password:e.target.value})}
            required
            />
        </div>
        <p>Already you have account <Link to= "/login">Login</Link></p>
        <button type="submit" className="btn btn-success mb-2">Register</button>
      </form>
    </div>
  )
}

export default Register