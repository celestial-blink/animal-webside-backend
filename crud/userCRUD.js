const User = require('../models/users');


const insertUser=async(object)=>{
    //object => {'user','password','repeatPassword','fullname','email'}
        let user=new User({
            user:object.user,
            password:object.password,
            fullname:object.fullname,
            email:object.email
        });
        let userSave=await user.save();

        return {state:true,info:userSave};
};

const updateUser=async(object)=>{
    // object => {'iduser',user','password','fullname','email'}
    let user=await User.findByIdAndUpdate(
        object._id,
        {
            user:object.user,
            password:object.password,
            fullname:object.fullname,
            email:object.email
        },{
            new:true
        }
    );
    return {
        state:true,info:user
    }
};

const getAccess=async(object)=>{
    //object => {'user','password'}
        let user=await User.findOne({
            $and:[
                {user:object.user},
                {password:object.password}
            ]
        });
        return {
            state:true,
            info:user
        };
};

const deleteUser=async(object)=>{
    //object => {'id'}
    let user=await User.findByIdAndDelete(object._id);
    return {
        state:true,info:user
    };
};

const getUser=async(object)=>{
    //object => {'id}
    let user=await User.findById(object._id);
    return {
        state:true,
        info:user
    }
};

const getAllUser=async()=>{
    let users=await User.find();
    return {
        state:true,
        info:users
    }
};

const updateState=async(object)=>{
    let user=await User.findByIdAndUpdate(object._id,
            {
                state:object.state
            },{
                new:true
            }
        );
        return {
            state:true,
            info:user
        }
}

module.exports={
    insertUser,
    getAccess,
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
    updateState
};