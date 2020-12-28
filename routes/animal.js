const {Router} = require('express');
const {responseOK,responseERR} = require('../network/response');
const {verifiedSession} =require('../passport/sessionVerified');

const {selectAction}=require('../datacontroller/animals');
const animal=Router();

let messageSendData="esto voy a enviar";
let messageTargetError="error aquí";
let messageGetData="esto me llegó";

let messageSendError="se encontró problemas, vuelva a intentarlo nuevamente.";

animal.get('/animal',(req,res)=>{
    console.log(req.query,messageGetData);
    selectAction(req.query).then(ress=>{
        console.log(ress,messageSendData);
        if(ress.state){
            responseOK(res,ress.info,ress.optional);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,messageTargetError);
        responseERR(res,messageSendError);
    });
});

animal.post('/animal',verifiedSession,(req,res)=>{
    console.log(req.body,messageGetData);
    selectAction(req.body).then(ress=>{
        console.log(ress,messageSendData);
        if (ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,messageTargetError);
        responseERR(res,messageSendError)
    })
});

animal.put('/animal/:_id',verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,messageGetData);
    selectAction(obj).then(ress=>{
        console.log(ress,messageSendData);
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,messageTargetError);
        responseERR(res,messageSendError);
    });
});

animal.delete('/animal/:_id',verifiedSession,(req,res)=>{   
    let obj={
        ...req.params,
        ...req.body
    }
    console.log(obj,messageGetData);
    selectAction(obj).then(ress=>{
        console.log(ress,messageSendData);
        if (ress.state){
            responseOk(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr, messageTargetError);
        responseERR(res,messageSendError);
    });
});

module.exports = animal;