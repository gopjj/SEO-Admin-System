import cors from "cors";
import express, { Express, Request, Response } from "express";
import "source-map-support/register.js";
import "./config/loadEnv.js";
import multer from "multer";
import router from "./route/router.js";

const app: Express = express();

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());
app.use(multer().single("file"));

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
