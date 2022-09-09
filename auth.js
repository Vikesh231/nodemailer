const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
const jwt = require('jsonwebtoken')
const port = 5000;

const cookieParser = require('cookie-parser');
app.use(cookieParser())
// app.use(express.cookieParser());

// jwt
var token;
const users = {
    user : "user1",
    password : "password1"
}
const jwtkey = "my_secret_key";
const jwtExpirarySecond = 300;  



//signIn
app.post('/signin',(req,res)=>{
    const {username, password} = req.body;
    console.log("signin");
                                       // console.log(users[username] );
    if(!username || !password || users.password != password){
        res.status(401).send("Unauthorized request.....")
    } else{

    // create token 
    token = jwt.sign({username},jwtkey,{
        algorithm: "HS256",
        expiresIn: jwtExpirarySecond
    })

    console.log("token: ", token);
    res.cookie("token", token, {maxAge: jwtExpirarySecond*1000})
    res.cookie(`Cookie token name`,token)
}
})

// welcome

app.get('/setcookie',(req,res)=>{
    res.cookie('token',token)
    res.send("set cookies.")
})

app.get('/welcome',(req,res)=>{
    const cookietoken = req.cookies.token;

    if(!cookietoken){
        console.log("uable to token");
        res.status(401).send("unable")
    }

    var payload;
    try{
        payload = jwt.verify(token, jwtkey)
        console.log(payload,"pay");
    }catch(err){
        console.log(err);
        res.send("unautherized token")
    }
    res.send(`welcome ${payload.username}..`)
})



app.listen(port,()=>{
    console.log(`port listen on ${port}`);
})