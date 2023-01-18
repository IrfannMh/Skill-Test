const {UserDetail} = require("../models");
const userdetail = require("../models/userdetail");

exports.handleCreateDetail = async function (req, res) {
    const { first_name,last_name,address,gender } = req.body;
    console.log(req.body)
    console.log(req.user)
    const detailUser = await UserDetail.create({
        user_id: req.user.id,
        first_name,
        last_name,
        address,
        image:req.file.path,
        gender
    });

    res.status(201).send({
        status: "OK",
        message: "User Detail Created",
        data: detailUser
    })
}

exports.handleGetDetail = async(req,res) =>{
    try {
    const user = await UserDetail.findOne({
        where: {
            user_id:req.user.id
        }
    });
    res.status(200).send({
        status : 200,
        message : "Successfull",
        data : user
    });
    } catch (error) {
    res.status(500).send({
        status: "Error",
        message : error.message
    })
    }
};
exports.handleUpdateDetail = async(req,res) =>{
    try {
    const user = await UserDetail.findOne({
        where: {
            id:req.params.id
        }
    });

    const { first_name,last_name,address,gender } = req.body;
    const updateDetail = await UserDetail.update({
        first_name,
        last_name,
        address,
        image:req.file.path,
        gender
    },{ where:{
            id:req.params.id
        }
    });
    res.status(200).send({
        status : 200,
        message : "Successfull",
        data : updateDetail
    });
    } catch (error) {
    res.status(500).send({
        status: "Error",
        message : error.message
    })
    }
};
exports.handleDeleteDetail = async(req,res) =>{
    try {
    const user = await UserDetail.findOne({
        where: {
            user_id:req.user.id
        }
    });
    await UserDetail.destroy({
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
        message : error.message
    })
    }
};