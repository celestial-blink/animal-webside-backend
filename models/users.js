const {Schema, model} = require('mongoose');

let vefiEmail= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Correo inválido"];

const userSchema= new Schema({
    user:{
        type:String,
        required:true,
        unique:[true,"usuario ya existe"],
        validate:{
          validator:(n)=>{
              return !/^$|\s+/.test(n);
          },
          message:"nombre de usuario no debe contener espacios"
        },
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        default:'fullname',
        lowercase:true
    },
    email:{
        type:String,
        match:vefiEmail,
        lowercase:true
    },
    state:{
        type:Boolean,
        required:true,
        default:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }

});

const userModel=model('User',userSchema);

module.exports = userModel;