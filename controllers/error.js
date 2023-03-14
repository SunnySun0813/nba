const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

exports.mainControl = async function(req, res) {
    res.render('404');
}; 

