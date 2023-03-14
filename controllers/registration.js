
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Users = require('../models/user');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

exports.mainControl = (req, res) => {
    res.render('registration', {error:[]});
};

exports.validation = async function (req, res) {
    // all error
    error = [];
    if (!req.body.email.includes('@')) error.push("invalid email");
    if (req.body.email.length < 6) error.push("email length must greater than 6");
    if (req.body.email.length > 30) error.push("email length must smaller than 30");
    if (req.body.name.length < 6) error.push("name length must greater than 6");
    if (req.body.name.length > 12) error.push("name length must smaller than 12");
    if (req.body.password.length < 6) error.push("password length must greater than 6");
    if (req.body.password.length > 12) error.push("password length must smaller than 12");
    if (!req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/)) 
    error.push("password must have at least one uppercase, one lowercase, one special characters and one number");
    if (req.body.password !== req.body.repeatedPassword) error.push("comfirmed password is not match password");
    const repeatEmail = await Users.findOne({email:req.body.email}, {});
    if (repeatEmail) error.push("this email is used");
    const repeatName = await Users.findOne({name:req.body.name}, {});
    if (repeatName) error.push("this user name is used");

    // render page
    if (error.length !== 0) {
        res.render('registration', {errors: error});
    }
    else {  
        const hashed = await bcrypt.hash(req.body.password, Number(process.env.SALT));
        await Users.create({ name: req.body.name, email: req.body.email, password: hashed, like:[], admin:false});
        res.redirect('/login');
    }
}
