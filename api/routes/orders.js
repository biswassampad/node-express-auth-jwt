const express = require('express');
const router = express.Router();

router.get('/',async(req,res,next)=>{
    res.status(200).json({
        message:"orders have been fecthed"
    });
});

router.post('/',async(req,res,next)=>{
    const order = {
        productId:req.body.productId,
        quantity:req.body.quantity
    }
    res.status(200).json({
        message:"post order has been recieved",
        order:order
    });
});

router.get('/:orderId',async(req,res,next)=>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message:"you have recieved the special order"
        });
    }else{
        res.status(200).json({
            message:"you have not availed any special order"
        });
    }
});

router.patch('/:orderId',async(req,res,next)=>{
    res.status(200).json({
        message:"yout have updated the order"
    });
});

router.delete('/:orderId',async(req,res,next)=>{
    res.status(200).json({
        message:"you have successfully deleted the product"
    });
})
module.exports=router;