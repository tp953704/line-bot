// linebot SDK
const line = require('@line/bot-sdk');

// create LINE SDK config from env variables
const lineBotConfig = require('./lineBotConfig.js');

// linebot client
const client = new line.Client(lineBotConfig);
// 預設flex
module.exports = replyflex = {
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

module.exports= function handleEvent(event,reply=replyflex) {
    // if (event.type !== 'message' || event.message.type !== 'text') {
    //   // ignore non-text-message event
    //   return Promise.resolve(null);
    // }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
   
    // use reply API
    
   
    return client.replyMessage(event.replyToken, reply);
}