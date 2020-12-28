const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const getConnectionDB=async()=>{
    let urlAtlas=`mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@cluster0.gt8zx.mongodb.net/animalworld?retryWrites=true&w=majority`;
    let connection = await mongoose.connect(urlAtlas,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
    });
    return connection;
}

module.exports = {getConnectionDB};