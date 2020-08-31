'use strict';
import express from 'express';
// line bot api
import lineBot from './lineBot/reply';
import { connect } from "mongoose";
import { urlencoded, json } from "body-parser";
// 引入user.js
import users from "./db/routes/describe";
// DB config

import { dbConfig } from "./db/config/config";
const app = express();
app.use("/",lineBot);
const url : string = dbConfig.mongoURI;



// 可傳JSON
// app.use(body_parser.json());
// 可傳urllencode

app.use(urlencoded({extended:false}))
app.use(json())
// connect to monogodb
connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(()=>{
    console.log("connect")
}).catch((err)=>{
    console.log(err)
})

// 使用describe
app.use("/api/describe",users)

// listen on port
const port:string = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`listening on ${port}`);
});