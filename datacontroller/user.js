const {insertUser,updateUser,updateState,deleteUser, getAccess,getUser,getAllUser} = require('../crud/userCRUD');
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
    let equality=object.password.trim()==object.repeat.trim();
    if (equality){
        let newUser=await insertUser(object);
        return newUser;
    }else{
        return {
            state:false,
            info:'las contraseñas no son iguales'
        }
    }
}

const updateU=async(object)=>{
    let equality=object.password.trim()==object.repeat.trim();
    if (equality){
        let newUser=await updateUser(object);
        return (newUser.info!=null)?newUser:{state:false,info:"no se enontró usuario"};
    }else{
        return {
            state:false,
            info:'las contraseñas no son iguales'
        }
    }
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

module.exports = selectAction;