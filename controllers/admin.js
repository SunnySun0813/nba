const express = require('express');
const Users = require('../models/user');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require('jsonwebtoken');

// display admin page
exports.mainControl = async function(req, res) {
    // get token
    let isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
    let token;
    let userInfo={};
    if (isLoggedIn === "true") {
        token = req.get('Cookie').split(';')[1].trim().split('=')[1];
        jwt.verify(token, "secret", function(err,decoded) {
            if (err) {
                res.cookie('isLoggedIn', false);
                res.redirect('/login');
            }
            else {
                userInfo = decoded;
            }
        });
        userInfo = await Users.findOne({name:userInfo.name}, {});
    }

    // render page
    if (isLoggedIn === "false") {
        res.redirect('/login');
    }
    else {
        const copys = await Users.find({}, {});
        res.render('admin', {user:userInfo, users:copys, isLoggedIn:isLoggedIn});
    }
}; 

// using for display other users with their like list
exports.showLikeList = async function(req, res) {
    // get token
    let isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
    let token;
    let userInfo={};
    if (isLoggedIn === "true") {
        token = req.get('Cookie').split(';')[1].trim().split('=')[1];
        jwt.verify(token, "secret", function(err,decoded) {
            if (err) {
                res.cookie('isLoggedIn', false);
                res.redirect('/login');
            }
            else {
                userInfo = decoded;
            }
        });
        userInfo = await Users.findOne({name:userInfo.name}, {});
    }

    // render page
    if (isLoggedIn === "false") {
        res.redirect('/login');
    }
    else {
        const copys = await Users.find({}, {});
        const copy = await Users.findOne({email:req.params.email}, {});
        res.render('admin', {user:copy, users:copys, isLoggedIn:isLoggedIn});
    }
}; 
    