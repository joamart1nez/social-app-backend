const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const upload = require('express-fileupload');
require('dotenv').config();


const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(upload());
app.use(express.static('src/uploads'));
//CONEXION A LA BASE DE DATOS DE LA NUBE
//const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.j3gan.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
//const options = { useNewUrlParser: true, useUnifiedTopology: true };

//mongoose.connect(uri, options)
//.then(() => console.log('DB connected'))
//.catch(e => console.error('error:', e));  

//CONEXION A LA BASE DE DATOS LOCAL
mongoose.connect('mongodb://127.0.0.1:27017/social-app',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB connected'))
.catch(e => console.error('error:', e)); 


//import routes
const authRoutes = require('./routes/auth');
const validateToken = require('./routes/validate-token');
const admin = require('./routes/admin');

//route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validateToken, admin);
app.get('/', (req,res)=>{
    res.json({
        status: true,
        message: 'it works'
    });
});

//iniciar server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), (req,res)=>{
    console.log('Server on port', app.get('port'));
})
