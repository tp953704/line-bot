const express = require("express");
const router = express.Router();
// linebot SDK
const line = require('@line/bot-sdk');
// create LINE SDK config from env variables
const lineBotConfig = require('./lineBotConfig.js');

// linebot client
const client = new line.Client(lineBotConfig);

// lineBotApi
const lineBotHttp = require('./lineBotHttp');

const replyflex = {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://raw.githubusercontent.com/tp953704/line-bot/master/assert/img/%E5%9C%96%E7%89%873.png",
        "size": "full",
        "aspectRatio": "20:20",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        },
        "position": "relative",
        "margin": "md",
        "align": "center",
        "gravity": "bottom"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "小帥哥一號",
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Place",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Time",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 1
                  },
                  {
                    "type": "text",
                    "text": "10:00 - 23:00",
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "spacing": "xs",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "llif",
              "uri": "https://llif.herokuapp.com/"
            }
          },
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "WEBSITE",
              "uri": "https://linecorp.com"
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 1
      }
    }
};

function handleEvent(event,reply=replyflex) {
    // use reply API
    console.log(event)
    const message = event.message;
    const messageType = message.type; 
    const messageText = message.text;
    const userSource = event.source;
    // 不適傳文字不理她
    if(messageType !== "text"){
      return Promise.resolve(null);
    }
    if(messageText.indexOf('對不起') > -1){
      return lineBotHttp.del("https://7ac0997cefc6.ngrok.io/api/account/deleteDescribe",{"userLineId":userSource["userId"]})
              .then((result)=>{
                console.log(result);
                if(result==="刪除成功"){
                  
                  return client.replyMessage(event.replyToken, { type: 'text', text: "好八，原諒你" });
                }else{
                  return client.replyMessage(event.replyToken, { type: 'text', text: "幹嘛道歉" });
                }
                
              })
    }
    if(messageText==='小帥哥'){
      return client.replyMessage(event.replyToken, reply);   
    }
    if(messageText.indexOf('醜') > -1){
      
      return lineBotHttp.post("https://7ac0997cefc6.ngrok.io/api/account/addDescribe",{ "userLineId":userSource["userId"],"describe":"醜八怪，不要講話"})
            .then((result)=>{
              return client.replyMessage(event.replyToken, { type: 'text', text: "你才醜" });
            })
      
      // client.replyMessage(event.replyToken, { type: 'text', text: "你最醜，媽的" });
    }else{
      return lineBotHttp.post("https://7ac0997cefc6.ngrok.io/api/account/account",{ "userLineId":userSource["userId"]})
              .then((result)=>{
                const resultData = result.data || "";
                console.log(resultData)
                if(resultData.describe === ""){
                  return Promise.resolve(null);
                }
                return client.replyMessage(event.replyToken, { type: 'text', text: "醜八怪，不要講話" });
              })
    }
    
    
}

// linebot
router.post('/webhook', line.middleware(lineBotConfig), (req, res) => {
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
// 預設flex
module.exports = router;

