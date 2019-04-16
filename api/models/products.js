const mongoose = require('mongoose');
const timestamps =require('mongoose-timestamp');

//defining the database schema for mongodb
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    }
});
productSchema.plugin(timestamps);

//defining the collection name for mongodb
const Product = mongoose.model('Product',productSchema);
module.exports= Product;