const {insertImagen,deleteImagen,updateImagen,getAllImagens,getImagenForUser,getImagenFilter} =require('../crud/imagenCRUD');

const fs=require('fs');

const selectAction=async(object)=>{
    switch (object.action){
        case 'insert':
        let inrtImg=await insertImg(object);
            return inrtImg;
        
        case 'update':
        let uptImg=await updateImg(object);
            return uptImg;
        
        case 'delete':
        let delImg=await deleteImg(object);
            return delImg;

        case 'get-data-imagen':
        let getImgs=await searchImgs(object);
            return getImgs;

        default :
            return {
                state:false,
                info:"no se encontró acción"
            }
    }
};

const insertImg=async(object)=>{
    let obj={
        ...object,
        ...{imagen:(object.imagen!=[]?object.imagen:"ImageNotFound.svg")}
    }
        let IMG=await insertImagen(obj);
        return IMG;
};

const updateImg=async(object)=>{
    let IMG=await updateImagen(object);
    return (IMG.info!=null)?IMG:{state:false,info:"no se encontró imagen"}
};

const deleteImg=async(object)=>{
    let IMG=await deleteImagen(object);

    if(IMG.info!=null){
        let path="./uploads/myimages/"+IMG.info.imagen;
        removeImagenFromServer(path);
    }
    return (IMG.info!=null)?IMG:{state:false,info:"no se encontró imagen"};
};

const searchImgs=async(object)=>{
    let obj={
        ...object,
        ...{page:(object.page!=undefined)?parseInt(object.page):1}
    }
    console.log(obj,"datos convertidos");
    if(obj.userid!=undefined){
        let searchUser=await getImagenForUser(obj);
        return (searchUser.info.length>0)
        ?searchUser
        :{state:false,info:"no se encontró resultados"};
    }else{
        if(obj.filter!=undefined){
            let filter=await getImagenFilter(obj);
            return (filter.info.length>0)
                    ?filter
                    :{state:false,info:"no se encontró resultados"};
        }else{
            let searchAll=await getAllImagens(obj);
            return (searchAll.info.length>0)
            ?searchAll
            :{state:false,info:"no se encontró resultados"};
        }
    }
};


const removeImagenFromServer=(path)=>{
    fs.unlinkSync(path,(err)=>{
        if (err){
            console.log(err,"no se pudo eliminar");
            return;
        }
        console.log("archivo eliminado");
    });
};

module.exports = {selectAction};