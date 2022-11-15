// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

// body-parser
const bodyParser = require("body-parser");
//cors
const cors = require("cors");
//enable cors req
app.use(cors());


// Get
const GETAll =(req,res)=>{
    res.status(200).send(projectData);
}
app.get('/all',GETAll);


// post 
const post = (req,res)=>{
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
app.post("/add",post);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 4000;
const hostname = "127.0.0.1";

const listening = ()=>{
    console.log(`server is running :${hostname} and ${port}`);
}

app.listen(port,listening);