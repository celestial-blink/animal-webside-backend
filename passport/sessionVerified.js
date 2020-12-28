const {responseERR} = require('../network/response');

const verifiedSession=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        responseERR(res,"no hay usuarios en session",{stateSession:false})
    }
};

module.exports ={
    verifiedSession
}