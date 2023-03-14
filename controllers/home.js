const express = require('express');
const Products = require('../models/product');
const Users = require('../models/user');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));

exports.mainControl = async function (req, res) {
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

    // display products
    products = [];
    pages = [];
    const copy = await Products.find({}, {});
    products = copy; 
  
    // search bar
    search = req.query.search;
    if (search) {
        tempProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.toUpperCase().includes(search.toUpperCase()) ) {
                tempProducts.push(products[i]);
            }      
        }
        products = tempProducts;
    }  

    // filter bar
    region = req.query.region;
    if (region !== 'all' && region) {
        tempProducts = [];
        for (let i = 0; i < products.length; i++) {  
           if (products[i].region.toUpperCase() === region.toUpperCase()) {
                tempProducts.push(products[i]);
            }  
        }
        products = tempProducts;
    }

    // pagination
    let pageAmount = Math.ceil(products.length/9);  
    for (let i = 1; i <= pageAmount; i++) {
        pages.push(i);
    }
    let empty = (products.length === 0) ? true : false;

    // display the home page
    res.render('home', {products:products.slice(0+(+req.params.page-1)*9, 9+(+req.params.page-1)*9), pages:pages, search:search, region:region, empty:empty, 
        isLoggedIn:isLoggedIn, likeList:like}); 
};




