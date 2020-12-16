const {Router} = require('express');
const {responseOK,responseERR} = require('../network/response');

const actionsUser=require('../datacontroller/user');
const selectAction = require('../datacontroller/user');

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

login.put('/user/:_id',(req,res)=>{
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

login.delete('/user/:_id',(req,res)=>{
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

login.patch('/user/:_id',(req,res)=>{
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

module.exports = login; 