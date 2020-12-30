const {Router} = require('express');
const {responseERR,responseOK} = require('../network/response');

const {selectAction} = require('../datacontroller/know');
const { verifiedSession } = require('../passport/sessionVerified');

const know = Router();

let messageGetData="me llegó estos datos.";
let messageSendError="problemas con el servidor, vuelve a intentarlo en otro momento";
let messageSendData="esto voy a enviar.";

know.get('/know',(req,res)=>{
    console.log(req.query,messageGetData);
    selectAction(req.query).then(ress=>{
        console.log(ress,messageSendData);
        if(ress.state){
            responseOK(res,ress.info,ress.optional);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,messageSendError);
        responseERR(res,messageSendError);
    })
});

know.post('/know',verifiedSession ,(req,res)=>{
    console.log(req.body,messageGetData);
    selectAction(req.body).then(ress=>{
        console.log(ress,messageSendData);
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr,messageSendError);
        responseERR(res,messageSendError)
    })
});

know.put('/know/:_id',verifiedSession ,(req,res)=>{
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
        console.log(errr,messageSendError);
        responseERR(res,messageSendError)
    });
});

know.delete('/know/:_id', verifiedSession,(req,res)=>{
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
        console.log(errr,messageSendError);
        responseERR(res,messageSendError)
    });
});

module.exports = know;