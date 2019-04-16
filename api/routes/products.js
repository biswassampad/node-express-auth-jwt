const express = require('express');
const router = express.Router();

const Product = require('../models/products');

//get products
router.get('/',async (req,res,next)=>{
    Product.find()
    .exec()
    .then(
        docs=>{
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(docs);
            }else{
                res.status(404).json({
                    message:"No entried Found"
                });
            }
        }
    )
    .catch(
        err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }
    );
});


//Add products
router.post('/',async (req,res,next)=>{
    const product = new Product({
        name:req.body.name,
        price:req.body.price
    });
    product.save().
    then(result=>{
        console.log(result);
        res.status(200).json({
            message:'Handling Post request /products',
            createdProduct : result
        });
    })
    .catch(
        err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }
        );
   
});

//get product by id
router.get('/:productId',async (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message:"Product not found or Invalid Product Id"
            });
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});
//update a product
router.put(':/productId',async(req,res,next)=>{
    const product = await Product.findOneAndUpdate({_id:req.params.id},req.body);
    res.send(200);
})

//delete a product
router.delete('/:productId',async(req,res,next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(
        result=>{
            res.status(200).json(result);
            console.log(`The product having ${id} is deleted`)
        }
    )
    .catch(
        err=>{
            res.status(500).json({
                error:err
            });
        }
    );
});
module.exports=router;