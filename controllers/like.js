
const express = require('express');
const app = express();
const Users = require('../models/user');
const Products = require('../models/product');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));

// using for the like page
exports.mainController = async function (req,res) {
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
    if (isLoggedIn === "true") {
        let empty = false;
        if (userInfo.like.length === 0) {
            empty = true;
        }
        res.render('like', {products:userInfo.like, empty:empty, isLoggedIn:isLoggedIn, likeList:like}); 
    }
    else {
        res.redirect('/login'); 
    }
}

exports.addLike = async function (req, res) {
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

    // add to like
    if (isLoggedIn === "true") {
        const product = await Products.findOne({title:req.params.title}, {});
        let user = await Users.findOne({name:userInfo.name}, {});
        let userLike = user.like;
        userLike.push(product);
        await Users.updateOne({name:userInfo.name}, { like: userLike });
        res.redirect('/like');
    }
    else {
        res.redirect('/login');
    }
};

exports.removeLike = async function (req, res) {
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

    if (isLoggedIn === "true") {
        // remove to like
        const product = await Products.findOne({title:req.params.title}, {});
        let user = await Users.findOne({name:userInfo.name}, {});
        let userLike = [];
        for (let i = 0; i < user.like.length; i++) {
            if (product.title !== user.like[i].title) {
                userLike.push(user.like[i]);
            }
        }
        await Users.updateOne({name:userInfo.name}, { like: userLike });
        res.redirect('/like');
    }
    else {
        res.redirect('/login');
    }
};