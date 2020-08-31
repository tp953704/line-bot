import express from "express";
// linebot SDK
import { Client ,middleware} from '@line/bot-sdk';
// create LINE SDK config from env variables
import { lineBotConfig } from './lineBotConfig.js';
import { lineBotHttp } from './lineBotHttp';
const router = express.Router();
// linebot client
const client = new Client(lineBotConfig);

// lineBotApi


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

async function handleEvent(event,reply=replyflex) {
    // use reply API
    // console.log(event)
    const message = event.message;
    const messageType = message.type; 
    const messageText = message.text;
    const userSource = event.source;
    // 不適傳文字不理她
    if(messageType !== "text"){
      return Promise.resolve(null);
    }
    if(messageText.indexOf('對不起') > -1){
      const result = await lineBotHttp.del(`${process.env.BASE_URL}/api/describe/delete`, { "userLineId": userSource["userId"] });
      if (result === "刪除成功") {

        return client.replyMessage(event.replyToken, { type: 'text', text: "好八，原諒你" });
      }
      else {
        return client.replyMessage(event.replyToken, { type: 'text', text: "幹嘛道歉" });
      }
    }
    if(messageText==='小帥哥'){
      return client.replyMessage(event.replyToken, reply);   
    }
    if(messageText.indexOf('醜') > -1){
      try {
        const result_1 = await lineBotHttp.post(`${process.env.BASE_URL}/api/describe/post`, { "userLineId": userSource["userId"], "describe": "醜八怪，不要講話" });
        return client.replyMessage(event.replyToken, { type: 'text', text: "你才醜" });
      }
      catch (error) {
        return console.log(error.message);
      }
      
      // client.replyMessage(event.replyToken, { type: 'text', text: "你最醜，媽的" });
    }else{
      console.log(1)
      try {
        const result_2 = await lineBotHttp.post(`${process.env.BASE_URL}/api/describe/hasDescribe`, { "userLineId": userSource["userId"] });
        const resultData = result_2.data || "";
        if (resultData === "") {
          return Promise.resolve(null);
        }
        return client.replyMessage(event.replyToken, { type: 'text', text: "醜八怪，不要講話" });
      }
      catch (error_1) {
        return console.log(error_1.message);
      }
    }
    
    
}

// linebot
router.post('/webhook', middleware(lineBotConfig), (req, res) => {
  Promise
    .all(req.body.events.map((item:Event) => {      
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

export default router;

