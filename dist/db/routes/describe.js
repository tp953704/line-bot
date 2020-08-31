"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const describe_1 = require("../models/describe");
const router = express_1.Router();
router.post("/hasDescribe", (req, res) => {
    console.log(req.body);
    describe_1.User.findOne({ userLineId: req.body.userLineId })
        .then((user) => {
        if (user) {
            return res.json(user);
        }
        else {
            return res.json("");
        }
    });
});
router.post("/post", (req, res) => {
    describe_1.User.findOne({ userLineId: req.body.userLineId })
        .then((user) => {
        if (user) {
            return res.json({ userLineId: "此人已被標記" });
        }
        else {
            const newUser = new describe_1.User({
                userLineId: req.body.userLineId,
                describe: req.body.describe
            });
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
});
router.delete("/delete", (req, res) => {
    describe_1.User.findOneAndDelete(req.body, {}, function (error) {
        if (error) {
            console.log(error);
        }
        else {
            res.json("刪除成功");
        }
    });
});
exports.default = router;
//# sourceMappingURL=describe.js.map