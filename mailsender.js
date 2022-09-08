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


var mailOptions = {
    from: 'vikesh.anncode@gmail.com',
    to: 'dipesh.anncode@gmail+work.com,vikeshr884@gmail.com',
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