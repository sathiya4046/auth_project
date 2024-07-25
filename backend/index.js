import express from "express";
import bcrypt from 'bcrypt'
import cors from 'cors'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const saltRounds = 5;

const app = express()
const port = 4000;


app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials: true
}))
app.use(cookieParser())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'datavalues'
})
const verifyUser = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json({Error:"Not authorized"})
    } else{
        jwt.verify(token,"jwt-private-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"token error"}) 
            }else{
                req.id=decoded.id
                next()
            }
        })
    }
}
app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success"})
})

app.post("/register",(req,res)=>{
    const mail = req.body.email
    const sql ="SELECT *FROM employee WHERE email =(?)"
    db.query(sql,[mail],(err,data)=>{
        if(err) return res.json("email.wrong")
            if(data.length>1){
                return res.json({Status:"Email already exists"})
            }else{
                bcrypt.hash(req.body.password.toString(), saltRounds, (err,hash)=>{
                    if(err) return res.json({Error:"hash error"})
                    const values = [
                        mail,
                        hash
                    ]
                db.query("INSERT INTO employee (email,password) VALUES (?)",[values],(err,result)=>{
                    if(err) return res.json(err.message)
                    return res.json({Status:"Success"})
                })
                })  
            }
    })
    
})
app.post("/login",(req,res)=>{
    const sql = "SELECT * FROM employee WHERE email =(?)"
    db.query(sql,[req.body.email],(err,data)=>{
        if(err){
            return res.json("email wrong")
        }
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err, response)=>{
                if(err){
                    return res.json({Error:"password wrong"})
                }
                if(response){
                    const id = data[0].id
                    const token = jwt.sign({id},"jwt-private-key",{expiresIn:'1d'})
                    res.cookie('token',token)
                    return res.json({Status:"Success"})
                }else{
                    return res.json({Error:"password not match"})

                }
            })
        }else{
            return res.json({Error:"no email required"})
        }
    })
})
app.get("/logout", (req,res)=>{
    res.clearCookie('token')
    return res.json({Status:"Success"})
})
app.listen(port,()=>{
    console.log(`running on ${port}`)
})