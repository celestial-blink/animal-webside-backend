const {Router} = require('express');
const {responseOK,responseERR} = require('../network/response');

const multer = require('multer');
const {selectAction} = require('../datacontroller/images');
const { verifiedSession } = require('../passport/sessionVerified');

let storage=multer.diskStorage({
    destination:'uploads/myimages/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+"."+file.mimetype.split("/")[1]);
    }
});

let pathImagen=multer({
    storage:storage,
    limits:{fileSize:1048576},
    fileFilter:(req,file,cb)=>{
        let {title,userid}=req.body;
        if(title==undefined || title.trim()=="" || userid==undefined || userid.trim()==""){
                cb(new Error("no se guardó"));
        }else{
            cb(null,true);
        }
    }
}).any('imagen');

let messageERROR="vuelva a intentarlo en otro momento";
let messageForWacth="esto me llegó";
let messageForLocationError="error aquí";
let messageToSend="esto voy a enviar";

const imagen=Router();

imagen.get('/imagen', (req,res)=>{
    console.log(req.query,messageForWacth);
    selectAction(req.query).then(ress=>{
        console.log(ress,messageToSend);
        if(ress.state){
            responseOK(res,ress.info,ress.optional);
        }else{
            responseERR(res,ress.info);  
        }
    }).catch(errr=>{
        console.log(errr,messageForLocationError);
        responseERR(res,messageERROR);
    });
});

imagen.post('/imagen',verifiedSession,(req,res,next)=>{
    pathImagen(req,res,(err)=>{
        if(err){
            if (err instanceof multer.MulterError){
                responseERR(res,err.message);
                return;
            }
            console.log(err);
            responseERR(res,'sin datos');
            return;
        }
        next();
    }
    );
},(req,res)=>{
        let imgvalidation=(req.files.length>0)?req.files[0].filename:[];
        let obj = {
            ...{imagen:imgvalidation},
            ...req.body,
            ...{host:`${req.protocol}://${req.get('host')}/myimages/`}
        };
        console.log(obj,messageForWacth);
        selectAction(obj).then(ress=>{
            console.log(ress,messageToSend);
            if (ress.state){
                responseOK(res,ress.info);
            }else{
                responseERR(res, ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,messageForLocationError);
        responseERR(res,messageERROR);
    });
});

imagen.patch('/imagen/:_id', verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,messageForWacth);
    selectAction(obj).then(ress=>{
        console.log(ress,messageToSend);
        if(ress.state){
            responseOK(res, ress.info);
        }else{
            responseERR(res, ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,messageForLocationError);
        responseERR(res, messageERROR);
    });
});

imagen.delete('/imagen/:_id', verifiedSession,(req,res)=>{
    let obj={
        ...req.params,
        ...req.body
    };
    console.log(obj,messageForWacth);
    selectAction(obj).then(ress=>{
        console.log(ress,messageToSend);
        if(ress.state){
            responseOK(res,ress.info);
        }else{
            responseERR(res,ress.info);
        }
    }).catch(errr=>{
        console.log(errr.message,messageForLocationError);
        responseERR(res,messageERROR);
    });
});

module.exports = imagen;