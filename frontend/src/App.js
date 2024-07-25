import Register from "./Register";
import Login from "./Login";
import Secret from "./Secret";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from 'axios'
import { useState } from "react";




function App() {

  const navigate = useNavigate()

  const [values, setValues]= useState([{
    email:"",
    password:""
  }])

  const [login, setLogin] = useState([{
    email:"",
    password:""
  }])

  const handleRegister = async (e)=>{
    e.preventDefault()
    try{
    await axios.post('http://localhost:4000/register', values)
    .then(res=> {
      if (res.data.Status==="Success"){
        navigate('/login')
      }else{
        console.log(res)
      }}
      )    
    .then(err=>console.log(err))
  }catch{
    console.log("register error")
  }
  }
  axios.defaults.withCredentials=true
  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
    await axios.post("http://localhost:4000/login",login)
    .then(res=>{
      if (res.data.Status === "Success"){
        navigate('/secret')
      }else{
        alert(res.data.Error)
      }
    })
    .then(err=>console.log(err))
    }catch{
      console.log("login error")
    }
  }
  
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={
        <Register
          values={values}
          setValues={setValues}
          handleRegister={handleRegister}
        />}/>
        <Route path="/login" element={
        <Login
          login={login}
          setLogin={setLogin}
          handleLogin={handleLogin}
        />}/>
        <Route path="/secret" element={<Secret/>}/>
      </Routes>
    </div>
  );
}

export default App;
