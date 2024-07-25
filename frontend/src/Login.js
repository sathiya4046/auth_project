import React from 'react'
import { Link } from 'react-router-dom'

function Login({login,setLogin,handleLogin}) {
  return (
    <div className='register'>
        <form className="form-inline" onSubmit={handleLogin}>
        <div className="form-group mx-sm-5 mb-4">
          <h1 className="sr-only">Login</h1>
          <input 
            type="email" 
            className="form-control mb-3" 
            id="inputPassword2" 
            placeholder="Enter your email"
            onChange={(e)=>setLogin({...login,email:e.target.value})}
            required
          />
            <input 
            type="password" 
            className="form-control" 
            id="inputPassword2" 
            placeholder="Enter password"
            onChange={(e)=>setLogin({...login,password:e.target.value})}
            required
            />
        </div>
        <p>If you don't have account <Link to= "/register">sign up</Link></p>
        <button type="submit" className="btn btn-success mb-2">Login</button>
      </form>
    </div>
  )
}

export default Login