const express = require('express');
const app = express();
const Users = require('../models/user');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
app.use(bodyParser.urlencoded({ extended: false }));

exports.mainControl = (req, res) => {
    res.render('login', {error:false, isLoggedIn:"false"}); 
};

exports.validation = async function (req, res) {
    const name = await Users.findOne({name:req.body.nameEmail}, {});
    const email = await Users.findOne({email:req.body.nameEmail}, {});
    if (!name && !email) {
        res.render('login',{error:"Account does not exist", isLoggedIn:"false"});
    }
    else {
        if (name && await bcrypt.compare(req.body.password, name.password)) {
            const token = jwt.sign(name.toJSON(), "secret", { expiresIn: "10h" });
            res.cookie('isLoggedIn', true);
            res.cookie('token', token);
            if (name.admin === true) {
                res.redirect('/admin');
            }
            else {
                res.redirect('/home/1');
            }
        }
        else if (email && await bcrypt.compare(req.body.password, email.password)) {
            const token = jwt.sign(email.toJSON(), "secret", { expiresIn: "10h" });
            res.cookie('isLoggedIn', true);
            res.cookie('token', token);
            if (email.admin === true) {
                res.redirect('/admin');
            }
            else {
                res.redirect('/home/1');
            }
        }
        else {
            res.render('login',{error:"Password is incorrect", isLoggedIn:"false"});
        }
    }
};

// logout
exports.logout = (req, res) => {
    res.cookie('isLoggedIn', false);
    res.cookie('token', '');
    res.redirect('/login');
};


