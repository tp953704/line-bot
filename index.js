'use strict';


const express = require('express');
// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// line bot api
const lineBot = require('./src/lineBot/reply');

app.use("/",lineBot);


const mongoose = require("mongoose");
const body_parser = require("body-parser");
// 引入user.js
const users = require("./src/db/routes/describe");
// DB config

const url = require("./src/db/config/config").mongoURI;

// 可傳JSON
// app.use(body_parser.json());
// 可傳urllencode

app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())
// connect to monogodb
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(()=>{
    console.log("connect")
}).catch((err)=>{
    console.log(err)
})
// 使用describe
app.use("/api/describe",users)
const env = require('dotenv');
console.log(env)

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});