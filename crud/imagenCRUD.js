const Imagen = require('../models/imagen');
require('../models/users');


const insertImagen=async(object)=>{
    //object => {'title','path imagen','usuario'}    
    let imagen=new Imagen({
            title:object.title,
            imagen:object.imagen,
            pathimagen:`${object.host+object.imagen}`,
            user:object.userid
        });
        console.log(imagen.imagen,"ny");
        let imagenSave= await imagen.save();
        return {state:true,info:imagenSave};

};

const updateImagen=async(object)=>{
    // object => {'_id','title'}
    let imagen=await Imagen.findByIdAndUpdate(
        object._id,
        {
            title:object.title
        },
        {
            new:true
        }
    );

    return{
        state:true,
        info:imagen
    }
}

const deleteImagen=async(object)=>{
    //object => {'id'}
    let imagen=await Imagen.findByIdAndDelete(object._id);
    return {
        state:true,
        info:imagen
    }
}

const getAllImagens=async(object)=>{
    let forPage=10;
    let targetPage=object.page;
    let start=(targetPage-1)*forPage;
    let totalPages=await Imagen.find().count();
    let imagens=await Imagen.find().populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1,
        date:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(totalPages/forPage);
    return{
        state:true,
        info:imagens,
        optional:{
            pages:pages,
            page:targetPage
        }
    }
};

const getImagenForUser=async(object)=>{
    // object => {'userid'}
    let forPage=10;
    let targetPage=object.page;
    let totalPages=await Imagen.find({user:object.userid}).count();
    let start=(targetPage-1)*forPage;
    let imagens=await Imagen.find({
        user:object.userid
    }).populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1,
        date:1
    }).skip(start).limit(forPage);
    
    let pages=Math.ceil(totalPages/forPage);
    return{
        state:true,
        info:imagens,
        optional:{
            pages:pages,
            page:targetPage
        }
    }
};

const getImagenFilter=async(object)=>{
    let forPage=10;
    let targetPage=object.page;
    let totalPages=await Imagen.find({title:new RegExp(object.filter)}).count();
    let start=(targetPage-1)*forPage;
    let filter=await Imagen.find({title:new RegExp(object.filter)}).populate('user',{
        _id:1,
        email:1,
        fullname:1,
        user:1,
        date:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(totalPages/forPage);
    return{
        state:true,
        info:filter,
        optional:{
            pages:pages,
            page:targetPage
        }
    }
}

module.exports = {
    insertImagen,
    deleteImagen,
    getAllImagens,
    getImagenForUser,
    updateImagen,
    getImagenFilter
};