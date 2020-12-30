const {Router} = require('express');
const {responseOK,responseERR} = require('../network/response');

const actionsUser=require('../datacontroller/user');
const selectAction = require('../datacontroller/user');

//passport
const passport = require('passport');
const {verifiedSession}= require('../passport/sessionVerified');

const login = Router();

login.post('/user',(req,res)=>{
    console.log(req.body,"esto me llegó");
    actionsUser(req.body).then(ress=>{
        console.log(ress,'esto voy a enviar');
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,"esto en mi error");
        if(errr.name=="ValidationError"){
            responseERR(res,errr.message);
        }else{
            responseERR(res,"problemas con el servidor inténtelo después");
        };
    })
});

login.get("/user",(req,res)=>{
    console.log(req.query,"esto me llegó");
    selectAction(req.query).then(ress=>{
        console.log(ress,"esto voy a enviar");
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,"error aquí");
        if(errr.name="ValidationError"){
            responseERR(res,errr.message);
        }else{
            responseERR(res,"problemas con el servidor inténtelo después");
        }
    });
});

login.put('/user/:_id',verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,"me llegó esto");
    selectAction(obj).then(ress=>{
        console.log(ress,"esto voy a enviar");
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,"error aquí");
        if(errr.name="ValidationError"){
            responseERR(res,errr.message);
        }else{
            responseERR(res,"problemas con el servidor inténtelo después");
        }
    });
});

login.delete('/user/:_id',verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,"esto me llegó");
    selectAction(obj).then(ress=>{
        console.log(ress,"esto voy a enviar");
        if (ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,"error aqui");
        if(errr.name="ValidationError"){
            responseERR(res,errr.message);
        }else{
            responseERR(res,'problemas con el servidor inténtelo después');
        }
    });

});

login.patch('/user/:_id',verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,"esto me llegó");
    selectAction(obj).then(ress=>{
        console.log(ress,"esto voy a enviar");
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,"error aqui");
        if(errr.name="ValidationError"){
            responseERR(res,errr.message);
        }else{
            responseERR(res,"problemas con el servidor inténtelo después")
        }
    });
});

login.post('/signin',passport.authenticate('local-signin',{
    failureRedirect:"/user/response/sign-out-in",
    passReqToCallback:true
}),(req,res)=>{
    console.log(req.user);
    if (req.isAuthenticated()){
        responseOK(res,req.flash('message-sign')[0])
    }else{
        responseERR(res,req.flash('message-sign')[0])
    }
}
);

login.post('/signup',passport.authenticate('local-signup',{
    successRedirect:"/user/response/sign-out-in?state=true",
    failureRedirect:"/user/response/sign-out-in",
    passReqToCallback:true
})
);

login.get("/logout",(req,res)=>{
    req.logOut();
    if(req.isUnauthenticated()){
        responseOK(res,'sin session');
    }else{
        responseERR(res,'no se pudo cerrar session');
    }

});

login.get("/user/response/sign-out-in",(req,res)=>{
    let message=req.flash('message-sign')[0];
    if(req.query.state){
        responseOK(res,message);
    }else{
        responseERR(res,message);
        console.log(message);
    }
});

login.get('/user/verifiedsession',(req,res)=>{
    let targetUser=(req.user==undefined)?{}:req.user;
    let verified=req.isAuthenticated();
    responseOK(res,{session:verified,user:{
        _id:targetUser._id,
        user:targetUser.user,
        email:targetUser.email,
        fullname:targetUser.fullname,
        date:targetUser.date
    }});
});

module.exports = login; 