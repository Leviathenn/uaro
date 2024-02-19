/**
 * @author Leviathenn
 */
import express, { json, type Request, type Response } from 'express';
import * as fs from "fs"
var ENV = process.env;

var PORT: number = isNaN(parseInt(ENV.PORT || "")) ? 30021 : parseInt(ENV.PORT || "");

var app = express();

app.get('/', (req: Request, res: Response)=>{
    res.send("Up!");
});
app.get('/retrive',(req: Request, res: Response)=>{
    res.sendStatus(404);
})
app.get('/retrive/devices', (req:Request, res: Response)=>{
    res.send((JSON.stringify(typeof JSON.parse(fs.readFileSync("data.json").toString())["devices"] !== 'undefined' ? JSON.parse(fs.readFileSync("data.json").toString())["devices"] : [] )));
})

app.listen(PORT,()=>{
    console.log("App up on port: "+PORT);
});