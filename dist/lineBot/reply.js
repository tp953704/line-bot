"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bot_sdk_1 = require("@line/bot-sdk");
const lineBotConfig_js_1 = require("./lineBotConfig.js");
const lineBotHttp_1 = require("./lineBotHttp");
const router = express_1.default.Router();
const client = new bot_sdk_1.Client(lineBotConfig_js_1.lineBotConfig);
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
function handleEvent(event, reply = replyflex) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const message = event.message;
        const messageType = message.type;
        const messageText = message.text;
        const userSource = event.source;
        if (messageType !== "text") {
            return Promise.resolve(null);
        }
        if (messageText.indexOf('對不起') > -1) {
            const result = yield lineBotHttp_1.lineBotHttp.del(`${process.env.BASE_URL}/api/describe/delete`, { "userLineId": userSource["userId"] });
            if (result === "刪除成功") {
                return client.replyMessage(event.replyToken, { type: 'text', text: "好八，原諒你" });
            }
            else {
                return client.replyMessage(event.replyToken, { type: 'text', text: "幹嘛道歉" });
            }
        }
        if (messageText === '小帥哥') {
            return client.replyMessage(event.replyToken, reply);
        }
        if (messageText.indexOf('醜') > -1) {
            try {
                const result_1 = yield lineBotHttp_1.lineBotHttp.post(`${process.env.BASE_URL}/api/describe/post`, { "userLineId": userSource["userId"], "describe": "醜八怪，不要講話" });
                return client.replyMessage(event.replyToken, { type: 'text', text: "你才醜" });
            }
            catch (error) {
                return console.log(error.message);
            }
        }
        else {
            console.log(1);
            try {
                const result_2 = yield lineBotHttp_1.lineBotHttp.post(`${process.env.BASE_URL}/api/describe/hasDescribe`, { "userLineId": userSource["userId"] });
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
    });
}
router.post('/webhook', bot_sdk_1.middleware(lineBotConfig_js_1.lineBotConfig), (req, res) => {
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
exports.default = router;
//# sourceMappingURL=reply.js.map