import express, { json, urlencoded } from "express";
import {config} from "./config";
import mongoose from "mongoose";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../build/swagger.json'
import cors from 'cors'
import * as dotenv from 'dotenv';

dotenv.config();


const app = express();
const url = process.env.MONGO_CONNECTION_STRING

mongoose.connect(url);
const con = mongoose.connection;
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
