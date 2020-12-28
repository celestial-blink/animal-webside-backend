const passport = require('passport');
const strategy = require('passport-local').Strategy;

const {getAccess,insertUser,getUser} = require('../crud/userCRUD');




passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let getUsr=await getUser({_id:id});
    return  done(null,getUsr.info)
})


passport.use('local-signup',new strategy({
    usernameField:'user',
    passwordField:'password',
    passReqToCallback: true
},async(req,user,password,done)=>{
    if(req.body.password==req.body.repeat && req.body.password.trim()!=""){
        try{
            let up=await insertUser(req.body);
            if (up.info!=null){
               return done(null,up.info,req.flash('message-sign',up.info._id));
            }else{
               return done(null,false,req.flash('message-sign','nani'));
            }
        } catch(err){
            if(err.name=="ValidationError" || err.name=="MongoError"){
               return done(null,false,req.flash('message-sign',err.message));
            }else{
                return done(err);
            }
        }
    }else{
        return done(null,false,req.flash('message-sign','contraseñas no coinciden'));
    }
})
);

passport.use('local-signin',new strategy({
    usernameField:'user',
    passwordField:'password',
    passReqToCallback: true
},async(req,user,password,done)=>{
    try{
        let suser=await getAccess(req.body);
        if(suser.info!=null){
           return done(null,suser.info,req.flash('message-sign',suser.info._id));
        }else{
           return done(null,false,req.flash('message-sign','usuario o contraseñas incorrectas'));
        }
    }catch (err){
        console.log("aqui hay algo");
        if (err.name=="ValidatorError"){
           return done(null,false,req.flash('message-sign',"take"));
        }else{
           return done(err);
        }
    }
})
);

