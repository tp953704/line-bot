'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const reply_1 = tslib_1.__importDefault(require("./lineBot/reply"));
const mongoose_1 = require("mongoose");
const body_parser_1 = require("body-parser");
const describe_1 = tslib_1.__importDefault(require("./db/routes/describe"));
const config_1 = require("./db/config/config");
const app = express_1.default();
app.use("/", reply_1.default);
const url = config_1.dbConfig.mongoURI;
app.use(body_parser_1.urlencoded({ extended: false }));
app.use(body_parser_1.json());
mongoose_1.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connect");
}).catch((err) => {
    console.log(err);
});
app.use("/api/describe", describe_1.default);
const port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
//# sourceMappingURL=index.js.map