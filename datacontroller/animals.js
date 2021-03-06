const {insertAnimal,updateAnimal,deleteAnimal,getAllAnimals,getAnimalForUser,getAnimalFilter,getAnimalForId} =require('../crud//animalsCRUD');


let messageNotFoundAnimal={state:false,info:"no se encontró animal"};
let messageNotFoundResult={state:false,info:"no se encontró resultados"};

const selectAction=async(object)=>{
    switch (object.action){
        case'insert':
        let isrtAnimal=await insertAni(object);
            return isrtAnimal;
        case'update':
        let uptAnimal=await updateAni(object);
            return uptAnimal;
        case'delete':
        let delAnimal=await deleteAni(object);
            return delAnimal;
        case'get-data-animals':
        let getAnimals=await searchAni(object);
            return getAnimals;
        case 'get-data-id':
        let getAnimalFORID=await srcAnimalForID(object);
            return getAnimalFORID;
        default:
            return{
                state:false,
                info:"no se encontró acción"
            };
    }
};

const insertAni=async(object)=>{
    if (verifiedArrayImage(object.inhabitimagenid) && verifiedArray(object.inhabit)){
        let ANIMAL=await insertAnimal(object);
        return ANIMAL;
    }else{
        return{
            state:false,
            info:"no se obtuvo todos los campos"
        }
    }
};

const updateAni=async(object)=>{
    if (verifiedArrayImage(object.inhabitimagenid) && verifiedArray(object.inhabit)){
        let ANIMAL=await updateAnimal(object);
        return (ANIMAL.info!=null)
                ?ANIMAL
                :messageNotFoundAnimal;
    }else{
        return{
            state:false,
            info:"no se obtuvo todos los campos"
        }
    }
};

const deleteAni=async(object)=>{
    let ANIMAL=await deleteAnimal(object);
        return (ANIMAL.info!=null)
                ?ANIMAL
                :messageNotFoundAnimal;
};

const searchAni=async(object)=>{
    let obj={
        ...object,
        ...{page:(object.page!=undefined)?parseInt(object.page):1}
    }
    console.log(obj,"datos convertidos");
    if(obj.userid){
        let srchAnimals=await getAnimalForUser(obj);
        return (srchAnimals.info.length>0)
                ?srchAnimals
                :messageNotFoundResult;
    }else{
        if (obj.filter!=undefined){
            let filter=await getAnimalFilter(obj);
            return (filter.info.length>0)
                    ?filter
                    :messageNotFoundResult;
        }else{
            let srchAnimalsAll=await getAllAnimals(obj);
            return (srchAnimalsAll.info.length>0)
                    ?srchAnimalsAll
                    :messageNotFoundResult;
        }
    }
};


const verifiedArray=(object)=>{
    if(typeof object !="string" && object!=undefined){
        if(object.length>0){
            let verifi=object.map(ele=>{
                return (ele.length>1);
            });
            return (!(verifi.includes(false)));
        }else{
            return false;
        }
    }else{
        return false;
    }
};

const verifiedArrayImage=(object)=>{
    if(typeof object !="string" && object !=undefined){
        if(object.length>0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

const srcAnimalForID=async(object)=>{
    let forID=await getAnimalForId(object);
    return (forID.info!=null)?forID:messageNotFoundResult;
};

module.exports = {
    selectAction
};