const Know = require('../models/know');
require('../models/users');
require('../models/imagen');

const insertKnow=async(object)=>{
    // object => {'title', 'content' ,'user','imagen'}
    let know=new Know({
        title:object.title,
        content:object.content,
        user:object.userid,
        imagen:object.imagenid
    });

    let knowSave=await know.save();
    return {
        state:true,
        info:knowSave
    };
};

const updateKnow=async(object)=>{
    //object => {'_id','title',imagenid}
    let know=await Know.findByIdAndUpdate(
        object._id,
        {
            title:object.title,
            imagen:object.imagenid,
            content:object.content
        },
        {
            new:true
        }
    );
    return{
        state:true,
        info:know
    }
}

const deleteKnow=async(object)=>{
    // object => {'_id'}
    let know=await Know.findByIdAndDelete(object._id);
    return{
        state:true,
        info:know
    }   
};

const getAllKnow=async(object)=>{
    let forPage=10;
    let targetPage=object.page
    let start=(targetPage-1)*forPage;
    let know=await Know.find().populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1
    }).populate('imagen',{
        _id:1,
        title:1,
        imagen:1,
        date:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(know.length/forPage);
    return{
        state:true,
        info:know,
        optional:{
            page:targetPage,
            pages:pages
        }
    }
};

const getKnowForUser=async(object)=>{
    //object => {'userid'}
    let forPage=10;
    let targetPage=object.page
    let start=(targetPage-1)*forPage;
    let know=await Know.find({
        user:object.userid
    }).populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1
    }).populate('imagen',{
        _id:1,
        title:1,
        imagen:1,
        date:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(know.length/forPage);
    return{
        state:true,
        info:know,
        optional:{
            pages:pages,
            page:targetPage
        }
    };
};

const getKnowFilter=async(object)=>{
    let forPage=10;
    let targetPage=object.page
    let start=(targetPage-1)*forPage;
    let filter=await Know.find({
        title:new RegExp(object.filter)
    }).populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1
    }).populate('imagen',{
        _id:1,
        title:1,
        imagen:1,
        date:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(filter.length/forPage);
    return {
        state:true,
        info:filter,
        optional:{
            pages:pages,
            page:targetPage
        }
    }
}


module.exports ={
    insertKnow,
    updateKnow,
    deleteKnow,
    getAllKnow,
    getKnowForUser,
    getKnowFilter
};