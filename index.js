'use strict';


const express = require('express');

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// linebot SDK
const line = require('@line/bot-sdk');

// create LINE SDK config from env variables
const lineBotConfig = require('./src/lineBot/lineBotConfig.js');
const handleEvent = require('./src/lineBot/reply.js');
// import {
//   lineBotConfig
// } from './src/lineBot/lineBotConfig.js';

// import {
//   handleEvent
// } from './src/lineBot/reply';

// linebot
app.post('/webhook', line.middleware(lineBotConfig), (req, res) => {

  Promise
    .all(req.body.events.map((item) => {
      handleEvent(item);
    }))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(1);
      res.status(500).end();
    });
});


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});