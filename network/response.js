const responseOK=(res,info,optional)=>{
    res.send({
        state:true,
        info:info,
        ...optional
    });
};

const responseERR=(res,info)=>{
    res.send({
        state:false,
        info:info
    });
}

module.exports={
    responseOK,
    responseERR
}