const responseOK=(res,info,optional)=>{
    res.send({
        state:true,
        info:info,
        ...optional
    });
};

const responseERR=(res,info,optional)=>{
    res.send({
        state:false,
        info:info,
        ...optional
    });
}

module.exports={
    responseOK,
    responseERR
}