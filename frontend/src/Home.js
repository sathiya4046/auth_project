import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        
            <h2 className="sr-only">Know your secret</h2>
            <hr />
            <Link to="/register"><button type="submit" className="btn btn-primary mb-2 mx-4">Register</button></Link>
            <Link to= "/login"><button type="submit" className="btn btn-primary mb-2 mx-4">Login</button></Link>
 
    </div>
  )
}

export default Home