
import cors from "cors";
import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser'
import mongoose from 'mongoose'



import "source-map-support/register.js";
import "./config/loadEnv.js";
import multer from "multer";
import router from "./route/router.js";
import { log } from "console";

// const app = express()

// app.use(cors());

// const CONNECTION_URL = "mongodb+srv://junjie:<Foo2023>@cluster0.jglhiis.mongodb.net/?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL)
//   .then(() => app.listen(PORT,() => console.log('Server running on port: ${PORT'))) 
//   .catch((error) => console.log(error.message));





const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `[Server]: I am running at https://localhost:${process.env.PORT}`
  );
});

server.setTimeout(10000);
