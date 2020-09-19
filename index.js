require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors'); 


//Crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

//base de datos 
dbConnection();


//OF6oue0tpFTyfCN1
//femden_user

//rutas
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});


app.listen(process.env.PORT, ()=>{
     console.log('puerto '+ process.env.PORT+' funcionando papee')
});