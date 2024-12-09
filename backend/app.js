import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images")); //This line of code helps in exposing all the files stored in the images folder, directly on the rootbackend server ie http://localhost:3000
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT");
  res.setHeader("Access-Control-Allow-HEaders", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  console.log("placesData from app.js backend : ", placesData);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  console.log("Line 1");
  const fileContent = await fs.readFile("./data/user-places.json");
  console.log("Line 2");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  console.log("This line got executed");
  const places = req.body.places;
  console.log("line 1 put");
  await fs.writeFile("./data/user-places.json", JSON.stringify(places));

  res.status(200).json({ message: "User places updated!!" });
});

//404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404-Not Found" });
});

app.listen(3000);
