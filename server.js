// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var tables = [
    {
        name: "Kyle",
        partyof: 4,
    },
    {
        name: "Ben",
        partyof: 3,
    },
    {
        name: "Stephen",
        partyof: 2,
    },
];

var waitList = [];
// Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/api", function(req, res){
    return res.json({"tables": tables, "waitlist": waitList});
});

// Create New Tables if less than 5 - takes in JSON input
app.post("/api/new", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newParty = req.body;
    
    if (tables.length < 5) {
        tables.push(newParty);
        console.log("Table is open for the new party");
        res.json({ message: "You've been added to a table!", data: newParty })
    }

    else {
        waitList.push(newParty);
        console.log("Party was added to waiting list");
        res.json({ message: "Sorry, you gotta wait.....", data: newParty });
    }
    

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
