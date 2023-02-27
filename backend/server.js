//server.js
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";

import facultyRoutes from "./routes/facultyRoutes.js";

dotenv.config();

connectDB();

const app = express();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.send('The server is working '));

app.use(express.json());
app.use("/api/faculty", facultyRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));