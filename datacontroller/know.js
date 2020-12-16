const {insertKnow,updateKnow,deleteKnow,getAllKnow,getKnowForUser,getKnowFilter,getAllData} = require('../crud/knowCRUD');

let messageNotFoundKnow={state:false,info:"no se encontró ¿sabías qué?"};
let messageNotFoundResult={state:false,info:"no se encontró resultados"};

const selectAction=async(object)=>{
    switch (object.action){
        case'insert':
        let inrtknow=await insertKw(object);
            return inrtknow;
        case 'update':
        let uptknow=await updateKw(object);
            return uptknow;
        case 'delete':
        let delknow=await deleteKw(object);
            return delknow;
        case 'get-data-know':
        let srchknow=await searchKw(object);
            return srchknow;
        case 'get-all-data':
        let getall=await getAllDat(object);
            return getall;
        default:
            return{
                state:false,
                info:"no se encontró acción"
            }
    }
};

const insertKw=async(object)=>{
    let KNOW=await insertKnow(object);
    return KNOW;
};

const updateKw=async(object)=>{
    let KNOW=await updateKnow(object);
    return (KNOW.info!=null)
            ?KNOW
            :messageNotFoundKnow;
};

const deleteKw=async(object)=>{
    let KNOW=await deleteKnow(object);
    return (KNOW.info!=null)
            ?KNOW
            :messageNotFoundKnow;
};

const getAllDat=async(object)=>{
    let getall=await getAllData(object);
    return (getall.info.length>0)?getall
    :messageNotFoundResult;
}

const searchKw=async(object)=>{
    let obj={
        ...object,
        ...{page:(object.page!=undefined)?parseInt(object.page):1}
    }
    let selectResult=(obj.userid!=undefined);
    console.log(obj,"datos convertidos");
    if (selectResult){
        let resultUser=await getKnowForUser(obj);

        return (resultUser.info.length>0)
                ?resultUser
                :messageNotFoundResult;
    }else{
        if(obj.filter){
            let filter=await getKnowFilter(obj);
            return (filter.info.length>0)
                    ?filter
                    :messageNotFoundResult;
        }else{
            let allresult=await getAllKnow(obj);
            return (allresult.info.length>0)
                    ?allresult
                    :messageNotFoundResult;
        }
    }
};


module.exports = {selectAction};