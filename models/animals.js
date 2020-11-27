const {Schema,model} = require('mongoose');

const animalsSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },

    feeding:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    feedingImagen:{
        type:Schema.Types.ObjectId,
        required:[true,"se necesita imagen de alimentación"],
        ref:'Imagen'
    },
    imagen:{
        type:Schema.Types.ObjectId,
        required:[true,"se necesita imagen principal"],
        ref:'Imagen'
    },

    //array['inhabit','description']
    inhabit:[{
        type:Array,
        required:true,
        lowercase:true
    }],
    inhabitImagen:[{
        type:Schema.Types.ObjectId,
        required:[true,"se necesita imagen principal"],
        ref:'Imagen'
    }],
    tags:{
        type:Array,
        required:true,
        lowercase:true
    },
    user:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }],
    date:{
        type:Date,
        default:Date.now(),
        required:true
    }

});

const animalsModel = model('Animal',animalsSchema);

module.exports= animalsModel;