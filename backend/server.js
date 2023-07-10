import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import panelRoutes from "./routes/panelRoutes.js"

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // app.use(express.static(`${__dirname}/public`));

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/panel", panelRoutes);

// ----------- Deployment -----------
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => res.send('The server is working '));
}
// ----------- Deployment -----------

const port = process.env.PORT || 8082;

if (port) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
