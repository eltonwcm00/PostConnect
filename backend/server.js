import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";

import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.send('The server is working '));

app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/supervisor", supervisorRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));