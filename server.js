// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars breeds (DATA)
// =============================================================
var breeds = [
  {
    routeName: "quarter",
    name: "Quarter Horse",
    knownFor: "cattle work, calm demeanor",
    size: "15.2 hands",
    colors: "chestnut, sorrel, black, brown, gray, bay, palomino, buckskin, cremello, perlino, white, dun, red dun, grullo, red roan, bay roan and blue roan"
  },
  {
    routeName: "thoroughbred",
    name: "Thoroughbred",
    knownFor: "speed",
    size: "16 hands",
    colors: "most often bay, dark bay or brown, chestnut, black, or gray"
  },
  {
    routeName: "appaloosa",
    name: "Appaloosa",
    knownFor: "color and spirit",
    size: "15.3 hands",
    colors: "combination of a base color with several possible overlaid spotting patterns. Base colors recognized by the Appaloosa Horse Club include bay, black, chestnut, palomino, buckskin, cremello or perlino, roan, gray, dun and grulla"
  },
  {

  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all breeds
app.get("/api/breeds", function(req, res) {
  return res.json(breeds);
});

// Displays a single breeds, or returns false
app.get("/api/breeds/:breeds", function(req, res) {
  var chosen = req.params.breeds;

  console.log(chosen);

  for (var i = 0; i < breeds.length; i++) {
    if (chosen === breeds[i].routeName) {
      return res.json(breeds[i]);
    }
  }

  return res.json(false);
});

// Create New breeds - takes in JSON input
app.post("/api/breeds", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newbreeds = req.body;

  // Using a RegEx Pattern to remove spaces from newbreeds
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newbreeds.routeName = newbreeds.name.replace(/\s+/g, "").toLowerCase();

  console.log(newbreeds);

  breeds.push(newbreeds);

  res.json(newbreeds);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
