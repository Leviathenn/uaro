/**
 * @author Leviathenn
 */
import express, { json, type Request, type Response } from 'express';
import * as fs from "fs"
import type { IDevice } from './interfaces/IDevice';
import type { IDataInfo } from './interfaces/IDataInfo';
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
app.get('/add',(req:Request, res: Response)=>{
    res.sendStatus(404);
})
app.get('/add/device',(req:Request, res: Response)=>{
    let deviceInfo:IDevice = (typeof JSON.parse(String(req.query.device)) !== 'undefined') ? JSON.parse(String(req.query.device)) : {name: "Undefined", "description":"The Device was undefined."};
    if(deviceInfo.name == "Undefined"){
        res.send(421);
    }else{
        let fsInfo: IDataInfo = JSON.parse(fs.readFileSync("data.json").toString());
        fsInfo.devices.push(deviceInfo);
        console.log(deviceInfo);
        fs.writeFileSync("data.json",JSON.stringify(fsInfo));
        res.sendStatus(200);
    };
})
app.listen(PORT,()=>{
    console.log("App up on port: "+PORT);
});