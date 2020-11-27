const {Schema,model} = require('mongoose');

const knowSchema=new Schema({
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    content:{
        type:String,
        minlength:5,
        required:true
    },
    user:[{
        type:Schema.Types.ObjectId,
        required:[true,"usuario inválido"],
        ref:'User'
    }],
    imagen:[{
        type:Schema.Types.ObjectId,
        ref:'Imagen',
        required:[true,"imagen inválida"]
    }],
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const knowModel = model('Know',knowSchema);

module.exports=knowModel;