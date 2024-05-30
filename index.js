const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/OursDB');
  console.log("[DATABASE] Connected to MongoDB");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("Welcome on the API"));

app.use('/api/bears', require('./routes/bearRoute'))

app.listen(port, () => console.log(`[Server] is running on ${port}!`));
