'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'hCqv0e3rPDct9qekXe9wTkWGGsjR0gmD3QtjjQisKyTVzo8KZkYfxz6KaA/ozjigj2exTzU9c1bcs5rhKrCCj36kwa0KQUzeZ92zRgfqgrl+DQmVZLFdk3Zxl7sJKZFGitVyE9NwHV/TXzpbmXoXSgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd1873a995298792d251377ced6ceb869',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
console.log(12)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req)
  Promise
    .all(req.body.events.map((item) => {
        handleEvent(item);
    }))
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
      console.error(1);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
    console.log(['EVENT',event])
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
console.log(event.message.text);
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});