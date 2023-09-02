import express, { Express, Request, Response } from "express";
import "source-map-support/register.js";
import "./config/loadEnv.js";
import router from "./route/router.js";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.use("/", router);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `[Server]: I am running at https://localhost:${process.env.PORT}`
  );
});

server.setTimeout(10000);
