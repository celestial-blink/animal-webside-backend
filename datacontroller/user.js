const {insertUser,updateUser,updateState,deleteUser, getAccess,getUser,getAllUser,updatePassword} = require('../crud/userCRUD');
const userModel = require('../models/users');

const selectAction=async(object)=>{
    // object => {'insert','delete','update','get'}
    switch(object.action){
        case'insert':
        let newUser=await insertU(object);
            return newUser;
        case'update':
        let modifiedUser=await updateU(object);
            return  modifiedUser;
        case'delete':
        let dropUser=await deleteU(object);
            return dropUser;
        case'account-active':
        let account=await updateStateU(object);
            return account;
        case "change-password":
        let changeP=await changePassword(object); 
        return changeP;
        case'get-data-user':
        let getUsersExist=await getUserData(object);
            return getUsersExist;
        case'login':
        let accessaccount=await accessAccount(object);
            return accessaccount;
        default:
            return {
                state:false,
                info:'no se encontro acción'
            }
    }
}

const insertU=async(object)=>{
    let verified=object.password==object.repeat && object.password.trim()!="";
    if (verified){
        let newUser=await insertUser(object);
        return newUser;
    }else{
        return{
            state:false,
            info:"las contraseñas no coinciden"
        }
    }
}

const updateU=async(object)=>{
        let newUser=await updateUser(object);
        return (newUser.info!=null)?newUser:{state:false,info:"no se enontró usuario"};
}

const deleteU=async(object)=>{
    let dropUser=await deleteUser(object);

    return (dropUser.info!=null)?dropUser:{state:false,info:"no se encontró usuario"};
};

const getUserData=async(object)=>{
    let select=(object._id!=undefined);
    if (select){
        let userid=await getUser(object);
        return (userid.info!=null)
        ?{state:true,info:modifiedResult(userid.info)}
        :{
            state:false,
            info:"no se encontro usuario"
        };
    }else{
        let allusers=await getAllUser();
        let allusersmodified=(allusers.info.length>0)
        ?allusers.info.map(ele=>{
           return modifiedResult(ele);
        })
        :null;
        return (allusersmodified!=null)?{state:true,info:allusersmodified}:{state:false,info:"no se encontró ninguno"}
    };
}

const modifiedResult=(object)=>{
    let modified={};
    modified._id = object._id;
    modified.user = object.user;
    modified.email = object.email;
    modified.date = object.date;
    modified.fullname = object.fullname;
    return modified;
};

const updateStateU= async(object)=>{
    let obj={
        ...object,
        ...{state:(object.state=="true")}
    }
    let modifiedUser=await updateState(obj);
    return (modifiedUser!=null)?modifiedUser:{state:false,info:"no se encontró usuario"}; 
};

const accessAccount=async(object)=>{
    let accessC=await getAccess(object);
    let modifiedAccess=(accessC.info!=null)
    ?{
    state:true,
    info:modifiedResult(accessC.info)}
    :null;
    return (modifiedAccess!=null)?modifiedAccess:{state:false,info:"error de usuario o contraseña"};
}

const changePassword=async(object)=>{
    let verified=(object.password==object.repeat && object.password.trim()!="");
    if (verified) {
        let changeP=await updatePassword(object);
        return (changeP.info!=null)?changeP:{state:false,info:"error de auntentificación"};
    }else{
        return {
            state:false,
            info:"las contraseñas no coinciden"
        }
    }
}

module.exports = selectAction;