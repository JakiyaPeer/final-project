import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/dbconfig.js';






dotenv.config();
const app=express();

import authRoutes from './routes/authRoutes.js'







app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth",authRoutes)





app.get("/", (req, res) => {
    res.status(200).send("Welcome to Our Api");
  });


  const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server started and running on the port");
});