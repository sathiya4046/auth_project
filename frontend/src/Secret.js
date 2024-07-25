import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Secret() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  axios.defaults.withCredentials=true

  useEffect(()=>{
    axios.get('http://localhost:4000')
    .then(res=>{
      if (res.data.Status==="Success"){
        setAuth(true)
      }else{
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .then(err=>console.log(err))
  },[])
  const handleLogout = ()=>{
    axios.get('http://localhost:4000/logout')
    .then(res=>
      {
        if(res.data.Status==="Success"){
          navigate('/login')
        }
      }
    )
    .then(err=>console.log(err))
  }
  return (
    <div>
      {auth?
      <>
        <h1>I am a web developer</h1>
        <button 
          className="btn btn-danger mb-2"
          onClick={()=>handleLogout()}  
        >Logout</button>
      </>
        : 
      <>
        <h1>{message}</h1>
        <Link to={'/login'}> <button className="btn btn-success mb-2">Login</button> </Link>
      </>
      }
    </div>
  )
}

export default Secret