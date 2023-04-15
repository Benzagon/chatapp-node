import * as dotenv from 'dotenv';
dotenv.config();

import express from "express"
const app = express();

import cors from "cors";
import { corsOptions } from "./config/cors.js";

import userRoutes from "./routers/user.routes.js";

import bp from 'body-parser';
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.json());
const port = process.env.PORT;

app.use(cors({
    corsOptions
}));

app.use(userRoutes);

app.listen(port, () => {
    console.log(`> app listening on port ${port}`);
});