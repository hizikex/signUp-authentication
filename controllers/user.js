require('dotenv').config();
const model = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// sign up function
const signUp = async (req, res)=>{
    try {
        //extracting the attributes from the req.body
        const {name, email, password} = req.body;
        
        //capture the new user email
        const checkEmail = await model.authTable.findOne( {
            where: {
                email: email
            }
        })

        //check for email existence
        if (checkEmail) {
            res.status( 400 ).json({
                status: "Failed",
                message: "Email already exist"
            })
        } else {
            //encrypt the user password
            const saltedPassword = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, saltedPassword)
            
            //generate token
            const generateToken = await jwt.sign( {
                name,
                email,
                password
            }, process.env.JWT_SECRET, {expiresIn: '1d'})

            //user data
            const userData = {
                name,
                email,
                password: hashedPassword,
                token: generateToken
            }

            const newUser = await model.authTable.create(userData);

            if (!newUser) {
                res.status(400).json({
                    status: 'Failed',
                    message: 'Failed to create user'
                })
            } else {
                res.status(201).json({
                    status: 'Success',
                    message: newUser

                })
            }
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    signUp
}