const express = require('express');
const Products = require('../models/product');
const Users = require('../models/user');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));

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

    // if loggedin, save like list
    let like = [];
    if (isLoggedIn === "true") {
        for (let i = 0; i < userInfo.like.length; i++) {
            like.push(userInfo.like[i].title);
        }
    }

    // render page
    const copy = await Products.findOne({title:req.params.title}, {});
    const copys = await Products.find({region:copy.region}, {});
    res.render('product', {product:copy, products:copys, isLoggedIn:isLoggedIn, likeList:like}); 
}; 
