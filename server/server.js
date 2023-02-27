//server.js

import express from "express";
import connectDB from "./db.js";

const app = express();

connectDB();

app.get('/', (req, res) => res.send('The server is working '));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));