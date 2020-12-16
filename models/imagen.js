const {Schema,model} = require('mongoose');

const imagenSchema=new Schema({
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    imagen:{
        type:String,
        required:true
    },
    pathimagen:{
        type:String,
        required:true,
    },
    user:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const imagenModel=model('Imagen',imagenSchema);

module.exports = imagenModel;