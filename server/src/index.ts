import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port = 9000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello, this is Express + TypeScript');
});

app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});