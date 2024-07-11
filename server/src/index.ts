import cors from "cors";
import express, {Express, Request, Response} from "express";
import "source-map-support/register.js";
import "./config/loadEnv.js";
import router from "./route/router.js";
import {setupScheduledTasks} from "./utils/Scheduler.js";


const app: Express = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, this is Express + TypeScript");
});

const server = app.listen(process.env.PORT, () => {
    console.log(
        `[Server]: I am running on port:${process.env.PORT}`
    );
});
setupScheduledTasks();

server.setTimeout(60000);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({message: '异常：', error: err.message});
});

