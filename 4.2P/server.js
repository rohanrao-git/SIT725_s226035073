const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"; //this is the mogno url entry
const dbName = process.env.DB_NAME || "SIT725";
const collectionName = "cars";

app.use(express.static(__dirname + "/public")); //express serves static files from the "public" directory over here.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const defaultCars = [ //if db is empty, then i wanted to add defaults here.
  {
    name: "McLaren 720S",
    brand: "McLaren",
    year: 2023,
    topSpeed: "341 km/h",
    price: "$310,000",
    description: "A lightweight supercar with sharp handling, twin-turbo power, and a driver-focused cockpit.",
    image: "images/mclaren.jpg",
  },
  {
    name: "Porsche 911 GT3",
    brand: "Porsche",
    year: 2024,
    topSpeed: "318 km/h",
    price: "$225,000",
    description: "A track-inspired icon that blends precise steering, everyday usability, and a naturally aspirated thrill.",
    image: "images/porsche.jpg",
  },
  {
    name: "Lamborghini Huracan EVO",
    brand: "Lamborghini",
    year: 2023,
    topSpeed: "325 km/h",
    price: "$261,000",
    description: "An aggressive V10 supercar known for dramatic styling, rapid acceleration, and an unforgettable exhaust note.",
    image: "images/lamborghini.jpg",
  },
];

let carsCollection;

async function connectToMongo() { //connection basically
  const client = new MongoClient(mongoUri);
  await client.connect();

  const database = client.db(dbName);
  carsCollection = database.collection(collectionName);

  const existingCars = await carsCollection.countDocuments();
  if (existingCars === 0) {
    await carsCollection.insertMany(defaultCars);
    console.log("Seeded default cars into MongoDB.");
  }

  console.log(`Connected to MongoDB at ${mongoUri}/${dbName}`);
}

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await carsCollection.find({}, { projection: { _id: 0 } }).toArray(); //used projection cuz we only want the id and not everything
    res.json({ statusCode: 200, data: cars, message: "Cars fetched successfully" });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    res.status(500).json({ statusCode: 500, data: [], message: "Failed to fetch cars" });
  }
});

connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log("App listening to port " + port);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
