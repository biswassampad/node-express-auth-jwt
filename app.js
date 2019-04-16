const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//route files import
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongoose connection with ATLAS
mongoose.connect(
    process.env.MONGO_ATLAS_SECRET,
    {useNewUrlParser:true}
    );

app.use(morgan('dev')); 
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//CORS headers
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin,X-Resquested-With,Content-Type,Accept,Authorization'
        );
    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'GET,POST,PUT,PATCH,DELETE'
            );
        return res.status(200).json({});
    }
    next();
});

//routes for handling requests 
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//error handling 404
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
});
module.exports = app;