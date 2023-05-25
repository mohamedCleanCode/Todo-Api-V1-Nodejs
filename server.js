const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/dbConnection");

dotenv.config({
  path: "config.env",
});

// Connect Database
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json()); // Parser

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Show Routes
  console.log(process.env.NODE_ENV);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(`App Running On Port ${PORT}`)
);

// Handle Rejection Outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down....");
    process.exit(1);
  });
});
