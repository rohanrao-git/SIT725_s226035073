var express = require("express");
var app = express();
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Temporary skylines data (we'll connect to MongoDB next)
const skylinesList = [
  {
    cityname: "Dubai",
    description: "Known for its modern architecture and luxury shopping",
    image: "images/dubai.jpg"
  },
  {
    cityname: "Tokyo",
    description: "A vibrant metropolis blending tradition and modernity",
    image: "images/tokyo.jpg"
  },
  {
    cityname: "New York",
    description: "The city that never sleeps with iconic landmarks",
    image: "images/nyc.jpg"
  }
];

app.get('/api/skylines', (req, res) => {
  res.json({statusCode: 200, data: skylinesList, message: "Success"})
})

var port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App listening to: " + port)
})
