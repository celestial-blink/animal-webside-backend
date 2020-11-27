const {insertAnimal,updateAnimal,deleteAnimal,getAllAnimals,getAnimalForUser,getAnimalFilter} =require('../crud//animalsCRUD');


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
        default:
            return{
                state:false,
                info:"no se encontró acción"
            };
    }
};

const insertAni=async(object)=>{
    if (verifiedArrayImage(object.inhabitimagenid) && verifiedArray(object.inhabit)){
        let obj={
            ...object,
            ...{inhabit:creartArrayInhabit(object.inhabit)},
            ...{inhabitimagenid:object.inhabitimagenid.split('|')},
            ...{tags:object.tags.split(',')}
        }
        console.log(obj,"datos convertidos");
        let ANIMAL=await insertAnimal(obj);
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
        let obj={
            ...object,
            ...{inhabit:creartArrayInhabit(object.inhabit)},
            ...{inhabitimagenid:object.inhabitimagenid.split('|')},
            ...{tags:object.tags.split(',')}
        }
        console.log(obj,"datos convertidos");
        let ANIMAL=await updateAnimal(obj);
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



const creartArrayInhabit=(object)=>{
    let myarray=[];
    let mainarray=object.split('^');
    myarray=mainarray.map(ele=>{
        let secondary=ele.split('|');
        return secondary;
    });
    return myarray;
}

const verifiedArray=(object)=>{
    if (object.trim()!=""){
        let mainarray=object.split('^');
        if (mainarray.length>0){
            let show = mainarray.map(da=>{
                let arr=da.split('|');
                if (arr.includes('')){
                    return false;
                }else{
                    return (arr.length>1);
                }
            });
            return (show.includes(false))?false:true;
        }else{
            return false;
        }
    }else{
        return false;
    }
};

const verifiedArrayImage=(object)=>{
    if (object.trim()!=""){
        let arr=object.split('^');
        return (arr.length>0);
    }else{
        return false;
    }
}



module.exports = {
    selectAction
};