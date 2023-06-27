import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { upload } from "./middleware/multer.js";

import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import panelRoutes from "./routes/panelRoutes.js"

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(`${__dirname}/public`));

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(upload.single("myFile"));

app.get('/', (req, res) => res.send('The server is working '));

app.use("/api/faculty", facultyRoutes);
app.use("/api/student", upload.single("myFile"), studentRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/panel", panelRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
