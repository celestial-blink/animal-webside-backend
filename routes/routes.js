const cors = require('cors');
const login = require('./user');
const index = require('./index');
const animal = require('./animal');
const know = require('./know');
const imagen = require('./imagen');

const routes = (server)=>{
    server.use(cors());
    server.use(login);
    server.use(animal);
    server.use(know);
    server.use(imagen);
    server.use('/',index);
};

module.exports=routes;