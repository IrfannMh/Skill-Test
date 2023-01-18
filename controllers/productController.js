const {Product}  = require("../models");

exports.handleCreateProduct = async  (req, res) => {
    
    const { name_product,price,description} = req.body;
    const product = await Product.create({
        user_id: req.user.id,
        name_product,
        price,
        image:req.file.path,
        description
    });

    res.status(201).send({
        status: "OK",
        message: "Product Created Succesfully",
        data: product
    })
}

exports.handleGetProduct = async(req,res) =>{
    try {
    const allProduct = await Product.findAll({
        where: {
            user_id:req.user.id
        }
    });
    res.status(200).send({
        status : 200,
        message : "Successfull",
        data : allProduct
    });
    } catch (error) {
    res.status(500).send({
        status: "Error",
        message : error.message
    })
    }
};
exports.handleUpdateProduct = async(req,res) =>{
    try {
    
    const { name_product,price,description} = req.body;
    const updateProduct = await Product.update({
        name_product,
        price,
        image:req.file.path,
        description
    },{
        where:{
            id:req.params.id
        }
    });
    res.status(200).send({
        status : 200,
        message : "Successfull",
        data : updateProduct
    });
    } catch (error) {
    res.status(500).send({
        status: "Error",
        message : error.message
    })
    }
};
exports.handleDeleteProduct = async(req,res) =>{
    try {
    const product = await Product.findOne({
        where: {
            id:req.params.id
        }
    });
    if (!product) {
        res.status(404).send({
            status: "Fail",
            message : "Product Not Found"
        })
    }
    await Product.destroy({
        where:{
            id:req.params.id
        }
    })
    res.status(200).send({
        status : 200,
        message : "Delete Successfull"
    });
    } catch (error) {
    res.status(500).send({
        status: "Error",
        message : err.message
    })
    }
};