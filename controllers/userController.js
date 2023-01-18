const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { JWT_SIGNATURE_KEY } = require('../config/environment');

function isPasswordValid(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

function createToken(payload) {
  return jwt.sign(payload, JWT_SIGNATURE_KEY, {
    expiresIn: '1h'
  });
}

exports.handleLogin = async function (req, res) {
  console.log(req.body)  
  const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    
    if (!user) {
        return res.status(401).json({
        status: "FAIL",
        data: {
            user: "UNAUTHORIZED",
            message: "Email does not exist",
            },
        });
    }

  if (!isPasswordValid(req.body.password, user.password)) {
    return res.status(401).json({
      status: "FAIL",
      data: {
        name: "UNAUTHORIZED",
        message: "Wrong password",
      },
    });
  }

  return res.status(201).json({
    status: "OK",
    data: {
      token: createToken({ id: user.id, email: user.email}),
    },
  });
};

exports.handleForgotPassword = async(req,res) =>{
  try {
    const { email,password } = req.body;
    const user = await User.findOne({
      where:{
        email
      }
    });
    const updatePassword = await User.update({
        password
    },{ where:{
            email:req.body.email
        }
    });
    res.status(200).send({
      status : 200,
      message : "Successfull",
      data : updatePassword
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message : err.message
    })
  }
};

exports.handleRegister = async function (req, res) {
  try {
    const encryptedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      email: req.body.email,
      password:encryptedPassword,
      phone_number:req.body.phone_number
    });

    return res.status(201).json({
      status: "OK",
      data: {
        id: user.id,
        email: user.email,
        phone_number:user.phone_number,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    
  } catch (err) {
    console.log(err.message)
    return res.status(422).json({
      status: "FAIL",
      data: {
        name: "UNPROCESSABLE_ENTITY",
        message: "cannot register user",
      },
    });
  }
};
