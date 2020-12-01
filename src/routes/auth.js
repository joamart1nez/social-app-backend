const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//validaciones de registro y login
const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

router.post('/login', async (req,res)=>{
    //validaciones
    const { error } = schemaLogin.validate(req.body);
    if(error) return res.status(400).json({status: error.details[0].message, color: 'text-danger'});
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({status:'Email not found', color: 'text-danger'});

    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if(!validatePass) return res.status(400).json({status: 'Password not found', color: 'text-danger'});

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error: null,
        data: {
            token
        }
    })
})

router.post('/register', async (req,res)=>{
    //validaciones de datos
    const { error } = schemaRegister.validate(req.body);
    if(error) return res.status(400).json({status: error.details[0].message, color: 'text-danger'});

    //validar que no exista el email
    const validateEmail = await User.findOne({email: req.body.email});
    if(validateEmail) return res.status(400).json({status: 'The email already exists', color: 'text-danger'});

    //hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    
    try {
        const userDB = await user.save();
        res.json({
            error: null,
            status: 'Successfully registered!',
            color: 'text-success'
        });
    } catch (error) {
        res.status(400).json({error})
    }

});

module.exports = router;