const Animals = require('../models/animals');
require('../models/users');
require('../models/imagen');

const insertAnimal=async(object)=>{
    // object => {'title','description','feeding','imagenid','inhabit','tags','userid'}
    let animal=new Animals({
        title:object.title,
        description:object.description,
        imagen:object.imagenid,
        feeding: object.feeding,
        feedingImagen:object.feedingimagenid,
        inhabit:object.inhabit,
        inhabitImagen:object.inhabitimagenid,
        tags:object.tags,
        user:object.userid
    });
    let animalSave= await animal.save();
    return {state:true,info:animalSave};
};

const updateAnimal=async(object)=>{
    //object => {'_id','title','description','feeding','imagenid','inhabit','inhabitimagen','tags'}
    let animal=await Animals.findByIdAndUpdate(
        object._id,
        {
            title:object.title,
            description:object.description,
            feeding:object.feeding,
            feedingImagen:object.feedingimagenid,
            inhabit:object.inhabit,
            inhabitImagen:object.inhabitimagenid,
            tags:object.tags,
            imagen:object.imagenid,
            user:object.userid
        },
        {
            new:true
        }
    );
    return{
        state:true,
        info:animal
    }
};

const deleteAnimal=async(object)=>{
    //object => {'_id'}
    let animal=await Animals.findByIdAndDelete(object._id);
    return{
        state:true,
        info:animal
    };
}

const getAllAnimals=async(object)=>{
    let forPage=10;
    let targetPage=object.page;
    let start=(targetPage-1)*forPage;
    let imagenKeys={
        _id:1,
        date:1,
        title:1,
        imagen:1,
        pathimagen:1
    };
    let animals=await Animals.find({}).populate('imagen',imagenKeys)
    .populate({
            path:'user',
            select:{
                _id:1,
                user:1,
                fullname:1
            }
        }).populate('inhabitImagen',imagenKeys)
        .populate('feedingImagen',imagenKeys).skip(start).limit(forPage);
    let pages=Math.ceil(animals.length/forPage);
    return {
        state:true,
        info: animals,
        optional:{
            page:targetPage,
            pages:pages
        }
    };
};

const getAnimalForUser=async(object)=>{
    let forPage=10;
    let targetPage=object.page;
    let start=(targetPage-1)*forPage;
    let animals=await Animals.find(
        {user:object.userid}
    ).populate('imagen',{
        _id:1,
        imagen:1,
        title:1,
        date:1
    }).populate('user',{
        _id:1,
        user:1,
        fullname:1
    }).skip(start).limit(forPage);
    let pages=Math.ceil(animals.length/forPage);
    return{
        state:true,
        info:animals,
        optional:{
            pages:pages,
            page:targetPage
        }
    };
};

const getAnimalFilter=async(object)=>{
    let forPage=10;
    let targetPage=object.page;
    let start=(targetPage-1)*forPage;
    let filter=await Animals.find({title:new RegExp(object.filter)}).populate('imagen',{
        _id:1,
        imagen:1,
        title:1,
        date:1,
        pathimagen:1
    }).populate('user',{
        _id:1,
        user:1,
        fullname:1
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
};

const getAnimalForId=async(object)=>{
    let forid=await Animals.findById(object._id).populate('imagen',{
        _id:1,
        imagen:1,
        title:1,
        date:1
    }).populate('user',{
        _id:1,
        user:1,
        fullname:1
    });
    return {
        state:true,
        info:forid
    }
}

module.exports = {
    insertAnimal,
    updateAnimal,
    deleteAnimal,
    getAllAnimals,
    getAnimalForUser,
    getAnimalFilter,
    getAnimalForId
}