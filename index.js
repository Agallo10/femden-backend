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
app.use('/api/personas', require('./routes/personas'));
app.use('/api/denuncias', require('./routes/denuncias'));
app.use('/api/estado-denuncias', require('./routes/estado-denuncias'));
app.use('/api/tipo-denuncias', require('./routes/tipo-denuncias'));
app.use('/api/tipo-entidad', require('./routes/tipo-entidades'));
app.use('/api/tipo-documentos', require('./routes/tipo-documentos'));
app.use('/api/total', require('./routes/busquedas'));
app.use('/api/entidades', require('./routes/entidades'));
app.use('/api/uploads', require('./routes/uploads'));



app.listen(process.env.PORT, ()=>{
     console.log('puerto '+ process.env.PORT+' funcionando papee');
});