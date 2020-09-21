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

//lectura y parseo del body
app.use(express.json());
//OF6oue0tpFTyfCN1
//femden_user

//rutas
app.use('/api/cuentas', require('./routes/cuentas'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, ()=>{
     console.log('puerto '+ process.env.PORT+' funcionando papee')
});