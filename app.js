const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const processURI = "mongodb+srv://SASunny0813:Syc920813@cluster0.yi6keqe.mongodb.net/myDB?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const admin = require('./routes/admin');
const home = require('./routes/home');
const login = require('./routes/login');
const registration = require('./routes/registration');
const product = require('./routes/product');
const like = require('./routes/like');
const errorPage = require('./routes/error');
//const seed = require('./seed');

app.use('/admin', admin);
app.use('/home', home);
app.use('/login', login);
app.use('/product', product);
app.use('/registration', registration);
app.use('/like', like);
app.use('/404', errorPage);
//app.use('/seed', seed);

const User = require('./models/user');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res)=>{
  //res.redirect('/404');
  res.redirect('/home/1');
  //res.redirect('/seed');
});

(async() => {
  try {
    await mongoose.connect(processURI);
    app.listen(3000);
  } 
  catch (err) {
    console.log('error: ' + err)
  }
})();  




