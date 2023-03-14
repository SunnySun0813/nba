/*
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const processURL = "mongodb+srv://SASunny0813:Syc920813@cluster0.yi6keqe.mongodb.net/myDB?retryWrites=true&w=majority";

const Schema = mongoose.Schema;
const productsSchema = new Schema({
    title: String,
    imgURL: String,
    description: String,
    region: String
});  

const Products = mongoose.model("Products", productsSchema, "Products");

const usersSchema = new Schema({
    title: String,
    email: String,
    password: String,
    like: Object
  });  
const Users = mongoose.model("Users", usersSchema, "Users");

router.get('', async function(req,res) {
    try {
        await mongoose.connect(processURL);
        console.log("Connected to products");
    }
    catch (error) {
        console.error(error);
    }
    await Users.create({ name: "SASunny013", email:"SASunny0813@test.com", password:"1234567", like:[]});
    await Users.create({ name: "Apollo", email:"Apollo0813@test.com", password:"1234567", like:[]});  
    
    try {
        await mongoose.connect(processURL);
        console.log("Connected to products");
    }
    catch (error) {
        console.error(error);
    }
    
    await Products.create({ title: "Boston Celtics", imgURL: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Atlantic"});
    await Products.create({ title: "Brooklyn Nets", imgURL: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Atlantic"});
    await Products.create({ title: "New York Knicks", imgURL: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Atlantic"});
    await Products.create({ title: "Philadelphia 76ers", imgURL: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Atlantic"});
    await Products.create({ title: "Toronto Raptors", imgURL: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Atlantic"});

    await Products.create({ title: "Chicago Bulls", imgURL: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Central"});
    await Products.create({ title: "Cleveland Cavaliers", imgURL: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Central"});
    await Products.create({ title: "Detroit Pistons", imgURL: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Central"});
    await Products.create({ title: "Indiana Pacers", imgURL: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Central"});
    await Products.create({ title: "Milwaukee Bucks", imgURL: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Central"});

    await Products.create({ title: "Atlanta Hawks", imgURL: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southeast"});
    await Products.create({ title: "Charlotte Hornets", imgURL: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southeast"});
    await Products.create({ title: "Miami Heat", imgURL: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southeast"});
    await Products.create({ title: "Orlando Magic", imgURL: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southeast"});
    await Products.create({ title: "Washington Wizards", imgURL: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southeast"});

    await Products.create({ title: "Denver Nuggets", imgURL: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Northwest"});
    await Products.create({ title: "Minnesota Timberwolves", imgURL: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Northwest"});
    await Products.create({ title: "Oklahoma City Thunder", imgURL: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Northwest"});
    await Products.create({ title: "Portland Trail Blazers", imgURL: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Northwest"});
    await Products.create({ title: "Utah Jazz", imgURL: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Northwest"});

    await Products.create({ title: "Golden State Warriors", imgURL: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Pacific"});
    await Products.create({ title: "LA Clippers", imgURL: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Pacific"});
    await Products.create({ title: "Los Angeles Lakers", imgURL: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Pacific"});
    await Products.create({ title: "Phoenix Suns", imgURL: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Pacific"});
    await Products.create({ title: "Sacramento Kings", imgURL: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Pacific"});

    await Products.create({ title: "Dallas Mavericks", imgURL: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southwest"});
    await Products.create({ title: "Houston Rockets", imgURL: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southwest"});
    await Products.create({ title: "Memphis Grizzlies", imgURL: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southwest"});
    await Products.create({ title: "New Orleans Pelicans", imgURL: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southwest"});
    await Products.create({ title: "San Antonio Spurs", imgURL: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg", description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", region:"Southwest"}); 
}); 

module.exports = router; 
*/