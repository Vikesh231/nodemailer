/*
// nodemailsender
const nodemailer = require('nodemailer');
let configOptions = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user: 'vikesh.anncode@gmail.com',
        pass: 'jekvvmtikbbijiep'
    }
});
// nodemailer 

var mailOptions = {
    from: 'vikesh.anncode@gmail.com',
    to: 'vikeshraj370@gmail.com',
    subject: "nodemailer",
    text: 'hello from anncode'
}

configOptions.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log(info);
        console.log("email has been sent",info.response);
    }
})
*/

// otp varification


//otp varification
const express = require('express')
const app = express();
app.use(express.json());
const port = 8080;
const nodemailer = require('nodemailer');


var email;
var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp);

console.log(otp);


let configOptions = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user: 'vikesh.anncode@gmail.com',
        pass: 'jekvvmtikbbijiep'
    }
});

app.get("/", (req, res) => {
    console.log("otp varification");
    res.send("otp varification...");
  });

app.post('/send',(req,res)=>{
    email = req.body.email;
    var mailOptions = {
        from: 'vikesh.anncode@gmail.com',
        to: email,//'dipesh.anncode@gmail+work.com,vikeshr884@gmail.com',
        subject: "nodemailer",
        text: 'one time otp: '+ otp
    }

    configOptions.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log(info);
            console.log("email has been sent",info.response);
        }
    })
    res.send("otp has send check your mail")

});


app.post('/varify',(req,res)=>{
    if(otp == req.body.otp){
        console.log("You has been successfully registered");
        res.send('You has been successfully registered')
    }else{
        console.log("did not match otp");
        res.send('did not match otp')
    }
})
app.listen(port,()=>{
    console.log(`port run on https://localhost:${port}`);
})
